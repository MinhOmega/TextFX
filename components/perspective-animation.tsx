"use client"

import React, { useEffect, useState } from "react"

interface PerspectiveAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const PerspectiveAnimation: React.FC<PerspectiveAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [charAnimationComplete, setCharAnimationComplete] = useState<boolean[]>([]);
  
  useEffect(() => {
    // Reset animation state when text changes
    setIsAnimating(true);
    setCharAnimationComplete(Array(text.length).fill(false));
    
    // Stop the container animation after the specified time
    const containerTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 5000);
    
    // Set up timeouts to mark each character's animation as complete
    const charTimers = text.split('').map((_, index) => {
      return setTimeout(() => {
        setCharAnimationComplete(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 1000 + index * 50); // Animation duration + staggered delay
    });
    
    return () => {
      clearTimeout(containerTimer);
      charTimers.forEach(timer => clearTimeout(timer));
    };
  }, [text]);
  
  return (
    <div 
      className={`
        ${className} 
        perspective-[1000px] 
        ${darkMode ? "text-white" : "text-black"}
      `}
    >
      <div 
        className={`
          relative inline-block transform-style-3d
          ${isAnimating ? 'animate-perspective' : 'transform-none'}
        `}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`
              inline-block origin-center
              ${!charAnimationComplete[index] ? 'animate-perspective-char' : ''}
            `}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      
      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes perspectiveAnimation {
          0% {
            transform: rotateX(60deg) rotateZ(-30deg) translateZ(-100px);
          }
          25% {
            transform: rotateX(0deg) rotateZ(0deg) translateZ(50px);
          }
          50% {
            transform: rotateX(-30deg) rotateZ(15deg) translateZ(0px);
          }
          75% {
            transform: rotateX(15deg) rotateZ(-10deg) translateZ(25px);
          }
          100% {
            transform: rotateX(0deg) rotateZ(0deg) translateZ(0px);
          }
        }
        
        @keyframes perspectiveCharAnimation {
          0% {
            opacity: 0;
            transform: rotateY(90deg) translateZ(20px);
          }
          100% {
            opacity: 1;
            transform: rotateY(0) translateZ(0);
          }
        }
        
        .animate-perspective {
          animation: perspectiveAnimation 5s ease-in-out forwards;
        }
        
        .animate-perspective-char {
          animation: perspectiveCharAnimation 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
} 