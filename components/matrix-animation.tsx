"use client"

import React, { useEffect, useState, useRef } from "react"

interface MatrixAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&^*()_-+=<>?";

export const MatrixAnimation: React.FC<MatrixAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>(Array(text.length).fill(""));
  const [finalizedChars, setFinalizedChars] = useState<boolean[]>(Array(text.length).fill(false));
  const [matrixEffect, setMatrixEffect] = useState<boolean>(true);
  const charChangersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Reset on text change
    setDisplayedText(Array(text.length).fill(""));
    setFinalizedChars(Array(text.length).fill(false));
    setMatrixEffect(true);
    
    // Clear any existing intervals
    charChangersRef.current.forEach(timer => clearInterval(timer));
    charChangersRef.current = [];
    
    const newCharChangers: NodeJS.Timeout[] = [];
    const finalTextTimers: NodeJS.Timeout[] = [];
    
    // Create falling matrix effect for each character
    for (let i = 0; i < text.length; i++) {
      const isSpace = text[i] === " ";
      
      if (isSpace) {
        // Don't animate spaces - set them immediately
        setDisplayedText(prev => {
          const newText = [...prev];
          newText[i] = " ";
          return newText;
        });
        setFinalizedChars(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      } else {
        // Rapidly change characters before settling on final character
        const changer = setInterval(() => {
          setDisplayedText(prev => {
            const newText = [...prev];
            if (!finalizedChars[i]) {
              newText[i] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            }
            return newText;
          });
        }, 50 + i * 5); // Slightly increasing randomization rate for sequential effect
        
        newCharChangers.push(changer);
      }
      
      // After some time, fix the character to its final value
      // Earlier characters finalize sooner
      const finalTextTimer = setTimeout(() => {
        // Stop animation for this character and set final value
        setDisplayedText(prev => {
          const newText = [...prev];
          newText[i] = text[i];
          return newText;
        });
        
        setFinalizedChars(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
        
        // Check if this is the last character to be finalized
        if (i === text.length - 1) {
          setTimeout(() => {
            setMatrixEffect(false);
          }, 500);
        }
      }, 300 + i * 120); // Staggered revealing - first characters finalize sooner
      
      finalTextTimers.push(finalTextTimer);
    }
    
    charChangersRef.current = newCharChangers;
    
    return () => {
      charChangersRef.current.forEach(timer => clearInterval(timer));
      finalTextTimers.forEach(timer => clearTimeout(timer));
    };
  }, [text]); 
  
  return (
    <div className={`${className}`}>
      <div className="relative">
        {text.split('').map((_, index) => (
          <span
            key={index}
            className={`
              inline-block
              ${!finalizedChars[index] && matrixEffect ? 'animate-pulse' : ''}
              ${finalizedChars[index] ? 'text-green-500 font-bold' : (darkMode ? 'text-green-700' : 'text-green-600')}
              transition-all duration-300
            `}
            style={{
              textShadow: finalizedChars[index] ? '0 0 5px #00ff00' : 'none',
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {displayedText[index] || " "}
          </span>
        ))}
        
        {/* Digital rain effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {matrixEffect && [...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-green-500 opacity-30 animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                animationDuration: `${1 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Array(5).fill(0).map((_, j) => (
                <div key={j} className="text-xs">
                  {MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes matrixRain {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }
        
        .animate-matrix-rain {
          animation: matrixRain 2s linear infinite;
        }
      `}</style>
    </div>
  );
} 