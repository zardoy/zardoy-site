import React from 'react'
import Circles from './Circles'

const MainBlock: React.FC = () => {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
            }}
        >
            <Circles />
        </div>
    )
}

export default MainBlock
