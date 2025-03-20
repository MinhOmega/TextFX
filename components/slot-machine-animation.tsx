"use client"

import React, { useEffect, useState, useRef } from "react"

interface SlotMachineAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&!?*";

export const SlotMachineAnimation: React.FC<SlotMachineAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [displayedChars, setDisplayedChars] = useState<string[]>(Array(text.length).fill(""));
  const [isLocked, setIsLocked] = useState<boolean[]>(Array(text.length).fill(false));
  const [isComplete, setIsComplete] = useState(false);
  const spinIntervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedChars(Array(text.length).fill(""));
    setIsLocked(Array(text.length).fill(false));
    setIsComplete(false);
    
    // Clear any existing intervals
    spinIntervalsRef.current.forEach(interval => clearInterval(interval));
    spinIntervalsRef.current = [];
    
    const lockTimers: NodeJS.Timeout[] = [];
    const newSpinIntervals: NodeJS.Timeout[] = [];
    
    // Start spinning each character
    for (let i = 0; i < text.length; i++) {
      // Handle spaces immediately
      if (text[i] === " ") {
        setDisplayedChars(prev => {
          const newChars = [...prev];
          newChars[i] = " ";
          return newChars;
        });
        
        setIsLocked(prev => {
          const newLocked = [...prev];
          newLocked[i] = true;
          return newLocked;
        });
        continue;
      }
      
      // Set up spinning animation with different speeds for each character
      // Earlier characters stop sooner than later ones
      const spinInterval = setInterval(() => {
        setDisplayedChars(prev => {
          const newChars = [...prev];
          if (!isLocked[i]) {
            newChars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          return newChars;
        });
      }, 50 + i * 5); // Slightly increasing spin rate for each character
      
      newSpinIntervals.push(spinInterval);
      
      // Set a timer to lock each character
      // Stagger the locking to create a sequential effect
      const lockTimer = setTimeout(() => {
        setIsLocked(prev => {
          const newLocked = [...prev];
          newLocked[i] = true;
          return newLocked;
        });
        
        setDisplayedChars(prev => {
          const newChars = [...prev];
          newChars[i] = text[i];
          return newChars;
        });
        
        // Check if this is the last character to lock
        if (i === text.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
          }, 500);
        }
      }, 500 + i * 200); // Staggered locking - first characters lock sooner
      
      lockTimers.push(lockTimer);
    }
    
    spinIntervalsRef.current = newSpinIntervals;
    
    return () => {
      spinIntervalsRef.current.forEach(interval => clearInterval(interval));
      lockTimers.forEach(timer => clearTimeout(timer));
    };
  }, [text]);
  
  return (
    <div className={`font-mono ${className} ${darkMode ? "text-white" : "text-black"}`}>
      <div className="flex flex-wrap justify-center">
        {text.split('').map((_, index) => (
          <div 
            key={index}
            className={`
              relative inline-block m-0.5 w-8 h-12 text-center flex items-center justify-center
              ${isLocked[index] ? 'bg-opacity-20' : 'bg-opacity-10'} 
              ${darkMode ? 'bg-white' : 'bg-black'}
              rounded-md overflow-hidden
            `}
          >
            <span 
              className={`
                text-2xl font-bold
                ${isLocked[index] ? (isComplete ? 'text-green-400' : 'text-yellow-400 animate-pulse') : ''}
                transition-colors duration-500
              `}
            >
              {displayedChars[index] || " "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}