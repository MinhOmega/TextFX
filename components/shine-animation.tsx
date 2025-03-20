"use client"

import React from "react"

interface ShineAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const ShineAnimation: React.FC<ShineAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  return (
    <div className={className}>
      <div 
        className={`
          relative inline-block text-transparent bg-clip-text
          ${darkMode ? 
            'bg-gradient-to-r from-white via-blue-500 to-white' : 
            'bg-gradient-to-r from-black via-blue-500 to-black'
          }
          bg-[length:200%_auto]
          animate-gradient
        `}
      >
        {text}
      </div>
    </div>
  )
} 