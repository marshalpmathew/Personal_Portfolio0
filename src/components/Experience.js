import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeInLeft } from '../animations';

const TimelineItem = ({ title, company, period, description, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div 
      ref={ref} 
      className="timeline-item"
      variants={fadeInLeft}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
      whileHover={{ 
        x: 15, 
        boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.2)",
        borderColor: "var(--primary-color)"
      }}
    >
      <motion.h4 
        style={{ color: 'var(--primary-color)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: (delay / 1000) + 0.2 }}
      >
        {title}
      </motion.h4>
      <motion.h6 
        className="text-muted"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: (delay / 1000) + 0.3 }}
      >
        {company} | {period}
      </motion.h6>
      <motion.p 
        className="text-muted mt-3"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: (delay / 1000) + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
    <section id="experience" className="section" style={{ background: 'var(--card-bg)' }}>
      <div className="container">
        <motion.h2 
          className="section-title" 
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          My Experience
        </motion.h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <motion.div 
              className="timeline"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {experiences.map((exp, index) => (
                <TimelineItem 
                  key={index}
                  title={exp.title} 
                  company={exp.company} 
                  period={exp.period} 
                  description={exp.description} 
                  delay={index * 200}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;