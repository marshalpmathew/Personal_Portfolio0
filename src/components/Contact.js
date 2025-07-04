import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, buttonHover, staggerContainer } from '../animations'; // Added staggerContainer
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

// ContactItem: delay prop is removed. It will be animated by its parent staggerContainer.
const ContactItem = ({ icon, title, content }) => {
  return (
    <motion.div // This is the item that gets staggered by its parent (leftColumnVariants)
      className="contact-item"
      variants={fadeInLeft} // Uses the existing fadeInLeft variant
      // No initial/animate here, controlled by parent stagger
      whileHover={{
        y: -5,
        boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.2)",
        transition: { duration: 0.3 }
      }}
    >
      <motion.div // Icon box
        className="icon-box"
        whileHover={{ 
          rotate: [0, -10, 10, -10, 0],
          scale: 1.1,
          transition: { duration: 0.5 }
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </motion.div>
      <div className="contact-info">
        {/* Content appears as part of the ContactItem's fadeInLeft animation */}
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of section is visible
    triggerOnce: true
  });

  // Define variants for section structure
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const columnContainerVariants = { // For the row containing the two main columns
    hidden: { opacity: 0 }, // Parent section (staggerContainer) handles initial opacity for the row itself
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } } // Stagger left and right columns
  };

  const leftColumnVariants = { // For contact-info-container
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 } }
  };

  const rightColumnVariants = { // For contact-form-container
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
  };

  const formElementVariants = { // Generic variant for form fields and text inside columns
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  // ContactItem uses fadeInLeft variant, which will be triggered by leftColumnVariants' stagger.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.section
      id="contact"
      className="section"
      ref={ref}
      variants={staggerContainer} // Main stagger for title and then the row
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h2
        className="section-title-above"
        variants={sectionTitleVariants} // Staggered by section
      >
        CONTACT ME
      </motion.h2>
      <div className="container">
        {/* This motion.div for the row is a direct child of the section, so it will be part of the section's stagger sequence.
            It then has its own columnContainerVariants to stagger its children (the two columns).
        */}
        <motion.div
          className="row"
          variants={columnContainerVariants}
        >
          <div className="col-md-5">
            <motion.div // This is the left column, child of the row
              className="contact-info-container"
              variants={leftColumnVariants} // Animates itself and staggers its children (h3, p, ContactItems)
            >
              <motion.h3 className="mb-4" variants={formElementVariants}> {/* Staggered by leftColumnVariants */}
                Get In Touch
              </motion.h3>
              <motion.p className="mb-4" variants={formElementVariants}> {/* Staggered by leftColumnVariants */}
                Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>
              
              {/* ContactItems are direct children of leftColumn, will be staggered by leftColumnVariants */}
              <ContactItem icon={faMapMarkerAlt} title="Location" content="New York, NY, USA" />
              <ContactItem icon={faEnvelope} title="Email" content="istiyak@example.com" />
              <ContactItem icon={faPhone} title="Phone" content="+1 (555) 123-4567" />
            </motion.div>
          </div>
          
          <div className="col-md-7">
            <motion.div // This is the right column, child of the row
              className="contact-form-container"
              variants={rightColumnVariants} // Animates itself and staggers its children (the form elements)
              whileHover={{
                boxShadow: "0px 15px 30px rgba(158, 240, 26, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              {/* The form itself doesn't need to be a motion component if its parent (rightColumn) staggers children */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Each form element group is wrapped in motion.div for staggering */}
                  <motion.div className="col-md-6 mb-3" variants={formElementVariants}>
                    <motion.input type="text" className="form-control" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }} />
                  </motion.div>
                  <motion.div className="col-md-6 mb-3" variants={formElementVariants}>
                    <motion.input type="email" className="form-control" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} required whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }} />
                  </motion.div>
                </div>
                <motion.div className="mb-3" variants={formElementVariants}>
                  <motion.input type="text" className="form-control" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} required whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }} />
                </motion.div>
                <motion.div className="mb-4" variants={formElementVariants}>
                  <motion.textarea className="form-control" rows="5" placeholder="Your Message" name="message" value={formData.message} onChange={handleChange} required whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }} />
                </motion.div>
                <motion.button
                  type="submit"
                  className="btn-primary-custom"
                  variants={formElementVariants} // For entrance animation as part of form stagger
                  // Apply buttonHover states directly for hover/tap interaction
                  whileHover={buttonHover.hover || { scale: 1.05, boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.3)"}}
                  whileTap={buttonHover.tap || { scale: 0.95 }} // Ensure buttonHover has a tap state or provide a default
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;