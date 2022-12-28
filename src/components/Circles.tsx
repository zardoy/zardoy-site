import { useEffect, useRef } from 'react'
import { Path, SVG } from '@svgdotjs/svg.js'
import { range } from 'rambda'
import { Github } from '@icons-pack/react-simple-icons'

export default () => {
    const circlesContainer = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        const svgs: SVGElement[] = []

        const setBlur = (i: number | SVGElement, px: number) => {
            const elem = typeof i === 'number' ? svgs[i]! : i
            elem.style.filter = px ? `blur(${px}px)` : 'none'
        }

        const divContainer = circlesContainer.current
        svgs.push(
            createCircle({
                divContainer,
                radius: 60,
                thickness: 4,
                expansion: 5,
                gap: 5,
                durationSec: 100,
                onCreate(svg) {
                    let blur = 3
                    const updateBlur = () => {
                        setBlur(svg, blur ? 18 : 0.4)
                    }

                    updateBlur()
                    setInterval(() => {
                        blur++
                        if (blur === 3) blur = 0
                        updateBlur()
                    }, 1500)
                },
            }),
            createCircle({
                divContainer,
                radius: 60,
                thickness: 4,
                expansion: 5,
                gap: 5,
                durationSec: 100,
                addAnim: true,
                onCreate(svg) {
                    setBlur(svg, 1)
                },
            }),
            createCircle({
                divContainer,
                radius: 75,
                initialStart: 140,
                thickness: 10,
                fillPerc: 0.3,
                durationSec: 30,
                onCreate(svg) {
                    setBlur(svg, 40)
                },
            }),
            createCircle({
                divContainer,
                radius: 100,
                initialStart: 140,
                thickness: 20,
                opacity: 0.3,
                durationSec: 20,
                onCreate(svg) {
                    setBlur(svg, 20)
                },
            }),
            createCircle({
                divContainer,
                radius: 160,
                initialStart: 140,
                thickness: 20,
                opacity: 0.3,
                durationSec: 30,
                onCreate(svg) {
                    setBlur(svg, 20)
                },
            }),
        )

        return () => {
            location.reload()
        }
    }, [])

    return (
        <div ref={circlesContainer} className="logo-circles">
            <div className="Z-name">Z</div>
            <div className="name-after flex flex-nowrap">
                ARDOY
                <span className="after-action">
                    <code>
                        {'>'}
                        {'>'}
                    </code>
                    <a className="font-sans rounded github-button" href="https://github.com/zardoy" target="_blank" rel="noopener noreferrer">
                        <Github className="github-icon" />
                        GitHub
                    </a>
                </span>
            </div>
        </div>
    )
}

function createCircle({
    divContainer,
    radius = 50,
    initialStart = 20,
    thickness = 15,
    opacity = 1,
    durationSec = 3,
    expansion = 20,
    gap = 10,
    fillPerc = 1,
    addAnim = false,
    onCreate,
}: {
    divContainer: HTMLDivElement
    radius?: number
    initialStart?: number
    thickness?: number
    opacity?: number
    durationSec?: number | null
    expansion?: number
    gap?: number
    fillPerc?: number
    addAnim?: boolean
    onCreate?: (svg: SVGElement) => any
}) {
    // eslint-disable-next-line new-cap
    const draw = SVG().addTo(divContainer).size(500, 500)
    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
        function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
            const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

            return {
                x: centerX + radius * Math.cos(angleInRadians),
                y: centerY + radius * Math.sin(angleInRadians),
            }
        }

        const start = polarToCartesian(x, y, radius, endAngle)
        const end = polarToCartesian(x, y, radius, startAngle)

        let largeArcFlag = '0'
        if (endAngle >= startAngle) largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
        else largeArcFlag = endAngle + 360 - startAngle <= 180 ? '0' : '1'

        const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ')

        return d
    }

    let arcs: Array<[x: number, y: number, r: number, s: number, e: number]> = []
    const xy = [200, 200] as const
    let start = initialStart
    const makeArcs = () => {
        arcs = []
        const fillCount = Math.floor((360 / (expansion + gap)) * fillPerc)
        for (const i of range(0, fillCount)) {
            const localStart = start + i * (expansion + gap)
            arcs.push([...xy, radius, localStart, localStart + expansion])
        }
    }

    const paths = [] as Path[]
    const updateArcs = () => {
        makeArcs()
        const pathsDiff = arcs.length - paths.length
        for (const _ of Array.from({ length: pathsDiff })) {
            const path = draw.path()
            path.stroke({ width: thickness, color: `rgba(8, 232, 248, ${opacity})` })
            paths.push(path)
        }

        for (const [i, arc] of arcs.entries()) paths[i]!.plot(describeArc(...arc))
    }

    updateArcs()
    if (durationSec !== null) {
        let mult = 1
        animate({
            timing: t => t * mult * 360,
            draw(v) {
                start = v
                updateArcs()
            },
            duration: durationSec * 1000,
            infinite: true,
        })
        if (addAnim) {
            setTimeout(() => {
                animate({
                    // todo rewrite to timing fn
                    timing: t => {
                        if (t < 0.85) return 1 + t * 1.3
                        return 2 + (1 - t) * 0.6
                    },
                    draw(t) {
                        mult = t
                    },
                    duration: 600,
                    infinite: false,
                })
            }, 2500)
        }
    }

    onCreate?.(draw.node)

    return draw.node
}

function animate({ timing, draw, duration, infinite = false, onEachLoop: onEachLoopOption = undefined as any, onEnd = undefined as any }) {
    let start: number
    const onEachLoop = () => {
        start = performance.now()
        onEachLoopOption?.()
    }

    onEachLoop()

    requestAnimationFrame(function animateInner(time) {
        let timeFraction = (time - start) / duration
        if (timeFraction > 1) timeFraction = 1

        const progress = timing(timeFraction)
        draw(progress)

        if (timeFraction >= 1)
            if (infinite) {
                onEachLoop()
            } else {
                onEnd?.()
                return
            }

        requestAnimationFrame(animateInner)
    })
}
