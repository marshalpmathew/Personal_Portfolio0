import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, cardLift, iconPop, slideInUpBounce, rotateIn } from '../animations'; // Added cardLift, iconPop, slideInUpBounce, rotateIn

const PortfolioItem = ({ icon, title, description, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div // Outer container for entrance animation
      ref={ref}
      variants={slideInUpBounce} // Use new entrance animation
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
    >
      <motion.div
        id={`portfolio-${title.replace(/\s+/g, '')}`}
        className="portfolio-item" // This is the card
        variants={cardLift} // Apply cardLift for hover
        initial="rest"
        whileHover="hover"
        // Removed direct transition and whileHover from here, now handled by cardLift variants
      >
        <motion.div
          className="portfolio-image"
          // Optional: Add a subtle scale to the image container on item hover if desired,
          // but cardLift is primary. Icon itself will have iconPop.
        >
          <motion.div // Icon wrapper for iconPop and/or rotateIn
            variants={iconPop} // Using iconPop for the icon itself
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            // Example if using rotateIn for icon's appearance:
            // variants={inView ? rotateIn.visible : rotateIn.hidden}
            // transition={{ delay: (delay / 1000) + 0.1 }}
          >
            {/* Apply rotateIn to the icon when it appears */}
            <motion.div
              variants={rotateIn}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{delay: (delay/1000) + 0.15}} // Slightly after card
            >
              <FontAwesomeIcon icon={icon} />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="portfolio-content">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
        <motion.a 
          href={`/projects/${title.toLowerCase().replace(/\s+/g, '-')}`} 
          className="btn-primary-custom btn-sm"
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 10px rgba(158, 240, 26, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: (delay / 1000) + 0.4 }}
        >
          View Project
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const portfolioItems = [
    {
      icon: ['fas', 'laptop-code'],
      title: 'E-commerce Website',
      description: 'Modern e-commerce platform with React and Node.js'
    },
    {
      icon: ['fas', 'mobile-alt'],
      title: 'Mobile App Design',
      description: 'UI/UX design for fitness tracking mobile application'
    },
    {
      icon: ['fas', 'globe'],
      title: 'Corporate Website',
      description: 'Professional website for consulting company'
    },
    {
      icon: ['fas', 'chart-bar'],
      title: 'Dashboard Design',
      description: 'Analytics dashboard with interactive charts'
    },
    {
      icon: ['fas', 'shopping-cart'],
      title: 'Online Store',
      description: 'Custom e-commerce solution with payment integration'
    },
    {
      icon: ['fas', 'book'],
      title: 'Learning Platform',
      description: 'Online education platform with video streaming'
    }
  ];

  return (
    <section id="portfolio" className="section">
      <motion.h2 
        className="section-title-above" 
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        MY LATEST PORTFOLIO
      </motion.h2>
      <div className="container">
        <motion.div 
          className="row"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {portfolioItems.map((item, index) => (
            <motion.div 
              className="col-lg-4 col-md-6" 
              key={index}
              variants={fadeInUp}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <PortfolioItem 
                icon={item.icon} 
                title={item.title} 
                description={item.description} 
                delay={index * 100}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;