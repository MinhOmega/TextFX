"use client"

import React from "react"

interface WaveAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({
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
          className="inline-block"
          style={{
            animation: "waveAnim 2s ease-in-out infinite",
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}

      <style jsx>{`
        @keyframes waveAnim {
          0%, 100% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  )
} 