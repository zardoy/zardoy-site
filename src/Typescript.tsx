/* eslint-disable unicorn/prefer-switch */
"use client"

import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useCamera } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls'

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
    const handleWheel = (event) => {
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

  const getLetterShape = (letter) => {
    const shapes = {
      N: [
        [1,0,0,0,1],
        [1,1,0,0,1],
        [1,0,1,0,1],
        [1,0,0,1,1],
        [1,0,0,0,1],
      ],
      E: [
        [1,1,1],
        [1,0,0],
        [1,1,0],
        [1,0,0],
        [1,1,1],
      ],
      X: [
        [1,0,0,0,1],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [0,1,0,1,0],
        [1,0,0,0,1],
      ],
      T: [
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
      ],
      S: [
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1],
      ],
      C: [
        [1,1,1],
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1,1,1],
      ],
      R: [
        [1,1,1],
        [1,0,1],
        [1,1,0],
        [1,0,1],
        [1,0,1],
      ],
      Y: [
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,1,0],
        [0,1,0],
      ],
      P: [
        [1,1,1,0,0],
        [1,0,0,1,0],
        [1,1,1,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
      ],
      O: [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      I: [
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [1,1,1],
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
                xOffset = -0.5;
              } else if (j === 1) {
                xOffset = 0;
              } else if (j === 2) {
                xOffset = 0.25;
              } else if (j === 3) {
                xOffset = 0.5;
              } else if (j === 4) {
                xOffset = 1;
              }
            }

            if (letter === 'X') {
              if (j === 0) {
                xOffset = -1;
              } else if (j === 1) {
                xOffset = -0.75;
              } else if (j === 2) {
                xOffset = -0.25;
              } else if (j === 3) {
                xOffset = 0.25;
              } else if (j === 4) {
                xOffset = 0.5;
              }
            }

            return (
              <BoxWithEdges
                key={`${i}-${j}`}
                position={[xOffset, (4 - i) * 0.5 - 1, 0]}
              />
            )
          }

          return null
        })
      )}
    </group>
  )
}

const Scene = () => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)
  const isMobileDevice = isMobile()
  const camera = useThree((state) => {
    return state.camera
  })
  const [textRotationY, setTextRotationY] = useState(THREE.MathUtils.degToRad(-45))
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (orbitControlsRef.current) {
      camera.rotation.y = THREE.MathUtils.degToRad(-45)
      //@ts-expect-error idk how to set properly
      orbitControlsRef.current.setAzimuthalAngle(THREE.MathUtils.degToRad(-45))
      orbitControlsRef.current.update()
    }
  }, [])

  // Intersection Observer for visibility optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.1 }
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
            const startX = -totalWidth / 2 + 1.5
            const x = startX + (i * letterSpacing)
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
        autoRotateSpeed={2}
        target={[0, 0, 0]}
        minDistance={3}
        maxDistance={22}
      />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[0, 0, -5]} intensity={0.5} color="#0088cc" />

      <Environment
        background
        files={isMobileDevice
          ? `pano-mobile.jpeg`
          : `pano.jpeg`
        }
      />
    </>
  )
}

// Minecraft-style Play Now Button
const PlayNowButton = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="translate-y-32 pointer-events-auto">
        <a
          href="https://mcraft.fun"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative group flex items-center gap-3
            px-10 py-5 bg-[#2196f3] hover:bg-[#1e88e5]
            text-white font-bold text-2xl tracking-wider uppercase
            border-2 border-black
            transition-colors duration-200
          "
        >
          PLAY NOW
          <span className="text-3xl leading-none group-hover:translate-x-0.5 transition-transform duration-200">&gt;</span>
        </a>
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
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-gray-900">
      {isVisible && (
        <Canvas
          camera={{
            position: [15, 2, 0],
            fov: 60,
          }}
          frameloop="demand" // Only render when needed
        >
          <Scene />
        </Canvas>
      )}
      <PlayNowButton />

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 text-white/70 text-sm">
        Hold <kbd className="px-2 py-1 bg-white/20 rounded">Shift</kbd> + scroll to zoom
      </div>
    </div>
  )
}
