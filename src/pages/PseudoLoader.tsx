import React, { useEffect, useRef } from 'react'
import { styled } from 'twin.macro'
import { Path, SVG } from '@svgdotjs/svg.js'
import { range } from 'rambda'

const size = 100

const Loader = styled.div`
    border-top: 5px solid #26dafd;
    border-bottom: 5px solid #26dafd;
    box-shadow: 0 0 8px #26dafd;
    width: ${size}px;
    height: ${size}px;
    margin-top: ${size / 2}px;
    margin-left: ${size / 2}px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 50%;
`

const Box = styled.div`
    width: 100px;
    height: 100px;
    border: 5px solid transparent;
    background: content-box linear-gradient(red, red), border-box linear-gradient(green, green);
`

const colors = {
    // main: 'rgba(87, 212, 255, 80%)',
    level2: '#4f9df4',
}

const CurvePath = ({ x1, y1, x2, y2, x3, y3, color = null! as keyof typeof colors }) => {
    return <path d={`M${x1} ${y1} C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`} stroke={colors.level2} strokeWidth={1} fill="transparent" />
}

const PseudoLoader: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null!)
    const svgRef = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        if (!canvasRef.current) return
        const ctx = canvasRef.current.getContext('2d')!
        ctx.fillStyle = 'red'
        ctx.arc(50, 50, 25, 0, Math.PI / 2)
        ctx.fill()
    }, [])

    useEffect(() => {
        const draw = SVG().addTo(svgRef.current).size(500, 500)
        const radius = 50
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
        // const describeArcWithExpansion = (x: number, y: number, radius: number, startAngle: number, expan) =>

        const d = describeArc(200, 200, 50, 100, 120)
        // const path = draw.path(d).fill('none').stroke({ width: 15, color: colors.level2 })
        const arcs: Array<[x: number, y: number, r: number, s: number, e: number]> = []
        const xy = [200, 200] as const
        const start = 20
        for (const i of range(0, 4)) {
            const expansion = 20
            const gap = 10
            const localStart = start + i * (expansion + gap)
            arcs.push([...xy, 50, localStart, localStart + expansion])
        }

        const i = 0
        // const callback = () => {
        //     i++
        //     const d = describeArc(200, 200, 50, i, i + 20)
        //     path.plot(d)
        // }

        const paths = [] as Path[]
        const updateArcs = () => {
            const pathsDiff = arcs.length - paths.length
            // TODO if negative?
            for (const i of Array.from({ length: pathsDiff })) {
                const path = draw.path()
                path.stroke({ width: 15, color: colors.level2 })
                paths.push(path)
            }

            for (const [i, arc] of arcs.entries()) paths[i]!.plot(describeArc(...arc))
        }

        updateArcs()

        // setInterval(callback, 5)
    }, [])

    return (
        <div ref={svgRef}>
            {/* <canvas ref={canvasRef} width={200} height={200} /> */}
            {/* <svg width={200} height={200} xmlns="http://www.w3.org/2000/svg">
            <CurvePath x1={20} y1={20} x2={40} y2={40} x3={60} y3={20} color='main' />
        </svg> */}
            {/* <Loader /> */}
        </div>
    )
}

export default PseudoLoader
