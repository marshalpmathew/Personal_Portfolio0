import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeInLeft, zoomIn } from '../animations'; // Added zoomIn for variety

// TimelineItem remains largely the same as its animation is self-contained based on its own inView or triggered by parent.
// If triggered by parent stagger, it won't need its own useInView or delay prop for staggering.
const TimelineItem = ({ title, company, period, description }) => { // Removed delay, will be handled by parent stagger
  // const { ref, inView } = useInView({ // No longer needed if parent staggers
  //   threshold: 0.1,
  //   triggerOnce: true
  // });

  return (
    <motion.div
      // ref={ref} // Not needed if parent staggers
      className="timeline-item"
      variants={fadeInLeft} // This variant will be triggered by the parent staggerContainer
      // initial="hidden" // Handled by parent
      // animate={inView ? "visible" : "hidden"} // Handled by parent
      // transition={{ delay: delay / 1000 }} // Handled by parent stagger
      whileHover={{ 
        x: 15, 
        boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.2)",
        borderColor: "var(--primary-color)"
      }}
    >
      {/* Inner elements of TimelineItem can also have variants if needed, or simple initial/animate based on parent's state */}
      <motion.h4
        style={{ color: 'var(--primary-color)' }}
        // Example of simple animation if not using variants here:
        // initial={{ opacity: 0, x: -20 }}
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ duration: 0.4, ease: "easeOut" }}
        // If fadeInLeft variant itself staggers children, these would be variants={childVariant}
      >
        {title}
      </motion.h4>
      <motion.h6
        className="text-muted"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        {company} | {period}
      </motion.h6>
      <motion.p
        className="text-muted mt-3"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const Experience = () => {
  const { ref, inView } = useInView({ // For the whole section
    threshold: 0.2, // Trigger when 20% of the section is visible
    triggerOnce: true
  });

  // Variants for section children
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const timelineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2 // Stagger each TimelineItem
      }
    }
  };
  // Note: TimelineItem itself uses 'fadeInLeft'. The staggerChildren here will apply to each TimelineItem.

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      period: '2022 - Present',
      description: 'Leading frontend development projects, mentoring junior developers, and implementing modern React applications with TypeScript and GraphQL.'
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      period: '2020 - 2022',
      description: 'Designed user interfaces for web and mobile applications, conducted user research, and created interactive prototypes using Figma and Adobe Creative Suite.'
    },
    {
      title: 'Frontend Developer',
      company: 'WebSolutions',
      period: '2019 - 2020',
      description: 'Developed responsive websites using HTML5, CSS3, JavaScript, and popular frameworks like Bootstrap and jQuery for various clients.'
    },
    {
      title: 'Web Developer Intern',
      company: 'StartupXYZ',
      period: '2018 - 2019',
      description: 'Assisted in developing company website, learned modern web development practices, and collaborated with design team on user interface improvements.'
    }
  ];

  return (
    <motion.section // Entire section is a motion component
      id="experience"
      className="section"
      style={{ background: 'var(--card-bg)' }}
      ref={ref}
      variants={staggerContainer} // Stagger section title and timeline container
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="container">
        <motion.h2
          className="section-title"
          variants={sectionTitleVariants} // Animates as part of section's stagger
        >
          My Experience
        </motion.h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <motion.div
              className="timeline"
              variants={timelineContainerVariants} // This will stagger its children (TimelineItem)
            >
              {experiences.map((exp, index) => (
                <TimelineItem // TimelineItem will use its own 'fadeInLeft' variant, staggered by parent
                  key={index}
                  title={exp.title}
                  company={exp.company}
                  period={exp.period}
                  description={exp.description}
                  // Removed delay prop, parent stagger handles it
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;