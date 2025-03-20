"use client"

import React, { useState, useEffect } from "react"

interface FlipAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const FlipAnimation: React.FC<FlipAnimationProps> = ({
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
      }, 2000 + index * 100) // Animation duration + delay
    })
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [text])

  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"} perspective-[1000px]`}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`inline-block ${animationComplete[index] ? "" : "animate-flip-3d"}`}
          style={{ 
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}

      <style jsx>{`
        @keyframes flip3d {
          0% {
            transform: rotateY(0);
          }
          50% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        
        .animate-flip-3d {
          animation: flip3d 2s ease-in-out;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
} 