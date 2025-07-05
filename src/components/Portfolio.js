import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, cardLift, iconPop, slideInUpBounce, rotateIn, headingParallaxUp } from '../animations'; // Added headingParallaxUp
import { portfolioItemsData } from '../portfolioData';
import ProjectModal from './ProjectModal';

// PortfolioItem will now receive the full item object and a click handler
const PortfolioItem = ({ item, delay, onViewProject }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    // Outer container for the entrance animation of the entire item
    <motion.div
      ref={ref} // Each item gets its own ref for inView detection
      variants={slideInUpBounce}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      // The delay here is for the slideInUpBounce entrance of the PortfolioItem itself
      // It's relative to when this specific item comes into view.
      // If columns are staggered by parent, this delay helps sequence internal parts.
      transition={{ delay: delay / 1000 }}
    >
      <motion.div
        id={`portfolio-${item.id}`} // Use item.id from data
        className="portfolio-item"
        variants={cardLift}
        initial="rest"
        whileHover="hover"
      >
        <motion.div
          className="portfolio-image"
        >
          <motion.div
            variants={iconPop}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            {/* Icon itself also animates in */}
            <motion.div
              variants={rotateIn}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              // Delay for icon's rotateIn, slightly after the cardLift item is visible/interactive
              transition={{delay: (delay / 1000) + 0.15}}
            >
              <FontAwesomeIcon icon={item.icon} /> {/* Use item.icon from data */}
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="portfolio-content">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: (delay / 1000) + 0.2 }}
          >
            {item.title} {/* Use item.title from data */}
          </motion.h4>
          <motion.p
            className="text-muted"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: (delay / 1000) + 0.3 }}
          >
            {item.description} {/* Use item.description (short one) from data */}
          </motion.p>
          <motion.button // Changed from <a> to <button> for modal interaction
            onClick={() => onViewProject(item)} // Call handler with the full item object
            className="btn-primary-custom btn-sm"
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 10px rgba(158, 240, 26, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: (delay / 1000) + 0.4 }}
          >
            View Project
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  // ref and inView for the main section title animation
  const { ref: sectionTitleRef, inView: sectionTitleInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // ref and inView for the row of portfolio items, to trigger its staggerContainer
  const { ref: portfolioRowRef, inView: portfolioRowInView } = useInView({
    threshold: 0.1, // Adjust as needed for when the grid starts animating
    triggerOnce: true
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optionally reset selected project after a delay to allow exit animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 300); // Should match modal exit animation time
  };

  return (
    <section id="portfolio" className="section">
      <motion.h2 
        className="section-title-above" 
        ref={sectionTitleRef}
        variants={headingParallaxUp} // Apply new variant
        initial="hidden"
        animate={sectionTitleInView ? "visible" : "hidden"}
      >
        MY LATEST PORTFOLIO
      </motion.h2>
      <div className="container">
        <motion.div 
          className="row"
          ref={portfolioRowRef}
          variants={staggerContainer}
          initial="hidden"
          animate={portfolioRowInView ? "visible" : "hidden"}
        >
          {portfolioItemsData.map((item, index) => (
            <motion.div 
              className="col-lg-4 col-md-6" 
              key={item.id}
              variants={fadeInUp}
            >
              <PortfolioItem 
                item={item}
                delay={0}
                onViewProject={handleViewProject}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;