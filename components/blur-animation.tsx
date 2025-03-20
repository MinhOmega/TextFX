"use client"

import React, { useEffect, useState } from "react"

interface BlurAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const BlurAnimation: React.FC<BlurAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [blurAmount, setBlurAmount] = useState(10)
  
  useEffect(() => {
    // Animate from blurry to clear
    setBlurAmount(10)
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setBlurAmount(prev => {
          const newValue = prev - 1
          if (newValue <= 0) {
            clearInterval(interval)
            return 0
          }
          return newValue
        })
      }, 100)
      
      return () => clearInterval(interval)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [text])
  
  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"}`}>
      <div 
        style={{ 
          filter: `blur(${blurAmount}px)`,
          transition: "filter 0.2s ease-out",
        }}
      >
        {text}
      </div>
    </div>
  )
} 