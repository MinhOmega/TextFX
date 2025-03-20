"use client"

import React, { useEffect, useState } from "react"

interface FadeAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  fadeDelay?: number
}

export const FadeAnimation: React.FC<FadeAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
  fadeDelay = 100,
}) => {
  const [visibleLetters, setVisibleLetters] = useState<number[]>([])
  
  useEffect(() => {
    // Reset animation when text changes
    setVisibleLetters([])
    const timers: NodeJS.Timeout[] = []
    
    // Animate each letter with a delay
    const letters = text.split("")
    letters.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => [...prev, index])
      }, index * fadeDelay)
      timers.push(timer)
    })
    
    // Clean up all timers on unmount or when text changes
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [text, fadeDelay])

  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"}`}>
      {text.split("").map((letter, index) => (
        <span 
          key={index}
          className={`
            inline-block transition-opacity duration-700
            ${visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ 
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  )
} 