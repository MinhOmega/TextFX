"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SplitTextAnimationProps {
  text: string
  className?: string
  separatorChar?: string
}

export const SplitTextAnimation: React.FC<SplitTextAnimationProps> = ({
  text = "quang\\minh",
  className = "",
  separatorChar = "\\",
}) => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)
  const [parts, setParts] = useState<string[]>(["", ""])
  const [separator, setSeparator] = useState(true)
  const [showBorder, setShowBorder] = useState(false)
  const [showText, setShowText] = useState(true)

  // Split text at separator character
  useEffect(() => {
    const textParts = text.split(separatorChar)
    if (textParts.length >= 2) {
      setParts([textParts[0], textParts[1]])
    } else {
      setParts([text, ""])
    }
  }, [text, separatorChar])

  // Control animation sequence
  useEffect(() => {
    if (!isAnimating) return

    const sequence = [
      // Step 0: Initial text animation with separator
      () => {
        setShowText(true)
        setSeparator(true)
        setShowBorder(false)
      },
      // Step 1: Remove separator
      () => {
        setSeparator(false)
      },
      // Step 2: Show border
      () => {
        setShowBorder(true)
      },
      // Step 3: Hide text
      () => {
        setShowText(false)
      },
      // Step 4: Hide border
      () => {
        setShowBorder(false)
      },
      // Step 5: Reset animation
      () => {
        setAnimationStep(0)
        return
      },
    ]

    const timer = setTimeout(
      () => {
        sequence[animationStep]()
        setAnimationStep((prev) => (prev + 1) % sequence.length)
      },
      animationStep === 0 ? 2000 : 1000,
    )

    return () => clearTimeout(timer)
  }, [animationStep, isAnimating])

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Text Animation */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {showText && (
            <>
              {/* First part - right to left */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {parts[0]}
              </motion.div>

              {/* Separator */}
              {separator && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                  className="mx-0.5"
                >
                  {separatorChar}
                </motion.div>
              )}

              {/* Second part - left to right */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {parts[1]}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Border Animation */}
      <AnimatePresence>
        {showBorder && (
          <motion.div
            className="absolute inset-0 box-content p-2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            {/* Top border */}
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-black"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0, left: "100%" }}
              transition={{
                duration: 0.3,
                exit: { delay: 0 },
              }}
            />

            {/* Right border */}
            <motion.div
              className="absolute top-0 right-0 w-[1px] bg-black"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{ height: 0, top: "100%" }}
              transition={{
                duration: 0.3,
                delay: 0.3,
                exit: { delay: 0.3 },
              }}
            />

            {/* Bottom border */}
            <motion.div
              className="absolute bottom-0 right-0 h-[1px] bg-black"
              initial={{ width: 0, right: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.6,
                exit: { delay: 0.6 },
              }}
            />

            {/* Left border */}
            <motion.div
              className="absolute bottom-0 left-0 w-[1px] bg-black"
              initial={{ height: 0, bottom: 0 }}
              animate={{ height: "100%" }}
              exit={{ height: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.9,
                exit: { delay: 0.9 },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

