import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, buttonHover } from '../animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const ContactItem = ({ icon, title, content, delay = 0 }) => {
  return (
    <motion.div 
      className="contact-item"
      variants={fadeInLeft}
      initial="hidden"
      animate="visible"
      custom={delay}
      whileHover={{ 
        y: -5, 
        boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.2)",
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
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
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {content}
        </motion.p>
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
  // State for form submission can be added here if needed

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="section">
      <motion.h2 
        className="section-title-above" 
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        CONTACT ME
      </motion.h2>
      <div className="container">
        
        <div className="row">
          <div className="col-md-5">
            <motion.div 
              className="contact-info-container"
              variants={fadeInLeft}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h3 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                Get In Touch
              </motion.h3>
              <motion.p 
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>
              
              <ContactItem 
                icon={faMapMarkerAlt} 
                title="Location" 
                content="New York, NY, USA" 
                delay={0.4}
              />
              
              <ContactItem 
                icon={faEnvelope} 
                title="Email" 
                content="istiyak@example.com" 
                delay={0.6}
              />
              
              <ContactItem 
                icon={faPhone} 
                title="Phone" 
                content="+1 (555) 123-4567" 
                delay={0.8}
              />
            </motion.div>
          </div>
          
          <div className="col-md-7">
            <motion.div 
              className="contact-form-container"
              variants={fadeInRight}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              whileHover={{ 
                boxShadow: "0px 15px 30px rgba(158, 240, 26, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <motion.input 
                      type="text" 
                      className="form-control" 
                      placeholder="Your Name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ delay: 0.6 }}
                      whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <motion.input 
                      type="email" 
                      className="form-control" 
                      placeholder="Your Email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      initial={{ x: 20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ delay: 0.6 }}
                      whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }}
                    />
                  </div>
                </div>
                
                <motion.div 
                  className="mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.input 
                    type="text" 
                    className="form-control" 
                    placeholder="Subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }}
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.textarea 
                    className="form-control" 
                    rows="5" 
                    placeholder="Your Message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required
                    whileFocus={{ scale: 1.02, borderColor: "var(--primary-color)" }}
                  ></motion.textarea>
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="btn-primary-custom"
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.9 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;