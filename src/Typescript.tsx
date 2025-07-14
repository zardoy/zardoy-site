/* eslint-disable unicorn/prefer-switch */
'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useCamera, Stats } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls'
import { motion } from 'framer-motion'
import { FaGamepad, FaCube } from 'react-icons/fa'

const isMobile = () => {
    if (typeof window === 'undefined') return false
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
}

// Custom OrbitControls that only zooms with Shift+Wheel
const CustomOrbitControls = ({ orbitControlsRef, ...props }) => {
    const { camera, gl } = useThree()

    useEffect(() => {
        if (!orbitControlsRef.current) return

        const controls = orbitControlsRef.current

        // Override the wheel event handler
        const handleWheel = event => {
            if (event.shiftKey) {
                // Allow normal zoom behavior when shift is held
            } else {
                // Prevent zoom and allow page scroll
                event.preventDefault = () => {} // Disable preventDefault
                event.stopPropagation()
                return false
            }
        }

        // Add custom wheel listener
        gl.domElement.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            gl.domElement.removeEventListener('wheel', handleWheel)
        }
    }, [gl, orbitControlsRef])

    return <OrbitControls ref={orbitControlsRef} {...props} />
}

const BoxWithEdges = ({ position }) => {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshPhysicalMaterial
                    transparent
                    color="#00d4ff"
                    roughness={0.1}
                    metalness={0.2}
                    opacity={0.9}
                    transmission={0.3}
                    clearcoat={1}
                    emissive="#0088cc"
                    emissiveIntensity={0.5}
                />
            </mesh>
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
                <lineBasicMaterial color="#00ffff" linewidth={3} />
            </lineSegments>
        </group>
    )
}

const BoxLetter = ({ letter, position }) => {
    const group = useRef()

    const getLetterShape = letter => {
        const shapes = {
            N: [
                [1, 0, 0, 0, 1],
                [1, 1, 0, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 0, 1, 1],
                [1, 0, 0, 0, 1],
            ],
            E: [
                [1, 1, 1],
                [1, 0, 0],
                [1, 1, 0],
                [1, 0, 0],
                [1, 1, 1],
            ],
            X: [
                [1, 0, 0, 0, 1],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [1, 0, 0, 0, 1],
            ],
            T: [
                [1, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
            S: [
                [1, 1, 1],
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
                [1, 1, 1],
            ],
            C: [
                [1, 1, 1],
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 1],
            ],
            R: [
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 0],
                [1, 0, 1],
                [1, 0, 1],
            ],
            Y: [
                [1, 0, 1],
                [1, 0, 1],
                [1, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],
            P: [
                [1, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 1, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
            ],
            O: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0],
            ],
            I: [
                [1, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 1],
            ],
        }
        return shapes[letter] || shapes.N // Default to 'N' if letter is not found
    }

    const letterShape = getLetterShape(letter)

    return (
        <group ref={group} position={position}>
            {letterShape.map((row, i) =>
                row.map((cell, j) => {
                    if (cell) {
                        // let xOffset = j * 0.5 - (letter === 'T' || letter === 'S' || letter === 'Y' || letter === 'C' ? 1 : letter === 'E' ? 0.5 : letter === 'X' || letter === 'N' ? 1 : 0.75)
                        let xOffset = j * 0.5 - 1

                        if (letter === 'N') {
                            if (j === 0) {
                                xOffset = -0.5
                            } else if (j === 1) {
                                xOffset = 0
                            } else if (j === 2) {
                                xOffset = 0.25
                            } else if (j === 3) {
                                xOffset = 0.5
                            } else if (j === 4) {
                                xOffset = 1
                            }
                        }

                        if (letter === 'X') {
                            if (j === 0) {
                                xOffset = -1
                            } else if (j === 1) {
                                xOffset = -0.75
                            } else if (j === 2) {
                                xOffset = -0.25
                            } else if (j === 3) {
                                xOffset = 0.25
                            } else if (j === 4) {
                                xOffset = 0.5
                            }
                        }

                        return <BoxWithEdges key={`${i}-${j}`} position={[xOffset, (4 - i) * 0.5 - 1, 0]} />
                    }

                    return null
                }),
            )}
        </group>
    )
}

const Scene = () => {
    const orbitControlsRef = useRef<OrbitControlsImpl>(null)
    const isMobileDevice = isMobile()
    const camera = useThree(state => {
        return state.camera
    })
    const [textRotationY, setTextRotationY] = useState(THREE.MathUtils.degToRad(-45))
    const [isVisible, setIsVisible] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (orbitControlsRef.current) {
            camera.rotation.y = THREE.MathUtils.degToRad(-45)
            //@ts-expect-error idk how to set properly
            orbitControlsRef.current.setAzimuthalAngle(THREE.MathUtils.degToRad(-25))
            //@ts-expect-error idk how to set properly
            orbitControlsRef.current.setPolarAngle(THREE.MathUtils.degToRad(105))
            orbitControlsRef.current.update()
        }
    }, [])

    // Intersection Observer for visibility optimization
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0]
                if (entry) {
                    setIsVisible(entry.isIntersecting)
                }
            },
            { threshold: 0.1 },
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Only render when visible
    useFrame(() => {
        if (!isVisible) return
        // Frame will be rendered automatically by R3F
    })

    return (
        <>
            <group position={[-0.5, 0, 0]} rotation={[0, textRotationY, 0]}>
                {[...'TYPESCRIPT'].map((letter, i) => {
                    const wordLength = 'TYPESCRIPT'.length
                    const letterSpacing = 2.5
                    const totalWidth = wordLength * letterSpacing
                    const startX = -totalWidth / 2 + 2.5
                    const x = startX + i * letterSpacing
                    // eslint-disable-next-line react/no-array-index-key
                    return <BoxLetter key={`${letter}-${i}`} letter={letter} position={[x, 0, 0]} />
                })}
            </group>
            <CustomOrbitControls
                enableZoom
                enablePan
                enableRotate
                autoRotate
                orbitControlsRef={orbitControlsRef}
                autoRotateSpeed={1}
                target={[0, 0, 0]}
                minDistance={3}
                maxDistance={22}
            />

            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
            <pointLight position={[0, 0, 5]} intensity={1} color="#00d4ff" />
            <pointLight position={[0, 0, -5]} intensity={0.5} color="#0088cc" />

            <Environment background files={isMobileDevice ? `pano-mobile.jpeg` : `pano.jpeg`} />
        </>
    )
}

// Minecraft-style Play Now Button
const PlayNowButton = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="translate-y-32 pointer-events-auto">
                <button className="py-5 px-16 bg-blue-900/80 text-blue-300 font-mono uppercase tracking-wider rounded relative overflow-hidden group hover:bg-blue-800/75 transition-all duration-300 border border-blue-400">
                    <FaGamepad className="inline-block w-6 h-6 mr-3" />
                    <span className="text-xl font-bold">PLAY NOW</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 border-2 border-blue-400 rounded-full animate-ping"
                                style={{
                                    left: `${15 + i * 12}%`,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                </button>
            </div>
        </div>
    )
}

// Add this to your global CSS or in a style tag in your component
const scanAnimation = `
@keyframes scan {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}
`

// eslint-disable-next-line react/function-component-definition
export default function Component() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(true)
    const [isSceneLoaded, setIsSceneLoaded] = useState(false)

    useEffect(() => {
        // Add the animation to the document
        const style = document.createElement('style')
        style.textContent = scanAnimation
        document.head.append(style)
        return () => style.remove()
    }, [])

    // Intersection Observer for visibility optimization
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0]
                if (entry) {
                    setIsVisible(entry.isIntersecting)
                }
            },
            { threshold: 0.1 },
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Simulate scene loading delay for smooth fade-in
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSceneLoaded(true)
        }, 500) // 500ms delay for smooth fade-in

        return () => clearTimeout(timer)
    }, [])

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-gray-900">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isSceneLoaded ? 1 : 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full h-full"
            >
                {isVisible && (
                    <Canvas
                        camera={{
                            position: [15, 2, 0],
                            fov: 60,
                        }}
                        frameloop="demand" // Only render when needed
                    >
                        <Scene />
                        {/* GL Stats for development */}
                        {import.meta.env.DEV && <Stats />}
                    </Canvas>
                )}
            </motion.div>
            <PlayNowButton />

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 text-white/70 text-sm">
                Hold <kbd className="px-2 py-1 bg-white/20 rounded">Shift</kbd> + scroll to zoom
            </div>
        </div>
    )
}
