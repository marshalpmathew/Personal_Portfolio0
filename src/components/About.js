import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, scaleUp } from '../animations';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="section">
      <motion.h2 
        className="section-title-above" 
        ref={ref}
        variants={scaleUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        ABOUT
      </motion.h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <motion.div 
              className="about-card"
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ 
                y: -10, 
                boxShadow: "0px 20px 40px rgba(158, 240, 26, 0.2)",
                borderColor: "var(--primary-color)"
              }}
            >
              <motion.h3 
                className="mb-4" 
                style={{ color: 'var(--primary-color)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                Showcasing My Web Portfolio Dreams
              </motion.h3>
              <motion.p 
                className="text-muted mb-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                I'm a passionate UI/UX Designer and Frontend Developer with over 5 years of experience creating 
                digital experiences that are not only visually stunning but also highly functional. I specialize 
                in modern web technologies and have a keen eye for detail.
              </motion.p>
              <motion.p 
                className="text-muted mb-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                My journey in web development started with a curiosity about how websites work, and it has evolved 
                into a career where I get to combine creativity with technical skills to build amazing user experiences.
              </motion.p>
              <motion.div 
                className="row mt-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="col-md-6">
                  <motion.ul className="list-unstyled">
                    <motion.li 
                      className="mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Name:</strong> Istiyak Ahmad
                    </motion.li>
                    <motion.li 
                      className="mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Email:</strong> istiyak@example.com
                    </motion.li>
                    <motion.li 
                      className="mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Phone:</strong> +1 (555) 123-4567
                    </motion.li>
                  </motion.ul>
                </div>
                <div className="col-md-6">
                  <motion.ul className="list-unstyled">
                    <motion.li 
                      className="mb-2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Location:</strong> New York, USA
                    </motion.li>
                    <motion.li 
                      className="mb-2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Experience:</strong> 5+ Years
                    </motion.li>
                    <motion.li 
                      className="mb-2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Freelance:</strong> Available
                    </motion.li>
                  </motion.ul>
                </div>
              </motion.div>
              <motion.a 
                href="/resume.pdf" 
                className="btn-primary-custom mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;