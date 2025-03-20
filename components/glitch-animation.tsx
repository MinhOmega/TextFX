"use client"

import React, { useEffect, useState } from "react"

interface GlitchAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const GlitchAnimation: React.FC<GlitchAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    // Random glitch timing effect
    const interval = setInterval(() => {
      setGlitchActive(true)
      
      // Reset glitch effect after a short delay
      setTimeout(() => {
        setGlitchActive(false)
      }, 150)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Base text */}
      <div className={`relative z-10 ${darkMode ? "text-white" : "text-black"}`}>
        {text}
      </div>
      
      {/* Glitch effects */}
      {glitchActive && (
        <>
          <div 
            className={`absolute top-0 left-0 z-20 ${darkMode ? "text-red-400" : "text-red-600"}`}
            style={{ 
              clipPath: "rect(24px, 550px, 90px, 0)",
              transform: "translate(-2px, -2px)",
              animation: "glitch-anim 2s infinite linear alternate-reverse",
            }}
          >
            {text}
          </div>
          
          <div 
            className={`absolute top-0 left-0 z-20 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
            style={{ 
              clipPath: "rect(43px, 550px, 75px, 0)",
              transform: "translate(2px, 2px)",
              animation: "glitch-anim2 4s infinite linear alternate-reverse",
            }}
          >
            {text}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-anim {
          0% {
            clip-path: rect(24px, 550px, 90px, 0);
            transform: translate(-2px, -2px);
          }
          20% {
            clip-path: rect(76px, 550px, 60px, 0);
            transform: translate(-1px, 1px);
          }
          40% {
            clip-path: rect(35px, 550px, 85px, 0);
            transform: translate(1px, -1px);
          }
          60% {
            clip-path: rect(57px, 550px, 38px, 0);
            transform: translate(2px, 2px);
          }
          80% {
            clip-path: rect(12px, 550px, 70px, 0);
            transform: translate(-2px, 1px);
          }
          100% {
            clip-path: rect(92px, 550px, 11px, 0);
            transform: translate(1px, -2px);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            clip-path: rect(43px, 550px, 75px, 0);
            transform: translate(2px, 2px);
          }
          20% {
            clip-path: rect(8px, 550px, 42px, 0);
            transform: translate(-1px, 1px);
          }
          40% {
            clip-path: rect(90px, 550px, 23px, 0);
            transform: translate(1px, -1px);
          }
          60% {
            clip-path: rect(18px, 550px, 92px, 0);
            transform: translate(-2px, -2px);
          }
          80% {
            clip-path: rect(61px, 550px, 5px, 0);
            transform: translate(2px, -1px);
          }
          100% {
            clip-path: rect(31px, 550px, 87px, 0);
            transform: translate(-1px, 2px);
          }
        }
      `}</style>
    </div>
  )
} 