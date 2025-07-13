import { PuffsContainer } from './components/Background'
import FuzzyText from './components/FuzzyText/FuzzyText'

export default () => {
    return <div>
        <PuffsContainer />
        <div style={{
            width: '100%',
            height: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        }}>
            <FuzzyText
                enableHover
                baseIntensity={0.2}
                hoverIntensity={0.5}
            >
                404
            </FuzzyText>
        </div>
    </div>
}
