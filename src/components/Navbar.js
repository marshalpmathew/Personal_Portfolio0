import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active link based on scroll position
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth'
      });
    }
  };

  // Navbar animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  // Nav item animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    hover: { 
      scale: 1.1, 
      color: 'var(--primary-color)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.a 
          href="#home" 
          className="navbar-brand" 
          onClick={(e) => handleLinkClick(e, 'home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="brand-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Istiyak
          </motion.span>
        </motion.a>
        
        <motion.div 
          className="menu-toggle" 
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
          </div>
        </motion.div>
        
        <AnimatePresence>
          <motion.div 
            className={`navbar-menu ${isOpen ? 'active' : ''}`}
            variants={mobileMenuVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <ul className="navbar-nav">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <motion.li 
                  key={item.id}
                  className="nav-item"
                  variants={navItemVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <a 
                    href={`#${item.id}`} 
                    className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                  >
                    {item.label}
                    {activeLink === item.id && (
                      <motion.div 
                        className="active-indicator" 
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;