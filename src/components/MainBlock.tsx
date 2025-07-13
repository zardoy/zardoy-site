import React from 'react'
import Typescript from '../Typescript'
import Circles from './Circles'
import Bubbles from './Bubbles'
import ScrollDown from './ScrollDown'

const MainBlock: React.FC = () => {
    return (
        <div>
            <div
                style={{
                    width: '100%',
                    height: '100dvh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                }}
            >
                <Circles />
                <ScrollDown />
            </div>
            <Bubbles />
            <Typescript />
        </div>
    )
}

export default MainBlock
