"use client"

import React, { useEffect, useState } from "react"

interface HologramAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const HologramAnimation: React.FC<HologramAnimationProps> = ({
  text = "",
  className = "",
  darkMode = true, // Hologram works best on dark backgrounds
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    // Create random glitch effects
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      
      setTimeout(() => {
        setGlitchActive(false);
      }, 150);
    }, 2000 + Math.random() * 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      {/* Main hologram text */}
      <div className="relative inline-block">
        <div 
          className="relative z-10"
          style={{
            color: '#0ff',
            textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
            animation: 'holoFlicker 4s ease-in-out infinite',
          }}
        >
          {text}
        </div>
        
        {/* Scan lines */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 0%, rgba(32, 128, 255, 0.2) 2%, transparent 3%, transparent 9%, rgba(32, 128, 255, 0.1) 10%, transparent 12%)',
            backgroundSize: '100% 20px',
            zIndex: 2,
          }}
        />
        
        {/* Glitch effect */}
        {glitchActive && (
          <>
            <div 
              className="absolute inset-0"
              style={{
                color: 'rgba(255, 0, 255, 0.8)',
                textShadow: '2px 0 #0ff',
                left: '-2px',
                clipPath: 'inset(25% 0 55% 0)',
                animation: 'holoGlitch1 0.2s infinite ease-in-out alternate-reverse',
                zIndex: 3,
              }}
            >
              {text}
            </div>
            <div 
              className="absolute inset-0"
              style={{
                color: 'rgba(0, 255, 255, 0.8)',
                textShadow: '-2px 0 #f0f',
                left: '2px',
                clipPath: 'inset(65% 0 25% 0)',
                animation: 'holoGlitch2 0.2s infinite ease-in-out alternate-reverse',
                zIndex: 3,
              }}
            >
              {text}
            </div>
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes holoFlicker {
          0%, 100% {
            opacity: 1;
          }
          8%, 10% {
            opacity: 0.8;
          }
          20%, 22% {
            opacity: 0.9;
          }
          50%, 52% {
            opacity: 0.7;
          }
          80%, 82% {
            opacity: 0.9;
          }
        }
        
        @keyframes holoGlitch1 {
          0% {
            transform: translateX(-2px);
          }
          100% {
            transform: translateX(2px);
          }
        }
        
        @keyframes holoGlitch2 {
          0% {
            transform: translateX(2px);
          }
          100% {
            transform: translateX(-2px);
          }
        }
      `}</style>
    </div>
  );
} 