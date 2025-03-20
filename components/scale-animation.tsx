"use client"

import React, { useState, useEffect } from "react"

interface ScaleAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const ScaleAnimation: React.FC<ScaleAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [animationComplete, setAnimationComplete] = useState<boolean[]>([])

  useEffect(() => {
    // Reset animation state when text changes
    setAnimationComplete(Array(text.length).fill(false))
    
    // Set up timeouts to mark each character's animation as complete
    const timeouts = text.split("").map((_, index) => {
      return setTimeout(() => {
        setAnimationComplete(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, 2000 + index * 75) // Animation duration + delay
    })
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [text])

  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"}`}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`inline-block ${animationComplete[index] ? "" : "animate-scale"}`}
          style={{ 
            animationDelay: `${index * 0.075}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}

      <style jsx>{`
        @keyframes scaleAnim {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-scale {
          animation: scaleAnim 2s ease-in-out;
          display: inline-block;
          transform-origin: center bottom;
        }
      `}</style>
    </div>
  )
} 