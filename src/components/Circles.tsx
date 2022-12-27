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
        const growTime = 3000
        let keep = 0
        const keepMax = 5
        function update() {
            const [elem] = svgs.splice(0, 1)
            if (keep++ >= keepMax) elem!.remove()
            svgs.push(
                createCircle({
                    divContainer,
                    radius: 100,
                    thickness: 4,
                    expansion: 5,
                    opacity: 0.3,
                    gap: 5,
                    durationSec: 70,
                    expandTime: growTime,
                }),
            )
            const lastIdx = svgs.length - 1
            setBlur(lastIdx, 1)
            svgs[lastIdx]!.style.opacity = '0'
            setTimeout(() => {
                svgs[lastIdx]!.style.opacity = '1'
                setBlur(lastIdx, 30)
            }, 5)
        }

        update()
        setInterval(() => {
            update()
        }, growTime)

        return () => {
            location.reload()
        }
    }, [])

    return (
        <div className="logo-circles">
            <div className="Z-name">Z</div>
            <div className="name-after">
                ARDOY
                <code>
                    {'>'}
                    {'>'}
                </code>
                <a className="font-sans rounded github-button" href="https://github.com/zardoy" target="_blank" rel="noopener noreferrer">
                    <Github className="github-icon" />
                    GitHub
                </a>
            </div>
            <div ref={circlesContainer} className="circles" />
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
    expandTime: growTime,
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
    expandTime?: number
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
    let opac = opacity
    const updateArcs = opac => {
        makeArcs()
        const pathsDiff = arcs.length - paths.length
        for (const _ of Array.from({ length: pathsDiff })) {
            const path = draw.path()
            path.stroke({ width: thickness, color: `rgba(8, 232, 248, ${(Math.min(opac, 1) * 255).toFixed(0)})` })
            paths.push(path)
        }

        for (const [i, arc] of arcs.entries()) paths[i]!.plot(describeArc(...arc))
    }

    updateArcs(opac)
    if (durationSec !== null) {
        animate({
            timing: t => t * 360,
            draw(v) {
                start = v
                updateArcs(opac)
            },
            duration: durationSec * 1000,
        })
        const initialRadius = radius
        animate({
            timing: t => t * 30,
            draw(v) {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                radius = initialRadius + v
            },
            duration: growTime,
        })
        const initialOpacity = opacity
        animate({
            timing: t => t,
            draw(v) {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                opac = initialOpacity + v
            },
            duration: growTime,
        })
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
