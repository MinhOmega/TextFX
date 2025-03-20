"use client"

import React, { useEffect, useState, useRef } from "react"

interface TypewriterAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
  typingSpeed?: number
  pauseDuration?: number
}

export const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
  typingSpeed = 100,
  pauseDuration = 1500,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Reset state when text changes
    setDisplayText("");
    setIsTyping(true);
    setIsPaused(false);
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    // Start typing after a small delay
    const typingStartTimer = setTimeout(() => {
      typingIntervalRef.current = setInterval(() => {
        if (isPaused) return;
        
        setDisplayText(prevText => {
          if (prevText.length < text.length) {
            // Still typing
            const nextChar = text[prevText.length];
            return prevText + nextChar;
          } else {
            // Typing complete
            clearInterval(typingIntervalRef.current!);
            setIsTyping(false);
            
            // Pause before restarting
            setTimeout(() => {
              setIsPaused(true);
              setTimeout(() => {
                setDisplayText("");
                setIsPaused(false);
                setIsTyping(true);
                
                // Restart typing
                typingIntervalRef.current = setInterval(() => {
                  setDisplayText(prevText => {
                    if (prevText.length < text.length) {
                      return prevText + text[prevText.length];
                    } else {
                      clearInterval(typingIntervalRef.current!);
                      setIsTyping(false);
                      return prevText;
                    }
                  });
                }, typingSpeed);
              }, pauseDuration);
            }, 1000);
            
            return prevText;
          }
        });
      }, typingSpeed);
    }, 500);
    
    return () => {
      clearTimeout(typingStartTimer);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [text, typingSpeed, pauseDuration, isPaused]);
  
  return (
    <div className={`font-mono ${className} relative`}>
      <div className={`${darkMode ? "text-white" : "text-black"}`}>
        {displayText}
        <span 
          className={`
            inline-block w-0.5 h-5 ml-0.5 relative top-0.5
            ${darkMode ? 'bg-white' : 'bg-black'}
            ${isTyping ? 'animate-typewriter-cursor' : ''}
          `}
        ></span>
      </div>
      
      {/* Mechanical typing sounds effect (visual cues) */}
      {isTyping && displayText.length > 0 && (
        <div className="absolute -top-2 -right-2 opacity-60">
          <div className="typewriter-key-strike"></div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes typewriterCursor {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        @keyframes keyStrike {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-typewriter-cursor {
          animation: typewriterCursor 0.8s ease infinite;
        }
        
        .typewriter-key-strike {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          animation: keyStrike 0.3s ease-out;
        }
      `}</style>
    </div>
  );
} 