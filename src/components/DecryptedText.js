import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap', // Ensures spaces are preserved and text wraps normally
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0,
  },
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start', // 'start', 'end', 'center' - only relevant for sequential
  useOriginalCharsOnly = false, // if true, scrambles using only characters present in the original text
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '', // Applied to revealed characters
  parentClassName = '', // Applied to the main motion.span wrapper
  encryptedClassName = '', // Applied to encrypted characters
  animateOn = 'hover', // 'hover' or 'view'
  ...props // other props for motion.span
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false); // Trigger for animation (if animateOn === 'hover' or via observer)
  const [isScrambling, setIsScrambling] = useState(false); // True while the scramble effect is active
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false); // For animateOn='view' to ensure it only runs once
  const containerRef = useRef(null);

  useEffect(() => {
    let intervalId;
    let currentIteration = 0;

    // Only start scrambling if isHovering is true AND (if animateOn === 'view', it hasn't animated yet)
    const shouldAnimate = isHovering && (animateOn === 'hover' || (animateOn === 'view' && !hasAnimatedOnce));

    if (shouldAnimate) {
      setIsScrambling(true);
      if (animateOn === 'view') {
        setHasAnimatedOnce(true); // Mark as animated for 'view' mode
      }

      // For sequential, reset revealedIndices at the start of animation
      if (sequential) {
        setRevealedIndices(new Set());
      }

      intervalId = setInterval(() => {
        if (sequential) {
          setRevealedIndices((prevRevealed) => {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed, text.length, revealDirection);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed, useOriginalCharsOnly, characters));
              return newRevealed;
            } else {
              clearInterval(intervalId);
              setIsScrambling(false);
              setDisplayText(text); // Ensure final text is set
              return prevRevealed;
            }
          });
        } else { // Non-sequential
          setDisplayText(shuffleText(text, new Set(), useOriginalCharsOnly, characters)); // Always pass empty set for non-sequential shuffle part
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(intervalId);
            setIsScrambling(false);
            setDisplayText(text);
          }
        }
      }, speed);
    } else if (!isHovering && animateOn === 'hover') { // Reset if not hovering for 'hover' mode
      clearInterval(intervalId);
      setIsScrambling(false);
      setDisplayText(text);
      setRevealedIndices(new Set());
      currentIteration = 0;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      // If component unmounts while scrambling, ensure text is reset if it's not 'view' mode that already animated
      if (!hasAnimatedOnce || animateOn === 'hover') {
        setDisplayText(text);
      }
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    animateOn,
    hasAnimatedOnce, // Add hasAnimatedOnce to dependency array
  ]);

  // Observer for 'view' animation trigger
  useEffect(() => {
    if (animateOn !== 'view' || hasAnimatedOnce) return; // Only run if animateOn is 'view' and not yet animated

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHovering(true); // Trigger the animation by setting isHovering
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOn, hasAnimatedOnce]); // Removed isHovering from here, it's an effect of this observer

  const getNextIndex = (revealedSet, textLength, direction) => {
    switch (direction) {
      case 'start':
        return revealedSet.size;
      case 'end':
        return textLength - 1 - revealedSet.size;
      case 'center': {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const nextIndex =
          revealedSet.size % 2 === 0
            ? middle + offset
            : middle - offset - (textLength % 2 === 0 ? 0 : 1) ; // Adjusted for center reveal logic

        if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
          return nextIndex;
        }
        // Fallback if calculated index is already revealed or out of bounds (can happen with center)
        for (let i = 0; i < textLength; i++) {
          if (!revealedSet.has(i)) return i;
        }
        return textLength; // Should not happen if logic is correct
      }
      default:
        return revealedSet.size;
    }
  };

  const shuffleText = (originalText, currentRevealed, useOrigChars, availableCharsInput) => {
    const sourceChars = useOrigChars
      ? Array.from(new Set(originalText.split(''))).filter((char) => char !== ' ')
      : availableCharsInput.split('');

    if (sourceChars.length === 0 && !useOrigChars) { // Fallback if characters prop is empty
        sourceChars.push(...'abcdefghijklmnopqrstuvwxyz'.split(''));
    }
    if (sourceChars.length === 0 && useOrigChars){ // Fallback for original chars only if text is all spaces
        return originalText;
    }


    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(i)) return originalText[i];
        return sourceChars[Math.floor(Math.random() * sourceChars.length)];
      })
      .join('');
  };


  const hoverTriggerProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...hoverTriggerProps}
      {...props}
    >
      <span style={styles.srOnly}>{text}</span> {/* Screen reader always gets the final text */}
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          // For non-sequential, all chars are "encrypted" until scramble ends
          // For sequential, only non-revealed chars are "encrypted"
          const isEncrypted = sequential ? isScrambling && !revealedIndices.has(index) : isScrambling;

          return (
            <span
              key={index}
              className={isEncrypted ? encryptedClassName : className}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
