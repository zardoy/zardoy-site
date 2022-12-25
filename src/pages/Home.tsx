import React from 'react'
import MainBlock from './MainBlock'

interface ComponentProps {}

const Home: React.FC<ComponentProps> = () => {
    return (
        <div tw="bg-[rgb(2, 17, 20)] text-white">
            <MainBlock />
            {/* https://webkul.github.io/coolhue/ */}
        </div>
    )
}

export default Home
