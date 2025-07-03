import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileView, setIsMobileView] = useState(false); // Renamed for clarity

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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

    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobileView);
    checkMobileView(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    // Only close if it's the mobile menu that's open
    if (isMobileView && isOpen) {
      setIsOpen(false);
    }
    
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40, // Assuming navbar height consideration
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

  // Variant for desktop: always visible, no transform.
  const desktopMenuVariant = {
    open: { opacity: 1, x: 0 }, // Stays in place
    closed: { opacity: 1, x: 0 } // Stays in place (effectively always "open")
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
          {/*
            The div itself should always be rendered for CSS to apply.
            The animation/variants control its *visual state*.
            If !isMobileView, it should just be visible.
            If isMobileView, it's controlled by isOpen.
          */}
          {(!isMobileView || isOpen) && ( // This condition ensures mobile menu is removed when closed to trigger AnimatePresence exit
            <motion.div
              className={`navbar-menu ${isMobileView && isOpen ? 'active' : ''}`}
              key="mobileMenu" // Key for AnimatePresence when conditionally rendering
              variants={isMobileView ? mobileMenuVariants : desktopMenuVariant}
              initial="closed" // For mobile, this means x: '100%'. For desktop, x: 0.
              animate={isMobileView ? (isOpen ? "open" : "closed") : "open"} // Desktop always "open"
              exit={isMobileView ? "closed" : undefined} // Only mobile has exit animation
              // Note: CSS for .navbar-menu needs to handle display:flex for desktop
              // and appropriate display/position for mobile (e.g., when .active)
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
                    // custom={index} // Re-evaluate if needed with new structure
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
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;