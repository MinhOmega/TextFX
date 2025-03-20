"use client"

import React, { useState, useEffect } from "react"

interface NeonFlickerAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  color?: "red" | "blue" | "purple" | "green" | "pink" | "orange"
}

export const NeonFlickerAnimation: React.FC<NeonFlickerAnimationProps> = ({
  text = "",
  className = "",
  darkMode = true, // Neon effect works best on dark backgrounds
  color = "blue"
}) => {
  const [flickers, setFlickers] = useState<{[key: number]: boolean}>({})
  const [powerFailure, setPowerFailure] = useState(false)
  const [powerUpPhase, setPowerUpPhase] = useState(true)
  
  // Define colors for different neon tubes
  const colorMap = {
    red: { primary: '#ff0000', secondary: '#ff8080', glow: 'rgba(255, 0, 0, 0.8)' },
    blue: { primary: '#0050ff', secondary: '#00a0ff', glow: 'rgba(0, 100, 255, 0.8)' },
    purple: { primary: '#9900ff', secondary: '#cc80ff', glow: 'rgba(153, 0, 255, 0.8)' },
    green: { primary: '#00ff66', secondary: '#80ffb0', glow: 'rgba(0, 255, 102, 0.8)' },
    pink: { primary: '#ff00aa', secondary: '#ff80d5', glow: 'rgba(255, 0, 170, 0.8)' },
    orange: { primary: '#ff6600', secondary: '#ffb380', glow: 'rgba(255, 102, 0, 0.8)' }
  }
  
  const selectedColor = colorMap[color]
  
  // Startup animation - initial warm up of neon tubes
  useEffect(() => {
    const chars = text.split("")
    let currentIndex = 0
    const warmupInterval = setInterval(() => {
      if (currentIndex >= chars.length) {
        clearInterval(warmupInterval)
        setPowerUpPhase(false)
        return
      }
      
      // Each letter progressively lights up
      setFlickers(prev => {
        const newFlickers = { ...prev }
        for (let i = 0; i <= currentIndex; i++) {
          newFlickers[i] = true
        }
        return newFlickers
      })
      
      currentIndex++
    }, 120)
    
    return () => clearInterval(warmupInterval)
  }, [text])
  
  // Random flicker effects after startup
  useEffect(() => {
    if (powerUpPhase) return
    
    // Occasional full power failure (all letters off briefly)
    const powerFailureInterval = setInterval(() => {
      const shouldFail = Math.random() < 0.2 // 20% chance
      if (shouldFail) {
        setPowerFailure(true)
        setTimeout(() => setPowerFailure(false), 150 + Math.random() * 200)
      }
    }, 5000)
    
    // Individual letter flickers
    const flickerInterval = setInterval(() => {
      const charIndex = Math.floor(Math.random() * text.length)
      
      // Skip spaces
      if (text[charIndex] === ' ') return
      
      setFlickers(prev => ({
        ...prev,
        [charIndex]: false
      }))
      
      // Turn back on after a short delay
      setTimeout(() => {
        setFlickers(prev => ({
          ...prev,
          [charIndex]: true
        }))
      }, 50 + Math.random() * 150)
    }, 1000)
    
    return () => {
      clearInterval(powerFailureInterval)
      clearInterval(flickerInterval)
    }
  }, [text, powerUpPhase])
  
  return (
    <div className={`neon-container ${className} ${darkMode ? "dark" : ""}`}>
      {/* Background glow effect */}
      <div className="neon-glow-background"></div>
      
      <div className="neon-text">
        {text.split("").map((char, index) => {
          const isOn = flickers[index] !== false && !powerFailure
          const isSpace = char === " "
          
          return (
            <span 
              key={index} 
              className={`neon-letter ${isOn ? 'on' : 'off'} ${isSpace ? 'space' : ''}`}
            >
              {isSpace ? "\u00A0" : char}
              
              {/* Individual letter glow effect */}
              {!isSpace && (
                <span className="letter-glow"></span>
              )}
            </span>
          )
        })}
      </div>
      
      <style jsx>{`
        .neon-container {
          position: relative;
          display: inline-block;
          padding: 0.5em 1em;
          background-color: ${darkMode ? '#0a0a0a' : '#f0f0f0'};
          border-radius: 8px;
          overflow: hidden;
        }
        
        .neon-glow-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          filter: blur(20px);
          opacity: 0.15;
          background-color: ${selectedColor.primary};
          pointer-events: none;
        }
        
        .neon-text {
          position: relative;
          z-index: 2;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .neon-letter {
          position: relative;
          display: inline-block;
          color: ${darkMode ? '#444' : '#bbb'};
          transition: color 0.1s, text-shadow 0.1s;
        }
        
        .neon-letter.on {
          color: ${selectedColor.secondary};
          text-shadow:
            0 0 2px #fff,
            0 0 4px ${selectedColor.primary},
            0 0 8px ${selectedColor.primary},
            0 0 12px ${selectedColor.primary},
            0 0 16px ${selectedColor.primary};
          animation: neonBuzz 0.1s infinite;
          animation-direction: alternate;
        }
        
        .letter-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          border-radius: 8px;
          filter: blur(6px);
          opacity: 0;
          background-color: ${selectedColor.secondary};
          pointer-events: none;
          transition: opacity 0.1s;
        }
        
        .neon-letter.on .letter-glow {
          opacity: 0.8;
        }
        
        .space {
          width: 0.5em;
        }
        
        .dark {
          background-color: #0a0a0a;
        }
        
        @keyframes neonBuzz {
          0% {
            opacity: 0.97;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
} 