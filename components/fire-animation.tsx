"use client"

import React from "react"

interface FireAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const FireAnimation: React.FC<FireAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false, // Ignored as fire has its own colors
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Base Text */}
      <div className="relative z-10">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="relative inline-block text-yellow-300"
            style={{
              textShadow: "0 0 4px #ff3, 0 0 12px #f73",
            }}
          >
            {char === " " ? "\u00A0" : char}
            
            {/* Fire particles for each character */}
            {char !== " " && (
              <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none h-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 left-1/2 w-[1px] h-[10px] rounded-full animate-fire-particle"
                    style={{
                      background: `linear-gradient(to top, transparent, ${["#f00", "#f50", "#f80", "#ff0"][i % 4]})`,
                      left: `${(Math.random() * 0.8 + 0.1) * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${0.5 + Math.random() * 1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </span>
        ))}
      </div>
      
      {/* Fire base effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/3 blur-sm"
        style={{
          background: "linear-gradient(to top, rgba(255,50,0,0.4) 0%, transparent 100%)",
          zIndex: 0,
        }}
      />
      
      <style jsx>{`
        @keyframes fireParticle {
          0% {
            height: 0px;
            opacity: 0;
          }
          20% {
            height: 10px;
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px);
            opacity: 0;
          }
        }
        
        .animate-fire-particle {
          animation: fireParticle 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
} 