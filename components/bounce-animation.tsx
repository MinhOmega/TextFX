"use client"

import React from "react"

interface BounceAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const BounceAnimation: React.FC<BounceAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const letters = text.split("")

  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"}`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-bounce"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animationDuration: "1s",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  )
} 