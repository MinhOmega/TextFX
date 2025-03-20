"use client"

import React, { useState, useEffect, useRef } from "react"

interface LiquidFillAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  fillColor?: string
}

export const LiquidFillAnimation: React.FC<LiquidFillAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
  fillColor = "blue"
}) => {
  const [fillLevel, setFillLevel] = useState(0)
  const [bubbles, setBubbles] = useState<{id: number, x: number, size: number, speed: number, delay: number}[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)
  const previousTimeRef = useRef<number>(0)
  
  // Map different color themes
  const colorThemes = {
    blue: {
      fill: darkMode ? 'rgba(0, 150, 255, 0.7)' : 'rgba(0, 120, 255, 0.7)',
      bubble: darkMode ? 'rgba(120, 200, 255, 0.5)' : 'rgba(160, 220, 255, 0.5)',
      outline: darkMode ? '#4facfe' : '#0078ff'
    },
    green: {
      fill: darkMode ? 'rgba(0, 200, 100, 0.7)' : 'rgba(0, 180, 80, 0.7)',
      bubble: darkMode ? 'rgba(120, 255, 170, 0.5)' : 'rgba(160, 255, 190, 0.5)',
      outline: darkMode ? '#43e97b' : '#00b050'
    },
    red: {
      fill: darkMode ? 'rgba(255, 50, 50, 0.7)' : 'rgba(220, 40, 40, 0.7)',
      bubble: darkMode ? 'rgba(255, 150, 150, 0.5)' : 'rgba(255, 170, 170, 0.5)',
      outline: darkMode ? '#ff5e62' : '#d01818'
    },
    purple: {
      fill: darkMode ? 'rgba(180, 80, 255, 0.7)' : 'rgba(150, 50, 220, 0.7)',
      bubble: darkMode ? 'rgba(200, 150, 255, 0.5)' : 'rgba(200, 170, 255, 0.5)',
      outline: darkMode ? '#a742ff' : '#7317b8'
    }
  }
  
  const theme = colorThemes[fillColor as keyof typeof colorThemes] || colorThemes.blue
  
  // Animate fill
  useEffect(() => {
    setFillLevel(0)
    let startTime = Date.now()
    
    const fillAnimation = () => {
      const elapsedTime = Date.now() - startTime
      const duration = 2500 // 2.5 seconds to fill
      
      if (elapsedTime < duration) {
        const newLevel = (elapsedTime / duration) * 100
        setFillLevel(newLevel)
        requestAnimationFrame(fillAnimation)
      } else {
        setFillLevel(100)
      }
    }
    
    const animationId = requestAnimationFrame(fillAnimation)
    return () => cancelAnimationFrame(animationId)
  }, [text])
  
  // Create bubbles
  useEffect(() => {
    if (!containerRef.current) return
    
    const newBubbles = []
    const bubbleCount = Math.max(text.length, 5)
    
    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 8 + 4, // 4-12px
        speed: Math.random() * 2 + 1, // 1-3s
        delay: Math.random() * 5 // 0-5s
      })
    }
    
    setBubbles(newBubbles)
  }, [text])
  
  // Wave animation
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Animation logic can be added here if needed
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`liquid-fill-container ${className} ${darkMode ? "dark" : ""}`}
    >
      {/* Letter outlines */}
      <div className="letters-outline">
        {text.split("").map((char, index) => (
          <span key={index} className="letter">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      
      {/* Liquid fill */}
      <div 
        className="liquid-fill" 
        style={{ height: `${fillLevel}%` }}
      >
        <div className="wave-effect">
          {text.split("").map((char, index) => (
            <span key={index} className="letter filled-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        
        {/* Bubbles */}
        {bubbles.map(bubble => (
          <div 
            key={bubble.id}
            className="bubble"
            style={{
              left: `${bubble.x}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.speed}s`,
              animationDelay: `${bubble.delay}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        .liquid-fill-container {
          position: relative;
          display: inline-block;
          overflow: hidden;
          font-weight: bold;
          font-size: 1.2em;
          min-height: 1.5em;
          line-height: 1.5;
        }
        
        .letters-outline {
          position: relative;
          z-index: 5;
          color: transparent;
          -webkit-text-stroke: 1.5px ${theme.outline};
        }
        
        .letter {
          position: relative;
          display: inline-block;
        }
        
        .liquid-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: ${theme.fill};
          z-index: 1;
          transition: height 0.05s linear;
          overflow: hidden;
          border-top: 2px solid rgba(255, 255, 255, 0.5);
          mask-image: linear-gradient(to top, black ${fillLevel}%, transparent ${fillLevel}%);
          -webkit-mask-image: linear-gradient(to top, black ${fillLevel}%, transparent ${fillLevel}%);
        }
        
        .wave-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          color: transparent;
          -webkit-text-stroke: 1.5px ${theme.outline};
          animation: wave 2s ease-in-out infinite;
        }
        
        .filled-letter {
          color: white;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
          -webkit-text-stroke: 0;
        }
        
        .bubble {
          position: absolute;
          background: ${theme.bubble};
          border-radius: 50%;
          bottom: 0;
          z-index: 2;
          animation: bubbleRise infinite linear;
          filter: blur(1px);
        }
        
        .dark {
          color: #fff;
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateY(2px);
          }
        }
        
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
} 