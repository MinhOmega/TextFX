"use client"

import React, { useState, useEffect } from "react"

interface CircuitAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const CircuitAnimation: React.FC<CircuitAnimationProps> = ({
  text,
  className = "",
  darkMode = true,
}) => {
  const [pulsePositions, setPulsePositions] = useState<number[]>([])
  
  // Generate random electrical pulses
  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = Math.floor(Math.random() * text.length)
      setPulsePositions(prev => [...prev, newPosition])
      
      // Remove pulse after animation completes
      setTimeout(() => {
        setPulsePositions(prev => prev.filter(pos => pos !== newPosition))
      }, 2000)
    }, 800)
    
    return () => clearInterval(interval)
  }, [text])
  
  // Generate circuit line patterns
  const getCircuitPattern = (index: number) => {
    const patterns = [
      "M0,5 H10 V0 H5 V10 H15",
      "M0,0 H10 V10 H15",
      "M0,5 H15",
      "M0,0 V10 H15",
      "M0,10 V0 H15",
      "M0,0 H5 V10 H15",
    ]
    
    // Deterministic but seemingly random pattern based on character and position
    const patternIndex = (index + text.charCodeAt(index % text.length)) % patterns.length
    return patterns[patternIndex]
  }
  
  return (
    <div className={`circuit-animation-container ${className} ${darkMode ? "dark" : ""}`}>
      <div className="circuit-background"></div>
      
      <div className="circuit-text-wrapper">
        {text.split("").map((char, index) => {
          const isPulsing = pulsePositions.includes(index)
          
          return (
            <span key={index} className="circuit-char-container">
              {char !== " " ? (
                <>
                  <span 
                    className={`circuit-char ${isPulsing ? "pulse" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {char}
                  </span>
                  
                  <svg 
                    className={`circuit-path ${isPulsing ? "pulse" : ""}`} 
                    width="15" 
                    height="10" 
                    viewBox="0 0 15 10"
                  >
                    <path 
                      d={getCircuitPattern(index)}
                      fill="none" 
                      strokeWidth="1"
                    />
                    
                    {isPulsing && (
                      <circle className="pulse-dot" r="1.5" cx="0" cy="5">
                        <animateMotion
                          path={getCircuitPattern(index)}
                          dur="1s"
                          repeatCount="1"
                          fill="freeze"
                        />
                      </circle>
                    )}
                  </svg>
                </>
              ) : (
                <span className="circuit-space">&nbsp;</span>
              )}
            </span>
          )
        })}
      </div>
      
      <style jsx>{`
        .circuit-animation-container {
          position: relative;
          padding: 1em;
          background-color: ${darkMode ? '#121212' : '#f0f0f0'};
          overflow: hidden;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
        }
        
        .circuit-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
            ${darkMode ? 'rgba(0, 200, 100, 0.1)' : 'rgba(0, 150, 50, 0.05)'} 1px,
            transparent 1px
          );
          background-size: 20px 20px;
          z-index: 0;
        }
        
        .circuit-text-wrapper {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          z-index: 1;
        }
        
        .circuit-char-container {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin: 0 2px;
        }
        
        .circuit-char {
          display: inline-block;
          color: ${darkMode ? '#00cc66' : '#008844'};
          font-weight: bold;
          opacity: 0.8;
          transition: color 0.3s, text-shadow 0.3s;
        }
        
        .circuit-path {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          stroke: ${darkMode ? '#00cc66' : '#008844'};
          opacity: 0.6;
          z-index: 1;
        }
        
        .circuit-space {
          display: inline-block;
          width: 0.5em;
        }
        
        .pulse {
          color: ${darkMode ? '#00ff88' : '#00cc66'};
          text-shadow: 0 0 10px ${darkMode ? 'rgba(0, 255, 136, 0.8)' : 'rgba(0, 204, 102, 0.8)'};
          opacity: 1;
        }
        
        .pulse-dot {
          fill: ${darkMode ? '#00ff88' : '#00cc66'};
          filter: drop-shadow(0 0 2px ${darkMode ? 'rgba(0, 255, 136, 0.8)' : 'rgba(0, 204, 102, 0.8)'});
        }
        
        .dark {
          color: #00cc66;
        }
        
        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}