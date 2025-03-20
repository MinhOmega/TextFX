"use client"

import React, { useState, useEffect, useRef } from "react"

interface Glitch3DAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  intensity?: "low" | "medium" | "high"
}

export const Glitch3DAnimation: React.FC<Glitch3DAnimationProps> = ({
  text = "",
  className = "",
  darkMode = true,
  intensity = "medium"
}) => {
  const [glitching, setGlitching] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  
  // Convert intensity setting to numeric values
  const intensitySettings = {
    low: { frequency: 4000, duration: 200, strength: 0.5 },
    medium: { frequency: 2500, duration: 400, strength: 1 },
    high: { frequency: 1500, duration: 600, strength: 2 }
  }
  
  const settings = intensitySettings[intensity]
  
  // Set up 3D rotation based on mouse movement
  useEffect(() => {
    if (!containerRef.current) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate rotation based on mouse position relative to center
      const rotX = ((e.clientY - centerY) / (window.innerHeight / 2)) * 15
      const rotY = ((e.clientX - centerX) / (window.innerWidth / 2)) * 15
      
      setRotation({
        x: rotX,
        y: rotY,
        z: 0
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  // Set up glitch effect timing
  useEffect(() => {
    // Trigger glitch randomly
    const triggerGlitch = () => {
      setGlitching(true)
      setGlitchIntensity(Math.random() * settings.strength)
      
      // Stop glitching after a short duration
      setTimeout(() => {
        setGlitching(false)
        setGlitchIntensity(0)
      }, Math.random() * settings.duration + 100)
    }
    
    // Set interval for glitch triggers
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance of triggering
        triggerGlitch()
      }
    }, settings.frequency)
    
    // Constant subtle animation
    const animate = () => {
      setRotation(prev => ({
        ...prev,
        z: prev.z + (Math.random() * 0.05 - 0.025) // Small random Z rotation
      }))
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      clearInterval(glitchInterval)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [settings])
  
  return (
    <div 
      ref={containerRef}
      className={`glitch-3d-container ${className} ${darkMode ? "dark" : ""}`}
      style={{
        perspective: '1000px'
      }}
    >
      <div
        className="glitch-3d-content"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
        }}
      >
        {/* Main text layer */}
        <div className="text-layer main-layer">
          {text}
        </div>
        
        {/* RGB split layers - visible during glitch */}
        {glitching && (
          <>
            <div 
              className="text-layer red-layer" 
              style={{ 
                transform: `translate(${glitchIntensity * 5}px, ${glitchIntensity * -3}px)`,
                clipPath: glitchIntensity > 0.7 ? 'polygon(0 15%, 100% 0, 100% 75%, 0 100%)' : 'none'
              }}
            >
              {text}
            </div>
            <div 
              className="text-layer green-layer"
              style={{ 
                transform: `translate(${glitchIntensity * -4}px, ${glitchIntensity * 2}px)`,
                clipPath: glitchIntensity > 0.5 ? 'polygon(0 25%, 100% 15%, 100% 90%, 0 100%)' : 'none'
              }}
            >
              {text}
            </div>
            <div 
              className="text-layer blue-layer"
              style={{ 
                transform: `translate(${glitchIntensity * 3}px, ${glitchIntensity * 4}px)`,
                clipPath: glitchIntensity > 0.6 ? 'polygon(0 0, 100% 25%, 100% 80%, 0 95%)' : 'none'
              }}
            >
              {text}
            </div>
          </>
        )}
        
        {/* Noise overlay for glitch texture */}
        <div 
          className="noise-overlay"
          style={{
            opacity: glitching ? 0.3 : 0.1
          }}
        ></div>
        
        {/* Horizontal glitch slices - only shown during glitch */}
        {glitching && Array.from({ length: 5 }).map((_, index) => {
          const yPos = Math.random() * 100
          const height = Math.random() * 5 + 2
          const xOffset = (Math.random() * 2 - 1) * 10 * glitchIntensity
          
          return (
            <div 
              key={index}
              className="glitch-slice"
              style={{
                top: `${yPos}%`,
                height: `${height}px`,
                transform: `translateX(${xOffset}px)`
              }}
            ></div>
          )
        })}
      </div>
      
      <style jsx>{`
        .glitch-3d-container {
          position: relative;
          display: inline-block;
          font-weight: bold;
          font-size: 1.5em;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${darkMode ? 'white' : 'black'};
          padding: 1em;
        }
        
        .glitch-3d-content {
          position: relative;
          transition: transform 0.2s ease-out;
          transform-style: preserve-3d;
        }
        
        .text-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          backface-visibility: hidden;
          transition: transform 0.1s linear;
        }
        
        .main-layer {
          color: ${darkMode ? 'white' : 'black'};
          text-shadow: 0 0 2px ${darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          position: relative;
          z-index: 2;
        }
        
        .red-layer {
          color: #ff004d;
          opacity: 0.8;
          z-index: 3;
          mix-blend-mode: screen;
        }
        
        .green-layer {
          color: #00ff9d;
          opacity: 0.8;
          z-index: 4;
          mix-blend-mode: screen;
        }
        
        .blue-layer {
          color: #00b8ff;
          opacity: 0.8;
          z-index: 5;
          mix-blend-mode: screen;
        }
        
        .noise-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 10;
          mix-blend-mode: overlay;
          pointer-events: none;
          opacity: 0.1;
        }
        
        .glitch-slice {
          position: absolute;
          left: 0;
          right: 0;
          background-color: ${darkMode ? 'white' : 'black'};
          opacity: 0.2;
          mix-blend-mode: difference;
          z-index: 12;
        }
        
        .dark {
          color: white;
        }
      `}</style>
    </div>
  )
} 