import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight, floating, typing, pulse } from '../animations';

const Hero = () => {
  const { ref: leftRef, inView: leftVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: rightRef, inView: rightVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroTitleRef = useRef(null);

  useEffect(() => {
    // Typing animation for hero title
    const typeWriter = (element, text, speed = 100) => {
      let i = 0;
      if (element) {
        element.innerHTML = '';
        
        function type() {
          if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }
        
        type();
      }
    };

    // Initialize typing animation when page loads
    if (heroTitleRef.current) {
      const originalText = "This is Istiyak";
      setTimeout(() => {
        typeWriter(heroTitleRef.current, originalText, 150);
      }, 1000);
    }
  }, []);

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
              animate={leftVisible ? "visible" : "hidden"}
            >
              <motion.div
                style={{ overflow: 'hidden' }}
              >
                <motion.h1 
                  ref={heroTitleRef} 
                  className="hero-title"
                  variants={typing}
                  initial="hidden"
                  animate="visible"
                >
                  This is Istiyak
                </motion.h1>
              </motion.div>
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