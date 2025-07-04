import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, scaleUp, staggerContainer, fadeIn, gentleFloat, drift } from '../animations'; // Added gentleFloat, drift
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShapes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';


const About = () => {
  const { ref, inView } = useInView({ // Single ref for the entire section
    threshold: 0.2, // Trigger when 20% of the section is visible
    triggerOnce: true
  });

  // Variants for direct children of the section
  const sectionTitleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const aboutCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.15 } // Card can stagger its own children
    }
  };

  // Variants for children of the about-card (will be staggered by aboutCardVariants)
  const cardChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };


  return (
    <motion.section // Entire section is a motion component
      id="about"
      className="section"
      ref={ref}
      variants={staggerContainer} // This will stagger sectionTitle and aboutCard
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Background floating elements */}
      <motion.div
        className="background-floater"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          fontSize: 'clamp(2rem, 5vw, 3rem)', // Responsive font size
          zIndex: -1
        }}
        variants={gentleFloat}
        initial="initial"
        animate="animate"
      >
        <FontAwesomeIcon icon={faCircleNotch} />
      </motion.div>

      <motion.div
        className="background-floater"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          zIndex: -1
        }}
        variants={drift}
        initial="initial"
        animate="animate"
        // transition={{ delay: 0.5 }} // animation variant already has transition
      >
        <FontAwesomeIcon icon={faShapes} />
      </motion.div>

      <motion.h2
        className="section-title-above"
        variants={sectionTitleVariants} // Uses its own variant, will be staggered by parent
      >
        ABOUT
      </motion.h2>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}> {/* Ensure content is above floaters */}
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <motion.div
              className="about-card"
              variants={aboutCardVariants} // Uses its own variant, will be staggered by parent section
              // It will also stagger its own children (h3, p, etc.)
              whileHover={{
                y: -10,
                boxShadow: "0px 20px 40px rgba(158, 240, 26, 0.2)",
                borderColor: "var(--primary-color)"
              }}
            >
              <motion.h3
                className="mb-4"
                style={{ color: 'var(--primary-color)' }}
                variants={cardChildVariants} // Staggered by parent aboutCardVariants
              >
                Showcasing My Web Portfolio Dreams
              </motion.h3>
              <motion.p
                className="text-muted mb-4"
                variants={cardChildVariants}
              >
                I'm a passionate UI/UX Designer and Frontend Developer with over 5 years of experience creating
                digital experiences that are not only visually stunning but also highly functional. I specialize
                in modern web technologies and have a keen eye for detail.
              </motion.p>
              <motion.p
                className="text-muted mb-4"
                variants={cardChildVariants}
              >
                My journey in web development started with a curiosity about how websites work, and it has evolved
                into a career where I get to combine creativity with technical skills to build amazing user experiences.
              </motion.p>
              <motion.div
                className="row mt-4"
                variants={cardChildVariants} // This div itself will animate as one block
                                            // If individual columns/items inside need to stagger, this would be a staggerContainer too
              >
                <div className="col-md-6">
                  <motion.ul className="list-unstyled" variants={staggerContainer} initial="hidden" animate="visible"> {/* Stagger list items */}
                    <motion.li
                      className="mb-2"
                      variants={cardChildVariants} // Each li animates
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Name:</strong> Istiyak Ahmad
                    </motion.li>
                    <motion.li
                      className="mb-2"
                      variants={cardChildVariants}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Email:</strong> istiyak@example.com
                    </motion.li>
                    <motion.li
                      className="mb-2"
                      variants={cardChildVariants}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Phone:</strong> +1 (555) 123-4567
                    </motion.li>
                  </motion.ul>
                </div>
                <div className="col-md-6">
                  <motion.ul className="list-unstyled" variants={staggerContainer} initial="hidden" animate="visible"> {/* Stagger list items */}
                    <motion.li
                      className="mb-2"
                      variants={cardChildVariants}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Location:</strong> New York, USA
                    </motion.li>
                    <motion.li
                      className="mb-2"
                      variants={cardChildVariants}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Experience:</strong> 5+ Years
                    </motion.li>
                    <motion.li
                      className="mb-2"
                      variants={cardChildVariants}
                    >
                      <strong style={{ color: 'var(--primary-color)' }}>Freelance:</strong> Available
                    </motion.li>
                  </motion.ul>
                </div>
              </motion.div>
              <motion.a
                href="/resume.pdf"
                className="btn-primary-custom mt-4"
                variants={cardChildVariants} // The button also animates as part of the card's stagger sequence
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