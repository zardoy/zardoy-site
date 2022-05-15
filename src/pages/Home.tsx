import React from 'react'
import PageBlock from '../components/PageBlock'
import MainBlock from './MainBlock'

interface ComponentProps {}

const Home: React.FC<ComponentProps> = () => {
    return (
        <div tw="bg-[#1e1e1e] text-white">
            <MainBlock />
            {/* https://webkul.github.io/coolhue/ */}
            <PageBlock>
                <h1
                    w-text="transparent 4xl"
                    w-display="inline-block"
                    w-font="italic"
                    w-bg="clip-text gradient-to-br"
                    w-gradient="gradient-to-br from-yellow-400 to-yellow-600"
                >
                    Zardoy
                </h1>
            </PageBlock>
            <PageBlock>
                <h3
                    w-text="transparent 4xl"
                    w-display="inline-block"
                    w-font="italic"
                    w-bg="clip-text gradient-to-br"
                    w-gradient="gradient-to-br from-red-500 to-red-700"
                >
                    My NPM Packages
                </h3>
                {/* from-blue-500 to-blue-700 */}
            </PageBlock>
        </div>
    )
}

export default Home
