import React, { useState, useCallback } from "react";
import { PlayArrow as PlayArrowIcon, Pause as PauseIcon } from "@material-ui/icons";
import { Button } from "@material-ui/core";
// import SoundCloudPlayer from "react-player/soundcloud";
import ReactPlayer from "react-player";

const BACKGROUND_VIDEO_ID = "pITfVZcUSeI";

interface Props {
}

let Video: React.FC<Props> = () => {
    const [musicPlaying, setMusicPlaying] = useState(false);

    const handleToggleMusicButtonClick = useCallback(() => {
        setMusicPlaying(state => !state);
    }, []);

    return <>
        <Button
            variant="contained"
            startIcon={musicPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={handleToggleMusicButtonClick}
        >
            {musicPlaying ? "PAUSE" : "PLAY SOME"} GACHI
        </Button>
        <ReactPlayer
            url={`youtube.com/watch?v=${BACKGROUND_VIDEO_ID}`}
            muted
            loop
            playsinline
            playing={true}
            config={{
                youtube: {
                    playerVars: {
                        showinfo: 0
                    }
                }
            }}
            width={"100%"}
            height={"100%"}
            style={{
                zIndex: -1,
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden"
            }}
        />
        <ReactPlayer
            url="https://soundcloud.com/user-778575298/gachimuchi-ultimate-medley-2"
            playing={musicPlaying}
            height={0}
        />
    </>;
};

export default Video;