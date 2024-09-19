import React, { useMemo } from 'react'
import { Animator } from '@arwes/react-animator'
import { Puffs } from '@arwes/react-bgs'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

export const PuffsContainer = () => {
    const { height, width } = useWindowSize()

    function calculateProportionalResult(initialValue1, initialValue2, initialResult, newValue1, newValue2) {
        const initialProduct = initialValue1 * initialValue2

        const newProduct = newValue1 * newValue2

        const newResult = (newProduct / initialProduct) * initialResult

        return newResult
    }

    const puffsQuantity = useMemo(() => calculateProportionalResult(1920, 1000, 1000, width, height), [height, width])

    return (
        <Animator key={puffsQuantity} duration={{ enter: 0.5, exit: 0.5, interval: 10 }}>
            <Puffs color="#22baba" quantity={puffsQuantity} padding={20} xOffset={[50, -100]} yOffset={[50, -100]} radiusOffset={[20, 0]} />
        </Animator>
    )
}
