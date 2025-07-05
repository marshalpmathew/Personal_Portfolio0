import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import './ProjectModal.css';
import { fadeIn, zoomIn, fadeInUp, headingParallaxUp } from '../animations'; // Added headingParallaxUp

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      duration: 0.4,
      staggerChildren: 0.1, // Stagger children inside modal
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="project-modal-backdrop"
      variants={modalBackdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close modal if backdrop is clicked
    >
      <motion.div
        className="project-modal-content"
        variants={modalContentVariants}
        // initial, animate, exit are inherited from AnimatePresence in parent
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button className="project-modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <motion.h2 variants={headingParallaxUp}>{project.title}</motion.h2>

        <motion.div className="project-modal-image-container" variants={zoomIn}> {/* Keep zoomIn for image */}
          <img src={project.imageUrl || 'https://via.placeholder.com/800x600.png?text=Project+Image'} alt={project.title} />
        </motion.div>

        {/* For text blocks like details and technologies, the container can fade in, and then the H3 inside uses parallax */}
        <motion.div className="project-modal-details" variants={fadeInUp}> {/* Container fades up */}
          <motion.h3 variants={headingParallaxUp}>About this project:</motion.h3> {/* Heading uses parallax */}
          <motion.p variants={fadeInUp}> {/* Paragraphs can use simple fadeInUp */}
            {project.detailedDescription || 'No detailed description available.'}
          </motion.p>
        </motion.div>

        {project.technologies && project.technologies.length > 0 && (
          <motion.div className="project-modal-technologies" variants={fadeInUp}> {/* Container fades up */}
            <motion.h3 variants={headingParallaxUp}>Technologies Used:</motion.h3> {/* Heading uses parallax */}
            <motion.ul variants={staggerContainer}> {/* Stagger list items if desired */}
              {project.technologies.map((tech, index) => (
                <motion.li key={index} variants={fadeInUp}>{tech}</motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        <motion.div className="project-modal-links" variants={fadeInUp}> {/* Links container fades up */}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary-custom btn-sm">
              <FontAwesomeIcon icon={faLink} /> Live Demo
            </a>
          )}
          {project.sourceCodeLink && (
            <a href={project.sourceCodeLink} target="_blank" rel="noopener noreferrer" className="btn-primary-custom btn-sm secondary">
              <FontAwesomeIcon icon={faCode} /> Source Code
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
