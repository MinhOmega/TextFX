"use client"

import React from "react"

interface WaterAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const WaterAnimation: React.FC<WaterAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <div className="relative">
        {/* Water color overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="w-full h-full animate-water-wave"
            style={{
              background: `linear-gradient(0deg, 
                ${darkMode ? 'rgba(37, 99, 235, 0.7)' : 'rgba(59, 130, 246, 0.7)'} 0%, 
                ${darkMode ? 'rgba(28, 78, 216, 0.5)' : 'rgba(37, 99, 235, 0.5)'} 50%, 
                ${darkMode ? 'rgba(37, 99, 235, 0.3)' : 'rgba(59, 130, 246, 0.3)'} 100%
              )`,
              opacity: 0.5,
            }}
          >
            {/* Water ripples */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute inset-0 animate-water-ripple"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                  width: '120%',
                  height: '120%',
                  animationDelay: `${i * 1}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Main text with wavy effect */}
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`
              relative inline-block animate-float
              ${darkMode ? 'text-blue-100' : 'text-blue-900'}
            `}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${2 + Math.random()}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        
        {/* Reflection of the text */}
        <div 
          className="absolute left-0 top-full w-full overflow-hidden"
          style={{
            transform: 'scaleY(-0.3) translateY(-20%)',
            opacity: 0.4,
            filter: 'blur(1px)',
          }}
        >
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={`
                relative inline-block animate-float-inverted
                ${darkMode ? 'text-blue-100' : 'text-blue-900'}
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @keyframes floatInverted {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @keyframes waterWave {
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
        
        @keyframes waterRipple {
          0% {
            width: 0%;
            height: 0%;
            opacity: 0.8;
          }
          100% {
            width: 200%;
            height: 200%;
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-float-inverted {
          animation: floatInverted ease-in-out infinite;
        }
        
        .animate-water-wave {
          animation: waterWave 10s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-water-ripple {
          animation: waterRipple 5s ease-out infinite;
        }
      `}</style>
    </div>
  );
} 