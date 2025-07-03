import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '../animations';

const SkillItem = ({ icon, title, description, progress, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Create a safe ID for the progress bar
  const safeId = title.replace(/[\s/+\-=().*&^%$#@!,.]/g, '');

  return (
    <motion.div 
      ref={ref} 
      className="skill-item"
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.2)" }}
    >
      <motion.div 
        className="skill-icon"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FontAwesomeIcon icon={icon} />
      </motion.div>
      <motion.h4 
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: (delay / 1000) + 0.2 }}
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
            delay: (delay / 1000) + 0.4, 
            duration: 1, 
            ease: "easeOut" 
          }}
          whileHover={{ boxShadow: "0 0 15px rgba(158, 240, 26, 0.7)" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skills = [
    {
      icon: ['fab', 'html5'],
      title: 'Frontend Development',
      description: 'HTML5, CSS3, JavaScript, React, Vue.js',
      progress: 95
    },
    {
      icon: ['fas', 'paint-brush'],
      title: 'UI/UX Design',
      description: 'Figma, Adobe XD, Sketch, Photoshop',
      progress: 90
    },
    {
      icon: ['fas', 'mobile-alt'],
      title: 'Responsive Design',
      description: 'Bootstrap, Tailwind CSS, Mobile-First',
      progress: 92
    },
    {
      icon: ['fab', 'node-js'],
      title: 'Backend Development',
      description: 'Node.js, Express, MongoDB, MySQL',
      progress: 80
    },
    {
      icon: ['fab', 'wordpress'],
      title: 'CMS Development',
      description: 'WordPress, Drupal, Custom CMS',
      progress: 85
    },
    {
      icon: ['fas', 'chart-line'],
      title: 'Digital Marketing',
      description: 'SEO, Google Analytics, Social Media',
      progress: 75
    }
  ];

  return (
    <section id="skills" className="section" style={{ background: 'var(--card-bg)' }}>
      <motion.h2 
        className="section-title-above" 
        ref={ref}
        variants={scaleUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        MY SKILLS
      </motion.h2>
      <div className="container">
        <motion.div 
          className="row"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div 
              className="col-lg-4 col-md-6" 
              key={index}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <SkillItem 
                icon={skill.icon} 
                title={skill.title} 
                description={skill.description} 
                progress={skill.progress}
                delay={index * 100}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;