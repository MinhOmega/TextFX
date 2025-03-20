"use client"

import React, { useState, useEffect } from "react"

interface RetroLCDAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const RetroLCDAnimation: React.FC<RetroLCDAnimationProps> = ({
  text = "",
  className = "",
  darkMode = true // Dark mode looks more authentic for LCD screens
}) => {
  const [scanLine, setScanLine] = useState(0)
  const [visibleText, setVisibleText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [lcdNoiseEffect, setLcdNoiseEffect] = useState<boolean[][]>([])
  
  // Initialize LCD noise effect
  useEffect(() => {
    // Create noise pattern for the LCD pixels
    // We'll create a grid of 30x5 noise pixels
    const noiseGrid: boolean[][] = []
    for (let i = 0; i < 5; i++) {
      const row: boolean[] = []
      for (let j = 0; j < 30; j++) {
        row.push(Math.random() > 0.9) // 10% of pixels will have noise
      }
      noiseGrid.push(row)
    }
    setLcdNoiseEffect(noiseGrid)
    
    // Update noise pattern periodically
    const noiseInterval = setInterval(() => {
      setLcdNoiseEffect(prev => {
        const newGrid = [...prev]
        for (let i = 0; i < newGrid.length; i++) {
          for (let j = 0; j < newGrid[i].length; j++) {
            if (Math.random() > 0.9) {
              newGrid[i][j] = !newGrid[i][j]
            }
          }
        }
        return newGrid
      })
    }, 200)
    
    return () => clearInterval(noiseInterval)
  }, [])
  
  // Animate scan line
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev >= 100 ? 0 : prev + 1))
    }, 16) // 60 FPS
    
    return () => clearInterval(scanInterval)
  }, [])
  
  // Type out text with retro terminal effect
  useEffect(() => {
    setVisibleText("")
    setIsTyping(true)
    
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex >= text.length) {
        setIsTyping(false)
        clearInterval(typingInterval)
        return
      }
      
      setVisibleText(prev => prev + text[currentIndex])
      currentIndex++
    }, 100)
    
    return () => clearInterval(typingInterval)
  }, [text])
  
  // Cursor blink effect for when typing is complete
  const [cursorVisible, setCursorVisible] = useState(true)
  
  useEffect(() => {
    if (!isTyping) {
      const cursorInterval = setInterval(() => {
        setCursorVisible(prev => !prev)
      }, 530)
      
      return () => clearInterval(cursorInterval)
    }
  }, [isTyping])
  
  return (
    <div className={`lcd-container ${className} ${darkMode ? "dark" : ""}`}>
      {/* LCD Grid Background */}
      <div className="lcd-grid"></div>
      
      {/* LCD Text Display */}
      <div className="lcd-text">
        <span className="lcd-typed-text">{visibleText}</span>
        {cursorVisible && !isTyping && <span className="lcd-cursor">▌</span>}
      </div>
      
      {/* LCD Noise Effect */}
      <div className="lcd-noise">
        {lcdNoiseEffect.map((row, rowIndex) => (
          <div key={rowIndex} className="noise-row">
            {row.map((isActive, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`noise-pixel ${isActive ? 'active' : ''}`}
                style={{
                  left: `${(colIndex / row.length) * 100}%`,
                  top: `${(rowIndex / lcdNoiseEffect.length) * 100}%`
                }}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* LCD Scan Line */}
      <div 
        className="lcd-scan-line"
        style={{ top: `${scanLine}%` }}
      ></div>
      
      {/* LCD Screen Border */}
      <div className="lcd-border-effect">
        <div className="lcd-glare"></div>
      </div>
      
      <style jsx>{`
        .lcd-container {
          position: relative;
          display: inline-block;
          background-color: ${darkMode ? '#1a3b0d' : '#c0e8b0'};
          color: ${darkMode ? '#5fff44' : '#083400'};
          padding: 15px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          border-radius: 8px;
          box-shadow: 
            inset 0 0 10px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          transform: perspective(800px) rotateX(2deg);
          min-width: 200px;
          letter-spacing: 1px;
        }
        
        .lcd-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 3px 3px;
          z-index: 1;
          pointer-events: none;
        }
        
        .lcd-text {
          position: relative;
          z-index: 2;
          min-height: 1.2em;
        }
        
        .lcd-typed-text {
          text-shadow: 0 0 5px ${darkMode ? 'rgba(95, 255, 68, 0.7)' : 'rgba(8, 52, 0, 0.5)'};
        }
        
        .lcd-cursor {
          animation: blink 1s step-end infinite;
          text-shadow: 0 0 5px ${darkMode ? 'rgba(95, 255, 68, 0.7)' : 'rgba(8, 52, 0, 0.5)'};
        }
        
        .lcd-scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.1)
          );
          z-index: 3;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
        
        .lcd-noise {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
          pointer-events: none;
        }
        
        .noise-pixel {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          opacity: 0;
          transition: opacity 0.1s;
        }
        
        .noise-pixel.active {
          opacity: 1;
        }
        
        .lcd-border-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
          z-index: 5;
          pointer-events: none;
        }
        
        .lcd-glare {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          z-index: 6;
          pointer-events: none;
          border-radius: 8px 8px 0 0;
        }
        
        .dark {
          filter: brightness(0.9) contrast(1.2);
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
} 