"use client"

import type React from "react"

interface TextSlashAnimationProps {
  text: string
  className?: string
  darkMode?: boolean
}

export const TextSlashAnimation: React.FC<TextSlashAnimationProps> = ({
  text = "",
  className = "",
  darkMode = false,
}) => {
  return (
    <div className="mt-3">
      <div className="flex h-full w-full items-center justify-center">
        <div
          className={`relative p-2.5 text-base tracking-[4px] ${darkMode ? "text-white dark:text-white" : "text-black dark:text-white"} ${className}`}
        >
          {/* Slash animation */}
          <div className="absolute left-1/2 top-1/2 z-10 h-[125%] w-0.5 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] scale-y-0 animate-slash bg-white dark:bg-gray-900">
            {/* Background behind slash */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[110%] w-3 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900"></div>

            {/* Slash color */}
            <div className="absolute left-0 top-0 h-full w-full bg-black dark:bg-white"></div>
          </div>

          {/* Border animation */}
          <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
            {/* Top border */}
            <div className="absolute left-0 top-0 h-0.5 w-full animate-side-top bg-black dark:bg-white"></div>

            {/* Right border */}
            <div className="absolute right-0 top-0 h-full w-0.5 animate-side-right bg-black dark:bg-white"></div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full animate-side-bottom bg-black dark:bg-white"></div>

            {/* Left border */}
            <div className="absolute left-0 top-0 h-full w-0.5 animate-side-left bg-black dark:bg-white"></div>
          </div>

          {/* Text animation */}
          <div className="relative">
            {/* Invisible text for sizing */}
            <div className="opacity-0">{text}</div>

            {/* Left part of text */}
            <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
              <div className="w-[200%] origin-left translate-x-full animate-text-left whitespace-nowrap">{text}</div>
            </div>

            {/* Right part of text */}
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
              <div className="w-[200%] origin-right -translate-x-full animate-text-right whitespace-nowrap">{text}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

