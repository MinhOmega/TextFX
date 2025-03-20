"use client"

import React from "react"

interface NeonAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  color?: string
}

export const NeonAnimation: React.FC<NeonAnimationProps> = ({
  text = "",
  className = "",
  darkMode = true, // Best with dark background
  color = "blue",
}) => {
  // Define color palettes for different neon colors
  const colorMap: Record<string, { main: string, glow: string }> = {
    blue: { main: "#5CDBFF", glow: "#0099ff" },
    red: { main: "#FF5C5C", glow: "#ff0000" },
    green: { main: "#5CFF8F", glow: "#00ff66" },
    purple: { main: "#C45CFF", glow: "#8800ff" },
    pink: { main: "#FF5CD0", glow: "#ff00aa" },
    yellow: { main: "#FFEE5C", glow: "#ffcc00" },
  };
  
  const selectedColor = colorMap[color] || colorMap.blue;
  
  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"}`}>
      <div 
        className="animate-neon-flicker"
        style={{
          color: selectedColor.main,
          textShadow: `
            0 0 5px ${selectedColor.main}, 
            0 0 10px ${selectedColor.main}, 
            0 0 20px ${selectedColor.glow}, 
            0 0 30px ${selectedColor.glow}, 
            0 0 40px ${selectedColor.glow}
          `,
        }}
      >
        {text}
      </div>

      <style jsx>{`
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 5px ${selectedColor.main}, 
              0 0 10px ${selectedColor.main}, 
              0 0 20px ${selectedColor.glow}, 
              0 0 30px ${selectedColor.glow}, 
              0 0 40px ${selectedColor.glow};
          }
          20%, 24%, 55% {
            opacity: 0.8;
            text-shadow: none;
          }
        }
        
        .animate-neon-flicker {
          animation: neonFlicker 5s infinite;
        }
      `}</style>
    </div>
  );
} 