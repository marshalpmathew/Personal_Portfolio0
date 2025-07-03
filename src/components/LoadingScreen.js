import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, pulse } from '../animations';
import './LoadingScreen.css';

const LoadingScreen = ({ finishLoading }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter < 100) {
        setCounter(prev => prev + 1);
      } else {
        finishLoading();
      }
    }, 20); // Adjust speed as needed

    return () => clearTimeout(timer);
  }, [counter, finishLoading]);

  return (
    <motion.div 
      className="loading-screen"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div 
        className="loading-content"
        variants={pulse}
        initial="initial"
        animate="animate"
      >
        <motion.div className="logo-container">
          {/* Replace with your logo or icon */}
          <motion.div 
            className="logo"
            animate={{ 
              rotate: 360,
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }
            }}
          >
            <span>P</span>
          </motion.div>
        </motion.div>
        
        <motion.div className="progress-container">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${counter}%` }}
            transition={{ ease: "easeInOut" }}
          />
          <motion.p 
            className="progress-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {counter}%
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;