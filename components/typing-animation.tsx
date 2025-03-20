"use client"

import React, { useEffect, useState } from "react"

interface TypingAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  typingSpeed?: number
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
  typingSpeed = 150,
}) => {
  const [displayText, setDisplayText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Handle typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, typingSpeed)
      
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, typingSpeed])

  // Handle cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)
    
    return () => clearInterval(interval)
  }, [])

  // Reset animation when text changes
  useEffect(() => {
    setDisplayText("")
    setCurrentIndex(0)
    setIsComplete(false)
  }, [text])

  return (
    <div className={`font-mono ${className}`}>
      <div className={`${darkMode ? "text-white" : "text-black"}`}>
        {displayText}
        <span 
          className={`
            inline-block w-0.5 h-5 ml-0.5 relative top-0.5
            ${cursorVisible ? (darkMode ? 'bg-white' : 'bg-black') : 'opacity-0'}
            ${isComplete ? 'animate-pulse' : ''}
          `}
        ></span>
      </div>
    </div>
  )
} 