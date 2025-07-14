'use client'

import type React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Bubble {
    id: number
    size: number
    color: string
    left: number
    top: number
    animationDuration: number
    animationDelay: number
    animationType: string
    name: string
}

const techStack = [
    {
        name: 'I drive technical excellence by identifying and reducing technical debt, establishing best practices, and implementing architectural revolutions.',
        color: 'rgba(59, 130, 246, 0.4)',
    }, // Blue
    { name: 'Next.js', color: 'rgba(147, 51, 234, 0.4)' }, // Purple
    { name: 'React', color: 'rgba(236, 72, 153, 0.4)' }, // Pink
    { name: 'Prisma', color: 'rgba(34, 197, 94, 0.4)' }, // Green
    { name: 'Electron', color: 'rgba(251, 191, 36, 0.4)' }, // Yellow
    { name: 'RSBuild', color: 'rgba(239, 68, 68, 0.4)' }, // Red
    { name: 'Tailwind', color: 'rgba(20, 184, 166, 0.4)' }, // Teal
    { name: 'Vite', color: 'rgba(168, 85, 247, 0.4)' }, // Violet
    { name: 'Node.js', color: 'rgba(99, 102, 241, 0.4)' }, // Indigo
    { name: 'GraphQL', color: 'rgba(245, 101, 101, 0.4)' }, // Rose
    { name: 'Three.js', color: 'rgba(255, 206, 86, 0.4)' }, // Orange
]

// eslint-disable-next-line react/function-component-definition
export default function Component() {
    const [bubbles, setBubbles] = useState<Bubble[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [hoveredBubble, setHoveredBubble] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const mousePositionRef = useRef({ x: 0, y: 0 })
    const [isMouseInWindow, setIsMouseInWindow] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationTypes = ['float-vertical', 'float-horizontal', 'float-diagonal', 'float-circular', 'float-figure8']

    const handleMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
        setMousePosition({ x: clientX, y: clientY })
        mousePositionRef.current = { x: clientX, y: clientY }
    }

    const handleMouseEnter = () => {
        setIsMouseInWindow(true)
    }

    const handleMouseLeave = () => {
        setIsMouseInWindow(false)
        setHoveredBubble(null)
    }

    const handleBubbleHover = (bubbleId: number, isHovering: boolean) => {
        setHoveredBubble(isHovering ? bubbleId : null)

        // Pause or resume animation using JavaScript
        const bubbleElement = document.querySelector<HTMLDivElement>(`#bubble-${bubbleId}`)
        if (bubbleElement) {
            bubbleElement.style.animationPlayState = isHovering ? 'paused' : 'running'
        }
    }

    useEffect(() => {
        const ab = new AbortController()

        addEventListener(
            'scroll',
            e => {
                if (containerRef.current) {
                    const { x, y } = mousePositionRef.current
                    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
                    if (x < left || x > left + width || y < top || y > top + height) {
                        setIsMouseInWindow(false)
                    } else {
                        setIsMouseInWindow(true)
                    }
                }
            },
            { signal: ab.signal, passive: true },
        )

        const generateBubbles = () => {
            const newBubbles: Bubble[] = []
            const bubbleCount = techStack.length * 3 // 3 bubbles per technology

            for (let i = 0; i < bubbleCount; i++) {
                const tech = techStack[i % techStack.length]!
                newBubbles.push({
                    id: i,
                    size: Math.random() * 100 + 30, // 30px to 130px
                    color: tech.color,
                    left: Math.random() * 90 + 5, // 5% to 95%
                    top: Math.random() * 90 + 5, // 5% to 95%
                    animationDuration: Math.random() * 15 + 10, // 10s to 25s
                    animationDelay: Math.random() * 5 + 1, // 1s to 6s delay
                    animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)]!,
                    name: tech.name,
                })
            }

            setBubbles(newBubbles)
        }

        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            generateBubbles()
            setIsLoaded(true)
        }, 100)

        return () => {
            clearTimeout(timer)
            ab.abort()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-black overflow-hidden relative cursor-none"
            onMouseMove={handleMouseMove as any}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Cursor Spotlight */}
            <AnimatePresence>
                {isMouseInWindow && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`cursor-spotlight ${hoveredBubble ? 'bubble-hovered' : ''}`}
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                        }}
                    >
                        <div className="inner-circle" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-gray-900/10 via-black/20 to-black pointer-events-none" />

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r text-center from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
                    meet my stack
                </h1>
            </div>

            {/* Bubbles */}
            {isLoaded &&
                bubbles.map(bubble => (
                    <div
                        key={bubble.id}
                        id={`bubble-${bubble.id}`}
                        className={`absolute rounded-full bubble ${bubble.animationType} cursor-none transition-transform duration-300`}
                        style={{
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            backgroundColor: bubble.color,
                            left: `${bubble.left}%`,
                            top: `${bubble.top}%`,
                            animationDuration: `${bubble.animationDuration}s`,
                            animationDelay: `${bubble.animationDelay}s`,
                            boxShadow: `0 0 ${bubble.size / 3}px ${bubble.color}, inset 0 0 ${bubble.size / 4}px rgba(255, 255, 255, 0.1)`,
                        }}
                        onMouseEnter={() => handleBubbleHover(bubble.id, true)}
                        onMouseLeave={() => handleBubbleHover(bubble.id, false)}
                    />
                ))}

            {/* Tooltip */}
            {hoveredBubble !== null && (
                <div
                    className="fixed pointer-events-none z-20 px-3 py-2 rounded-lg"
                    style={{
                        left: mousePosition.x + 15,
                        top: mousePosition.y - 35,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <h1 className="text-sm font-medium" style={{ textShadow: 'rgba(224, 75, 176, 0.5) 0px 0px 35.8984px' }}>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            {bubbles.find(b => b.id === hoveredBubble)?.name}
                        </span>
                    </h1>
                </div>
            )}

            <style>{
                /* css */ `
        .bubble {
          backdrop-filter: blur(1px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .bubble:hover {
          box-shadow: 0 0 30px currentColor, inset 0 0 15px rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Cursor Spotlight Styles */
        .cursor-spotlight {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 500px;
          height: 500px;
          transform: translate(-50%, -50%);
          z-index: 999;
        }

        .cursor-spotlight.bubble-hovered::before,
        .cursor-spotlight.bubble-hovered::after {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .cursor-spotlight::before,
        .cursor-spotlight::after,
        .cursor-spotlight .inner-circle {
          content: "";
          position: absolute;
          border-radius: 50%;
        }

        .cursor-spotlight::before,
        .cursor-spotlight::after {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .cursor-spotlight::before {
          width: 500px;
          height: 500px;
          background: rgba(50, 205, 50, 0.03);
          box-shadow: 0 0 60px rgba(50, 205, 50, 0.1);
        }

        .cursor-spotlight::after {
          width: 80px;
          height: 80px;
          background: transparent;
          border: 2px solid rgb(50, 205, 50);
          box-shadow: 0 0 15px rgb(50, 205, 50);
          opacity: 0.8;
        }

        .cursor-spotlight .inner-circle {
          top: 50%;
          left: 50%;
          width: 15px;
          height: 15px;
          transform: translate(-50%, -50%);
          background: rgb(50, 205, 50);
          box-shadow: 0 0 20px rgb(50, 205, 50);
          opacity: 0.9;
        }

        @keyframes float-vertical {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -50px, 0) scale(1.05);
          }
        }

        @keyframes float-horizontal {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(40px, 0, 0) scale(0.95);
          }
        }

        @keyframes float-diagonal {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          25% {
            transform: translate3d(30px, -30px, 0) scale(1.1);
          }
          50% {
            transform: translate3d(60px, 0, 0) scale(0.9);
          }
          75% {
            transform: translate3d(30px, 30px, 0) scale(1.05);
          }
        }

        @keyframes float-circular {
          0% {
            transform: rotate(0deg) translate3d(40px, 0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) translate3d(40px, 0, 0) rotate(-90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) translate3d(40px, 0, 0) rotate(-180deg) scale(0.9);
          }
          75% {
            transform: rotate(270deg) translate3d(40px, 0, 0) rotate(-270deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) translate3d(40px, 0, 0) rotate(-360deg) scale(1);
          }
        }

        @keyframes float-figure8 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          12.5% {
            transform: translate3d(20px, -15px, 0) scale(1.05);
          }
          25% {
            transform: translate3d(0, -30px, 0) scale(0.95);
          }
          37.5% {
            transform: translate3d(-20px, -15px, 0) scale(1.1);
          }
          50% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          62.5% {
            transform: translate3d(20px, 15px, 0) scale(0.9);
          }
          75% {
            transform: translate3d(0, 30px, 0) scale(1.05);
          }
          87.5% {
            transform: translate3d(-20px, 15px, 0) scale(1.1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .float-vertical {
          animation-name: float-vertical;
        }

        .float-horizontal {
          animation-name: float-horizontal;
        }

        .float-diagonal {
          animation-name: float-diagonal;
        }

        .float-circular {
          animation-name: float-circular;
        }

        .float-figure8 {
          animation-name: float-figure8;
        }

        /* Radial gradient background */
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `
            }</style>
        </div>
    )
}
