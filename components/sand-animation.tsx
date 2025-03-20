"use client"

import React, { useState, useEffect, useRef } from "react"

interface SandAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const SandAnimation: React.FC<SandAnimationProps> = ({
  text,
  className = "",
  darkMode = false,
}) => {
  const [particles, setParticles] = useState<{x: number, y: number, size: number, speed: number, color: string}[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBlowing, setIsBlowing] = useState(false)
  const [blowDirection, setBlowDirection] = useState(1)
  
  // Initialize sand particles
  useEffect(() => {
    if (!containerRef.current) return
    
    const newParticles = []
    const numParticles = text.length * 30
    
    // Generate sand particles
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 2 + 1
      const baseColor = darkMode ? 200 : 180
      const colorVariation = Math.floor(Math.random() * 30)
      
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        speed: Math.random() * 0.5 + 0.1,
        color: `rgb(${baseColor + colorVariation}, ${baseColor - 10 + colorVariation}, ${baseColor - 40 + colorVariation / 2})`
      })
    }
    
    setParticles(newParticles)
    
    // Setup wind effect
    const windInterval = setInterval(() => {
      setIsBlowing(true)
      setBlowDirection(Math.random() > 0.5 ? 1 : -1)
      
      setTimeout(() => {
        setIsBlowing(false)
      }, 3000)
    }, 8000)
    
    return () => clearInterval(windInterval)
  }, [text, darkMode])
  
  return (
    <div 
      ref={containerRef}
      className={`sand-animation-container ${className} ${darkMode ? "dark" : ""}`}
    >
      <div className="sand-text-wrapper">
        {text.split("").map((char, index) => (
          <span 
            key={index} 
            className="sand-char"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      
      <div className="sand-particles">
        {particles.map((particle, index) => (
          <div
            key={index}
            className={`sand-particle ${isBlowing ? "blowing" : ""}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${10 / particle.speed}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: isBlowing ? `translateX(${blowDirection * (Math.random() * 20)}px)` : "none",
              transition: "transform 3s ease-in-out"
            }}
          />
        ))}
      </div>
      
      <div className={`desert-floor ${isBlowing ? "rippling" : ""}`} />
      
      <style jsx>{`
        .sand-animation-container {
          position: relative;
          padding: 1em;
          overflow: hidden;
          min-height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            to bottom,
            ${darkMode ? '#2a1a0c' : '#f2d7b5'} 0%,
            ${darkMode ? '#3d2914' : '#e6c096'} 100%
          );
          border-radius: 8px;
        }
        
        .sand-text-wrapper {
          position: relative;
          z-index: 2;
          font-weight: bold;
          margin-bottom: 20px;
        }
        
        .sand-char {
          display: inline-block;
          color: ${darkMode ? '#e2c38d' : '#8f6b3d'};
          text-shadow: 1px 1px 2px ${darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'};
          animation: emerge 1s forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        
        .sand-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .sand-particle {
          position: absolute;
          border-radius: 50%;
          animation: float infinite linear;
          opacity: 0.8;
        }
        
        .blowing {
          animation: float-wind infinite linear;
        }
        
        .desert-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            ${darkMode ? '#3d2914' : '#e6c096'} 50%,
            ${darkMode ? '#4a3521' : '#d4ad7d'} 100%
          );
          z-index: 0;
          transform-origin: center bottom;
        }
        
        .rippling {
          animation: ripple 3s ease-in-out;
        }
        
        @keyframes emerge {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(100% + 5px));
          }
        }
        
        @keyframes float-wind {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(100% + 5px));
          }
        }
        
        @keyframes ripple {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.03);
          }
        }
        
        .dark {
          color: #e2c38d;
        }
      `}</style>
    </div>
  )
} 