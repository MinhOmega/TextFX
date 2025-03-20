"use client"

import React, { useEffect, useState, useRef } from "react"

interface MagneticAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

interface LetterPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const MagneticAnimation: React.FC<MagneticAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([]);
  const [isAttracted, setIsAttracted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasInitialLayout, setHasInitialLayout] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  
  // Initialize random positions for letters
  useEffect(() => {
    const newPositions: LetterPosition[] = [];
    
    for (let i = 0; i < text.length; i++) {
      newPositions.push({
        x: Math.random() * 100 - 50, // -50 to 50
        y: Math.random() * 100 - 50, // -50 to 50
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5, // 0.5 to 1
      });
    }
    
    setLetterPositions(newPositions);
    
    // Start with letters flying in
    setIsAttracted(false);
    setHasInitialLayout(false);
    
    // After initial animation, start with attraction to center letters
    setTimeout(() => {
      setIsAttracted(true);
      setHasInitialLayout(true);
      
      // Toggle attraction periodically only after initial setup
      const toggleInterval = setInterval(() => {
        setIsAttracted(prev => !prev);
      }, 4000);
      
      return () => clearInterval(toggleInterval);
    }, 1000);
  }, [text]);
  
  // Add subtle continuous movement to letters
  useEffect(() => {
    if (!hasInitialLayout) return;
    
    const animate = () => {
      setLetterPositions(prev => {
        return prev.map(pos => {
          if (isAttracted) return pos; // Don't add random motion when attracted
          
          return {
            ...pos,
            x: pos.x + (Math.random() * 0.6 - 0.3),
            y: pos.y + (Math.random() * 0.6 - 0.3),
            rotation: pos.rotation + (Math.random() * 0.5 - 0.25),
          };
        });
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAttracted, hasInitialLayout]);
  
  // Handle mouse movement for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`${className} ${darkMode ? "text-white" : "text-black"} relative h-32 w-full overflow-hidden`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {text.split('').map((char, index) => {
          const position = letterPositions[index] || { x: 0, y: 0, rotation: 0, scale: 1 };
          
          // Calculate position based on attraction state
          const targetX = isAttracted ? 0 : position.x;
          const targetY = isAttracted ? 0 : position.y;
          const targetRotation = isAttracted ? 0 : position.rotation;
          const targetScale = isAttracted ? 1 : position.scale;
          
          // Calculate magnetic effect from mouse - stronger when attracted
          const magneticStrength = isAttracted ? 0.2 : 0.05;
          const distance = Math.sqrt(
            mousePosition.x * mousePosition.x + 
            mousePosition.y * mousePosition.y
          );
          
          // Inverse square law for magnetic effect - closer letters move more
          const maxDistance = 300;
          const distanceFactor = Math.max(0, 1 - (distance / maxDistance));
          const magnetX = isAttracted ? mousePosition.x * magneticStrength * distanceFactor : 0;
          const magnetY = isAttracted ? mousePosition.y * magneticStrength * distanceFactor : 0;
          
          return (
            <span
              key={index}
              className={`absolute transition-transform font-bold text-xl ${char === " " ? "opacity-0" : ""}`}
              style={{
                transform: `
                  translate(${targetX + magnetX}px, ${targetY + magnetY}px) 
                  rotate(${targetRotation}deg)
                  scale(${targetScale})
                `,
                transitionProperty: 'transform',
                transitionDuration: isAttracted ? '300ms' : '800ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: isAttracted ? '0ms' : `${index * 50}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
} 