"use client"

import React from "react"

interface GradientAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const GradientAnimation: React.FC<GradientAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  return (
    <div className={className}>
      <div 
        className={`
          inline-block text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500
          bg-[length:400%_100%] animate-gradient-slow
        `}
      >
        {text}
      </div>

      <style jsx>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient-slow {
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>
    </div>
  )
} 