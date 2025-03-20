"use client"

import React, { useState, useEffect } from "react"

interface CyberAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const CyberAnimation: React.FC<CyberAnimationProps> = ({
  text,
  className = "",
  darkMode = true,
}) => {
  const [glitching, setGlitching] = useState(false)
  const [scanLinePosition, setScanLinePosition] = useState(0)

  // Trigger random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 150)
    }, Math.random() * 3000 + 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Animate scan line
  useEffect(() => {
    const scanLineInterval = setInterval(() => {
      setScanLinePosition((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)

    return () => clearInterval(scanLineInterval)
  }, [])

  return (
    <div className={`cyber-animation-container ${className} ${darkMode ? "dark" : ""}`}>
      <div className="cyber-text-wrapper">
        {text.split("").map((char, index) => (
          <span 
            key={index} 
            className={`cyber-char ${glitching && Math.random() > 0.7 ? "glitching" : ""}`}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      
      <div 
        className="scan-line" 
        style={{ top: `${scanLinePosition}%` }}
      />
      
      <div className="cyber-grid" />
      
      {glitching && (
        <div className="glitch-overlay" />
      )}
      
      <style jsx>{`
        .cyber-animation-container {
          position: relative;
          padding: 0.5em 1em;
          overflow: hidden;
          border: 1px solid #00ff99;
          box-shadow: 0 0 10px rgba(0, 255, 153, 0.6), 
                     inset 0 0 10px rgba(0, 255, 153, 0.4);
          background-color: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
          border-radius: 5px;
          z-index: 1;
        }
        
        .cyber-text-wrapper {
          display: inline-block;
          position: relative;
          z-index: 2;
        }
        
        .cyber-char {
          display: inline-block;
          text-shadow: 
            0 0 5px #00ff99,
            0 0 10px rgba(0, 255, 153, 0.6);
          animation: pulse 2s infinite;
        }
        
        .glitching {
          transform: translateX(3px);
          opacity: 0.8;
          color: #ff00cc;
          text-shadow: 
            -2px 0 #00ffff,
            2px 0 #ff00cc;
        }
        
        .scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: rgba(0, 255, 153, 0.3);
          z-index: 3;
          pointer-events: none;
        }
        
        .cyber-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: 1;
          pointer-events: none;
        }
        
        .glitch-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 0, 204, 0.2) 50%,
            transparent 100%
          );
          z-index: 3;
          pointer-events: none;
          animation: glitch-move 0.1s infinite steps(1);
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
        
        @keyframes glitch-move {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-2px);
          }
          50% {
            transform: translateX(0);
          }
          75% {
            transform: translateX(2px);
          }
        }
        
        .dark {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  )
} 