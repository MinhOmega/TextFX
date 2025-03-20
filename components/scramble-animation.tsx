"use client"

import React, { useEffect, useState, useRef } from "react"

interface ScrambleAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?";

export const ScrambleAnimation: React.FC<ScrambleAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [finalizedChars, setFinalizedChars] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayText(text.replace(/./g, (char) => char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]));
    setFinalizedChars(Array(text.length).fill(false));
    setIsComplete(false);
    
    // Set up char-by-char finalization with staggered timing
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        // Spaces are immediately finalized
        setTimeout(() => {
          setFinalizedChars(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, 0);
      } else {
        // Character scrambling and finalization
        const delay = 500 + i * 150; // Staggered timing
        
        setTimeout(() => {
          setFinalizedChars(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
          
          // Check if this was the last character
          if (i === text.length - 1) {
            setTimeout(() => setIsComplete(true), 300);
          }
        }, delay);
      }
    }
    
    // Set up the scrambling animation
    const scramble = () => {
      setDisplayText(prev => {
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (finalizedChars[i] || text[i] === " ") {
            // Finalized characters and spaces remain unchanged
            result += text[i];
          } else {
            // Non-finalized characters keep scrambling
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        return result;
      });
      
      // Continue scrambling if not all characters are finalized
      if (!isComplete) {
        animationRef.current = setTimeout(scramble, 70);
      }
    };
    
    // Start the scrambling
    animationRef.current = setTimeout(scramble, 70);
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text]);
  
  // Update the scrambling when finalized chars change
  useEffect(() => {
    if (finalizedChars.every(state => state)) {
      setIsComplete(true);
    }
  }, [finalizedChars]);
  
  return (
    <div className={`font-mono ${className} ${darkMode ? "text-white" : "text-black"}`}>
      <div className="inline-block">
        {displayText.split("").map((char, index) => (
          <span 
            key={index} 
            className={`
              inline-block
              ${finalizedChars[index] ? 'text-blue-500' : ''}
              transition-colors duration-300
            `}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
} 