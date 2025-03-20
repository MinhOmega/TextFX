"use client"

import React, { useState, useEffect } from "react"

interface SplitHorrorAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const SplitHorrorAnimation: React.FC<SplitHorrorAnimationProps> = ({
  text,
  className = "",
  darkMode = true,
}) => {
  const [splitIndices, setSplitIndices] = useState<number[]>([])
  const [glitchIndices, setGlitchIndices] = useState<number[]>([])
  const [flickerIndices, setFlickerIndices] = useState<number[]>([])
  
  // Create horror effects at random intervals
  useEffect(() => {
    // Initial split after component mounts
    const initialTimeout = setTimeout(() => {
      const initialSplitIndex = Math.floor(Math.random() * text.length)
      setSplitIndices([initialSplitIndex])
    }, 1000)
    
    // Randomly split more letters
    const splitInterval = setInterval(() => {
      setSplitIndices(prev => {
        if (prev.length >= Math.ceil(text.length / 2)) return prev
        
        const availableIndices = Array.from({ length: text.length }, (_, i) => i)
          .filter(i => !prev.includes(i) && text[i] !== ' ')
        
        if (availableIndices.length === 0) return prev
        
        const newSplitIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
        return [...prev, newSplitIndex]
      })
    }, 3000)
    
    // Randomly trigger glitch effect
    const glitchInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * text.length)
      setGlitchIndices(prev => [...prev, randomIndex])
      
      setTimeout(() => {
        setGlitchIndices(prev => prev.filter(idx => idx !== randomIndex))
      }, 300)
    }, 2000)
    
    // Randomly trigger flicker effect
    const flickerInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * text.length)
      setFlickerIndices(prev => [...prev, randomIndex])
      
      setTimeout(() => {
        setFlickerIndices(prev => prev.filter(idx => idx !== randomIndex))
      }, 500)
    }, 1500)
    
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(splitInterval)
      clearInterval(glitchInterval)
      clearInterval(flickerInterval)
    }
  }, [text])
  
  return (
    <div 
      className={`split-horror-container ${className} ${darkMode ? "dark" : ""}`}
    >
      <div className="split-text-wrapper">
        {text.split("").map((char, index) => {
          const isSplit = splitIndices.includes(index)
          const isGlitching = glitchIndices.includes(index)
          const isFlickering = flickerIndices.includes(index)
          
          if (char === " ") {
            return <span key={index} className="space-char">&nbsp;</span>
          }
          
          return (
            <span 
              key={index} 
              className={`char-container ${isGlitching ? "glitching" : ""} ${isFlickering ? "flickering" : ""}`}
            >
              {isSplit ? (
                <>
                  <span className="char-top">{char}</span>
                  <span className="char-bottom">{char}</span>
                  <span className="blood-drip"></span>
                </>
              ) : (
                <span className="char-normal">{char}</span>
              )}
            </span>
          )
        })}
      </div>
      <div className="horror-overlay"></div>
      
      <style jsx>{`
        .split-horror-container {
          position: relative;
          padding: 1em;
          background-color: ${darkMode ? '#0a0a0a' : '#f8f8f8'};
          color: ${darkMode ? '#bb0000' : '#880000'};
          font-family: 'Times New Roman', serif;
          overflow: hidden;
          border-radius: 8px;
        }
        
        .split-text-wrapper {
          position: relative;
          display: inline-block;
          z-index: 2;
        }
        
        .char-container {
          position: relative;
          display: inline-block;
          margin: 0 1px;
        }
        
        .char-normal {
          display: inline-block;
          position: relative;
        }
        
        .char-top {
          display: block;
          height: 50%;
          position: relative;
          overflow: hidden;
          transform: translateY(-5%);
          color: ${darkMode ? '#ff0000' : '#cc0000'};
        }
        
        .char-bottom {
          display: block;
          height: 50%;
          position: relative;
          overflow: hidden;
          transform: translateY(5%);
          color: ${darkMode ? '#ff0000' : '#cc0000'};
        }
        
        .char-bottom::before {
          content: attr(data-char);
          position: absolute;
          top: -50%;
        }
        
        .space-char {
          display: inline-block;
          width: 0.5em;
        }
        
        .blood-drip {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 0;
          background-color: ${darkMode ? '#ff0000' : '#cc0000'};
          animation: drip 2s forwards;
          transform: translateX(-50%);
        }
        
        .blood-drip::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: ${darkMode ? '#ff0000' : '#cc0000'};
        }
        
        .glitching {
          animation: glitch 0.3s infinite;
        }
        
        .flickering {
          animation: flicker 0.5s infinite;
        }
        
        .horror-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at center,
            transparent 50%,
            ${darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.1)'} 100%
          );
          z-index: 1;
          pointer-events: none;
        }
        
        .dark {
          text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
        }
        
        @keyframes drip {
          0% {
            height: 0;
          }
          100% {
            height: 20px;
          }
        }
        
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          25% {
            transform: translate(-2px, 2px);
          }
          50% {
            transform: translate(2px, -2px);
          }
          75% {
            transform: translate(-2px, -2px);
          }
        }
        
        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
} 