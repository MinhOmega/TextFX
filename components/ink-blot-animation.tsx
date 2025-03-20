"use client"

import React, { useEffect, useState } from "react"

interface InkBlotAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

interface InkBlot {
  x: number;
  y: number;
  size: number;
}

export const InkBlotAnimation: React.FC<InkBlotAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [inkBlots, setInkBlots] = useState<InkBlot[]>([]);
  
  useEffect(() => {
    // Reset state when text changes
    setVisibleCharCount(0);
    setInkBlots([]);
    
    // Animate character reveal
    const charTimers: NodeJS.Timeout[] = [];
    for (let i = 0; i < text.length; i++) {
      const timer = setTimeout(() => {
        setVisibleCharCount(i + 1);
        
        // Create ink blots when new character appears
        if (text[i] !== " ") {
          // Create 3-5 ink blots per character
          const blotCount = Math.floor(Math.random() * 3) + 3;
          const newBlots: InkBlot[] = [];
          
          for (let j = 0; j < blotCount; j++) {
            newBlots.push({
              x: Math.random() * 20 - 10, // -10 to 10
              y: Math.random() * 20 - 10, // -10 to 10
              size: Math.random() * 15 + 5, // 5 to 20
            });
          }
          
          setInkBlots(prev => [...prev, ...newBlots]);
        }
      }, i * 200);
      
      charTimers.push(timer);
    }
    
    return () => charTimers.forEach(timer => clearTimeout(timer));
  }, [text]);
  
  return (
    <div className={`${className} ${darkMode ? "text-white" : "text-black"} relative`}>
      {/* Background ink blots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {inkBlots.map((blot, index) => (
          <div
            key={index}
            className="absolute rounded-full animate-ink-spread"
            style={{
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              width: `${blot.size}px`,
              height: `${blot.size}px`,
              left: `calc(${(index % text.length) / text.length * 100}% + ${blot.x}px)`,
              top: `calc(50% + ${blot.y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      
      {/* Text that appears character by character */}
      <div className="relative z-10">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`
              relative inline-block
              ${index < visibleCharCount ? 'animate-ink-appear' : 'opacity-0'}
            `}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes inkSpread {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        
        @keyframes inkAppear {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-ink-spread {
          animation: inkSpread 1.5s ease-out forwards;
        }
        
        .animate-ink-appear {
          animation: inkAppear 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 