import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  fadeInUp, staggerContainer, scaleUp, cardLift, iconPop, rotateIn, slideInUpBounce, gentleFloat, drift
} from '../animations';
import { faCodeBranch, faLayerGroup } from '@fortawesome/free-solid-svg-icons'; // Example icons for skills section

// SkillItem structure remains as previously refactored (using slideInUpBounce, cardLift, iconPop, rotateIn)
// The 'delay' prop is used for its internal animation sequencing relative to its appearance.
const SkillItem = ({ icon, title, description, progress, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const safeId = title.replace(/[\s/+\-=().*&^%$#@!,.]/g, '');

  return (
    <motion.div 
      ref={ref}
      variants={slideInUpBounce}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: delay / 1000 }} // This delay is for the whole item's appearance
    >
      <motion.div 
        className="skill-item"
        variants={cardLift}
        initial="rest"
        whileHover="hover"
      >
        <motion.div
          className="skill-icon"
          variants={iconPop}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div
            variants={rotateIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: (delay / 1000) + 0.2 }} // Icon rotates in slightly after item slides in
          >
            <FontAwesomeIcon icon={icon} />
          </motion.div>
        </motion.div>
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: (delay / 1000) + 0.25 }}
        >
          {title}
        </motion.h4>
        <motion.p
          className="text-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: (delay / 1000) + 0.3 }}
        >
          {description}
        </motion.p>
        <div className="skill-progress">
          <motion.div
            id={`${safeId}-progress`}
            className="skill-progress-bar"
            initial={{ width: 0 }}
            animate={inView ? { width: `${progress}%` } : { width: 0 }}
            transition={{
              delay: (delay / 1000) + 0.35,
              duration: 1,
              ease: 'easeOut',
            }}
            whileHover={{ boxShadow: '0 0 15px rgba(158, 240, 26, 0.7)' }}
          ></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  // Ref for the entire section to control its overall animation (e.g., floaters, main title)
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.15, // When 15% of the section is visible
    triggerOnce: true,
  });

  const skills = [
    { icon: ['fab', 'html5'], title: 'Frontend Development', description: 'HTML5, CSS3, JavaScript, React, Vue.js', progress: 95 },
    { icon: ['fas', 'paint-brush'], title: 'UI/UX Design', description: 'Figma, Adobe XD, Sketch, Photoshop', progress: 90 },
    { icon: ['fas', 'mobile-alt'], title: 'Responsive Design', description: 'Bootstrap, Tailwind CSS, Mobile-First', progress: 92 },
    { icon: ['fab', 'node-js'], title: 'Backend Development', description: 'Node.js, Express, MongoDB, MySQL', progress: 80 },
    { icon: ['fab', 'wordpress'], title: 'CMS Development', description: 'WordPress, Drupal, Custom CMS', progress: 85 },
    { icon: ['fas', 'chart-line'], title: 'Digital Marketing', description: 'SEO, Google Analytics, Social Media', progress: 75 },
  ];

  // Variants for section elements
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // The main section will be a staggerContainer for its direct children (title, then the row of skills)
  // The row of skills will also be a staggerContainer for each skill column/item.

  return (
    <motion.section
      id="skills"
      className="section" // Ensure .section has position: relative and overflow: hidden in CSS
      style={{ background: 'var(--card-bg)' }}
      ref={sectionRef}
      variants={staggerContainer} // Staggers title and the skills row
      initial="hidden"
      animate={sectionInView ? 'visible' : 'hidden'}
    >
      {/* Background floating elements for Skills section */}
      <motion.div
        className="background-floater"
        style={{ position: 'absolute', top: '10%', right: '5%', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', zIndex: 0 }}
        variants={drift}
        initial="initial"
        animate="animate"
      >
        <FontAwesomeIcon icon={faCodeBranch} />
      </motion.div>
      <motion.div
        className="background-floater"
        style={{ position: 'absolute', bottom: '5%', left: '8%', fontSize: 'clamp(2rem, 4vw, 3rem)', zIndex: 0 }}
        variants={gentleFloat}
        initial="initial"
        animate="animate"
      >
        <FontAwesomeIcon icon={faLayerGroup} />
      </motion.div>

      <motion.h2
        className="section-title-above"
        variants={sectionTitleVariants} // Animates as part of section's stagger
      >
        MY SKILLS
      </motion.h2>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* This motion.div for the row is a direct child of the section, part of its stagger.
            It then acts as a staggerContainer for the skill columns.
        */}
        <motion.div
          className="row"
          variants={staggerContainer} // Staggers each col-lg-4.md-6
          // initial & animate are inherited from parent section
        >
          {skills.map((skill, index) => (
            // Each col-lg-4 is a motion component, direct child of the row's staggerContainer
            <motion.div
              className="col-lg-4 col-md-6"
              key={index}
              variants={fadeInUp} // Each column fades up as part of the row's stagger
                                  // SkillItem inside will then have its own more complex animation (slideInUpBounce)
                                  // The 'delay' for SkillItem is now relative to its own `inView` trigger.
                                  // If we want columns to stagger and THEN items to animate, this is fine.
            >
              <SkillItem
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                progress={skill.progress}
                delay={0} // SkillItem's delay is now for its internal sequence, not for staggering vs other SkillItems.
                           // Or, pass index * 100 if we want to offset internal animations based on column order,
                           // but the column itself (fadeInUp) is already staggered. Setting to 0 means internal
                           // animations of SkillItem start as soon as it's in view and its own fadeInUp is done.
                           // Let's use a small fixed delay for internal parts after the item itself appears.
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;