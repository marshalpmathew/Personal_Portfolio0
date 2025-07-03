import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }),
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="row"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="col-lg-12 text-center">
            <motion.div 
              className="social-links"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={0}
                variants={socialVariants}
                whileHover="hover"
              >
                <FontAwesomeIcon icon={faGithub} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={1}
                variants={socialVariants}
                whileHover="hover"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={2}
                variants={socialVariants}
                whileHover="hover"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                custom={3}
                variants={socialVariants}
                whileHover="hover"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </motion.a>
            </motion.div>
            <motion.p 
              className="copyright"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              &copy; {new Date().getFullYear()} Istiyak Ahmad. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;