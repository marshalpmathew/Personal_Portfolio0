import React, { useEffect, useRef } from 'react'; // Removed useState if not used elsewhere after removing typeWriter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight, floating, pulse } from '../animations'; // Removed 'typing'
import DecryptedText from './DecryptedText'; // Import the new component

const Hero = () => {
  const { ref: leftRef, inView: leftVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: rightRef, inView: rightVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Removed heroTitleRef and useEffect for typeWriter as DecryptedText handles the title animation.

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="floating-element"
        variants={floating}
        initial="initial"
        animate="animate"
      >
        <FontAwesomeIcon icon="code" style={{ color: 'var(--primary-color)', fontSize: '2rem', opacity: 0.3 }} />
      </motion.div>
      <motion.div
        className="floating-element"
        variants={floating}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <FontAwesomeIcon icon="laptop" style={{ color: 'var(--primary-color)', fontSize: '2rem', opacity: 0.3 }} />
      </motion.div>
      <motion.div
        className="floating-element"
        variants={floating}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <FontAwesomeIcon icon="rocket" style={{ color: 'var(--primary-color)', fontSize: '2rem', opacity: 0.3 }} />
      </motion.div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <motion.div
              ref={leftRef}
              className="hero-content"
              variants={fadeInLeft}
              initial="hidden"
              animate={leftVisible ? 'visible' : 'hidden'}
            >
              {/* Replace the h1 content with DecryptedText */}
              <h1 className="hero-title"> {/* Keep h1 for semantics, DecryptedText will be inside */}
                <DecryptedText
                  text="This is Istiyak"
                  sequential={false} // All characters scramble then reveal
                  animateOn="view"    // Animates once when it scrolls into view
                  speed={75}          // Speed of scramble updates
                  maxIterations={15}  // How many scrambles before final reveal (for non-sequential)
                  className="hero-title-revealed" // Class for individual revealed characters (if needed for gradient)
                  encryptedClassName="hero-title-encrypted" // Class for encrypted characters
                  // parentClassName will be on the motion.span wrapper from DecryptedText
                  // We might need to ensure hero-title styles apply to the wrapper or the inner spans.
                  // If hero-title has text gradient, className needs to be on the spans.
                />
              </h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                UI/UX Designer & Frontend Developer
              </motion.p>
              <motion.p 
                className="text-muted mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                Crafting beautiful digital experiences with modern design principles and cutting-edge technology.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.6 }}
              >
                <motion.a 
                  href="#portfolio" 
                  className="btn-primary-custom"
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="btn-primary-custom ms-3"
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
          <div className="col-lg-6">
            <motion.div 
              ref={rightRef} 
              className="hero-image text-center"
              variants={fadeInRight}
              initial="hidden"
              animate={rightVisible ? "visible" : "hidden"}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                alt="Istiyak" 
                variants={pulse}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;