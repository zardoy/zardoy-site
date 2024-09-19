import { Battledotnet, Discord } from '@icons-pack/react-simple-icons'
import { PuffsContainer } from './Background'
import owSvg from './ow.svg'

export default () => {
    return (
        <div className="h-[100dvh] flex items-center justify-center">
            <div className="fixed flex justify-center top-0 left-0 right-0 bottom-0">
                <img src={owSvg} alt="ow" className="object-contain max-w-[400px] grayscale brightness-50 mt-[-80px]" />
            </div>
            <div className="flex flex-col gap-5 z-10">
                <h1
                    className="text-center font-extrabold italic text-3xl sm:text-4xl"
                    style={{
                        fontFamily: 'Russo One, sans-serif',
                    }}
                >
                    Fight me in a 1v1 battle!
                </h1>
                <Note>
                    <Battledotnet /> {import.meta.env.VITE_BATTLE_TAG || 'test#test'}
                </Note>
                <Note>
                    <Discord /> zardoy
                </Note>
            </div>
            <PuffsContainer />
        </div>
    )
}

const Note = ({ children }) => {
    return (
        <div
            className="bg-white bg-opacity-20 px-5 py-2 flex gap-2 select-text font-bold text-xl text-center items-center rounded-md"
            style={{
                // inner shadow
                boxShadow: '0 0 3px rgba(0, 0, 0, 0.5) inset',
            }}
            onClick={() => {}}
        >
            {children}
        </div>
    )
}
