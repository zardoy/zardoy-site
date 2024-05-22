import React, { useMemo } from 'react'
import { Animator } from '@arwes/react-animator'
import { Puffs } from '@arwes/react-bgs'
import MainBlock from './MainBlock'

interface ComponentProps {}

const Home: React.FC<ComponentProps> = () => {
    return (
        <div tw="bg-[rgb(2, 17, 20)] text-white">
            <MainBlock />
            <PuffsContainer />
            <ArwesNote />
            {/* https://webkul.github.io/coolhue/ */}
        </div>
    )
}

const ArwesNote = () => {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 5,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: '#489a9a',
                zIndex: 10,
            }}
        >
            Background by{' '}
            <a href="https://arwes.dev/" rel="noreferrer">
                Arwes
            </a>
        </div>
    )
}

const PuffsContainer = () => {
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

export default Home
