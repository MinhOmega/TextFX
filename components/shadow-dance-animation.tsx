"use client"

import React, { useEffect, useState } from "react"

interface ShadowDanceAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const ShadowDanceAnimation: React.FC<ShadowDanceAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  // Multiple shadow positions for dancing effect
  const [shadowIndex, setShadowIndex] = useState(0);
  
  // Array of shadow positions
  const shadowPositions = [
    { x: -4, y: -4 },
    { x: 4, y: -4 },
    { x: 4, y: 4 },
    { x: -4, y: 4 },
    { x: -6, y: 0 },
    { x: 6, y: 0 },
    { x: 0, y: -6 },
    { x: 0, y: 6 },
  ];
  
  useEffect(() => {
    // Cycle through shadow positions
    const interval = setInterval(() => {
      setShadowIndex(prevIndex => (prevIndex + 1) % shadowPositions.length);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className={`
        ${className} 
        ${darkMode ? 'text-white' : 'text-black'} 
        text-center
      `}
    >
      <div className="relative inline-block">
        {/* Main text */}
        <span className="relative z-10">
          {text}
        </span>
        
        {/* Animated shadows */}
        {shadowPositions.map((position, index) => (
          <span
            key={index}
            className={`
              absolute inset-0 
              transition-all duration-500 ease-in-out 
              ${index === shadowIndex ? 'opacity-100' : 'opacity-20'}
            `}
            style={{
              color: 'transparent',
              transform: `translate(${position.x}px, ${position.y}px)`,
              textShadow: `0 0 8px ${darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}`,
              zIndex: 1,
            }}
          >
            {text}
          </span>
        ))}
        
        {/* Primary colored shadow */}
        <span
          className="absolute inset-0 animation-shadow-dance"
          style={{
            color: 'transparent',
            textShadow: `0 0 5px ${darkMode ? '#8B5CF6' : '#6D28D9'}`,
            zIndex: 2,
          }}
        >
          {text}
        </span>
      </div>
      
      <style jsx>{`
        @keyframes shadowDance {
          0% {
            transform: translate(-3px, -3px);
          }
          25% {
            transform: translate(3px, -3px);
          }
          50% {
            transform: translate(3px, 3px);
          }
          75% {
            transform: translate(-3px, 3px);
          }
          100% {
            transform: translate(-3px, -3px);
          }
        }
        
        .animation-shadow-dance {
          animation: shadowDance 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 