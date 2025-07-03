import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';

// Add FontAwesome icons to the library
library.add(fab, fas);

function App() {
  const [loading, setLoading] = useState(true);

  const finishLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Remove navbar background handling from App.js since it's handled in Navbar.js component

    // Add active class to navigation links
    const handleActiveNav = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Remove the unused variable
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleActiveNav);

    // Parallax effect for floating elements
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        if (element.style) {
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleParallax);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleActiveNav);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence>
        {loading ? (
          <LoadingScreen finishLoading={finishLoading} key="loading" />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Experience />
            <Contact />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;