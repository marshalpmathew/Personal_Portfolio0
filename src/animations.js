// Animation variants for Framer Motion

// Fade in animations with different directions
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Parallax-like entrance for headings
export const headingParallaxUp = {
  hidden: { opacity: 0, y: 70 }, // Start further down
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80, // Lower stiffness for a softer, slightly delayed feel
      damping: 20,   // Good damping to prevent too much oscillation
      // mass: 1 // Default mass is 1
    }
  }
};

export const headingParallaxDown = { // Optional: if needed for elements appearing from top
  hidden: { opacity: 0, y: -70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    }
  }
};

// Variation for slower/larger floating elements
export const gentleFloat = {
  initial: { y: 0, opacity: 0.3 }, // Start with some opacity
  animate: {
    y: [0, -15, 0, 10, 0], // More gentle, slightly different path
    opacity: [0.3, 0.5, 0.3, 0.4, 0.3], // Subtle opacity change
    transition: {
      duration: 8, // Slower
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

// Variation for horizontal floating/drifting
export const drift = {
  initial: { x: 0, opacity: 0.2 },
  animate: {
    x: [-10, 10, -10],
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 12, // Very slow
      repeat: Infinity,
      repeatType: "mirror", // Mirror for smooth back and forth
      ease: "easeInOut"
    }
  }
};

// Slide in from bottom with a slight bounce
export const slideInUpBounce = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.7
    }
  }
};

// Rotate and fade in
export const rotateIn = {
  hidden: { opacity: 0, rotate: -90, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.8
    }
  }
};

// Zoom in reveal
export const zoomIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Text reveal (character by character)
export const textReveal = (customDelay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: customDelay,
      staggerChildren: 0.03, // Adjust speed of character reveal
    }
  }
});

export const letterReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

// Background color transition on hover
export const backgroundTransitionHover = (hoverColor = "var(--primary-color-dark)") => ({
  rest: {
    backgroundColor: "transparent", // Or initial background color
    transition: { duration: 0.3 }
  },
  hover: {
    backgroundColor: hoverColor,
    transition: { duration: 0.3 }
  }
});

// Icon pop effect
export const iconPop = {
  rest: { scale: 1 },
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { type: "spring", stiffness: 300, damping: 10 }
  },
  tap: { scale: 0.9 }
};

// Card lift and shadow enhance
export const cardLift = {
  rest: { y: 0, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
  hover: {
    y: -8,
    boxShadow: "0px 12px 25px rgba(0,0,0,0.2)",
    transition: { type: "spring", stiffness: 200, damping: 15 }
  }
};

// Gentle wiggle on hover
export const gentleWiggle = {
  hover: {
    rotate: [0, -2, 2, -2, 0],
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

// Scale animations
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export const scaleDown = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Staggered children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.3)",
  transition: { duration: 0.3 }
};

export const hoverBounce = {
  y: -10,
  transition: {
    type: "spring",
    stiffness: 300
  }
};

// Button animations
export const buttonHover = {
  scale: 1.05,
  backgroundColor: "#7cd119",
  boxShadow: "0px 10px 20px rgba(158, 240, 26, 0.3)",
  transition: { duration: 0.3 }
};

// Page transitions
export const pageTransition = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Floating animation
export const floating = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

// Pulse animation
export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

// Rotate animation
export const rotate = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  }
};

// Typing animation
export const typing = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

// Shimmer effect
export const shimmer = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 2,
      ease: "linear"
    }
  }
};