import GradientText from './TextAnimations/GradientText/GradientText'

export default () => {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer">
            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={8}
                showBorder={false}
                className="text-lg opacity-80 hover:opacity-100"
            >
                Scroll down for more
            </GradientText>
        </div>
    )
}
