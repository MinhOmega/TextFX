"use client"

import React, { useState, useEffect, useRef } from "react"

interface PaperCutAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  layers?: number
}

export const PaperCutAnimation: React.FC<PaperCutAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
  layers = 5
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Define color palettes for light and dark modes
  const lightPalette = [
    '#ff7eb9', '#ff65a3', '#ff4d79', '#ff3370', '#ff0044', 
    '#82c4fc', '#69b3fa', '#4a99f8', '#2a7ded', '#0059ff'
  ]
  
  const darkPalette = [
    '#5c0025', '#7a0031', '#9c0042', '#b8004c', '#db0057',
    '#002766', '#003a94', '#0052cc', '#0065ff', '#337ffd'
  ]
  
  const palette = darkMode ? darkPalette : lightPalette
  
  // Handle mouse movement to create 3D effect
  useEffect(() => {
    if (!containerRef.current) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      // Calculate mouse position relative to container center
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Animation to show the effect
    setTimeout(() => {
      setIsReady(true)
    }, 100)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`paper-cut-container ${className} ${darkMode ? "dark" : ""} ${isReady ? "ready" : ""}`}
    >
      {/* Create multiple paper layers */}
      {Array.from({ length: layers }).map((_, layerIndex) => (
        <div 
          key={layerIndex}
          className="paper-layer"
          style={{
            zIndex: layers - layerIndex,
            backgroundColor: palette[layerIndex % palette.length],
            transform: `
              translate3d(
                ${(mousePosition.x * (layerIndex + 1) * 0.15)}px, 
                ${(mousePosition.y * (layerIndex + 1) * 0.15)}px, 
                ${layerIndex * -10}px
              )
              rotateX(${-mousePosition.y * 0.05}deg)
              rotateY(${mousePosition.x * 0.05}deg)
            `,
            filter: `brightness(${100 - layerIndex * 6}%)`,
            transitionDelay: `${layerIndex * 30}ms`
          }}
        >
          <div className="text-content">
            {text.split("").map((char, charIndex) => (
              <span 
                key={charIndex} 
                className="paper-char"
                style={{
                  animationDelay: `${charIndex * 50 + layerIndex * 150}ms`
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      ))}
      
      {/* Shadow effect */}
      <div 
        className="shadow-effect"
        style={{
          transform: `
            translate(
              ${-mousePosition.x * 0.25}px, 
              ${-mousePosition.y * 0.25}px
            )
            scale(${1 - Math.abs(mousePosition.x) * 0.003})
          `
        }}
      ></div>
      
      <style jsx>{`
        .paper-cut-container {
          position: relative;
          perspective: 1000px;
          display: inline-block;
          padding: 2em;
          transform-style: preserve-3d;
          font-weight: bold;
        }
        
        .paper-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          border-radius: 4px;
          transition: transform 0.15s ease-out;
          opacity: 0;
          transform: translateZ(0);
        }
        
        .paper-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
          animation: paperCharEnter 0.4s forwards ease-out;
        }
        
        .text-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${darkMode ? 'white' : 'black'};
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .shadow-effect {
          position: absolute;
          top: 20%;
          left: 5%;
          width: 90%;
          height: 60%;
          border-radius: 50%;
          background: rgba(0,0,0,0.15);
          filter: blur(20px);
          z-index: 0;
          transition: transform 0.2s ease-out;
        }
        
        .ready .paper-layer {
          opacity: 1;
        }
        
        .dark .shadow-effect {
          background: rgba(0,0,0,0.3);
        }
        
        @keyframes paperCharEnter {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}