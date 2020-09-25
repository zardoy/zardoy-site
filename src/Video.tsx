import React, { useRef, useEffect, useState, useCallback } from "react";
import { PlayArrow as PlayArrowIcon, Pause as PauseIcon } from "@material-ui/icons";
import YoutubePlayer from "youtube-player";
import { Button } from "@material-ui/core";
// import SoundCloudPlayer from "react-player/soundcloud";
// import YoutubePlayer from "react-player/youtube";

const BACKGROUND_VIDEO_ID = "pITfVZcUSeI";
const SHOW_UNMUTE_WARNING_KEY = "showUnmuteWarning";

interface Props {
}

let Video: React.FC<Props> = () => {
    const videoRef = useRef(null as HTMLDivElement | null);

    const [musicPlaying, setMusicPlaying] = useState(false);

    useEffect(() => {
        if (!videoRef.current) throw new TypeError("React. Ref isn't ready yet.");
        let localPlayer = YoutubePlayer(videoRef.current, {
            videoId: BACKGROUND_VIDEO_ID,
            playerVars: {
                // player should be muted
                // autoplay: 1,
                controls: 0,
                enablejsapi: 1,
                loop: 1,
                rel: 0,
                playsinline: 1,
                disablekb: 1,
                iv_load_policy: 3,
                //@ts-ignore
                showinfo: 0
            }
        });
        localPlayer.on("ready", () => {
            const maxTries = 20;
            const muteAndCheck = () => {
                localPlayer.mute();
                return localPlayer.isMuted();
            };
            if (!muteAndCheck()) {
                let tries = 0;
                // trying to mute the video :/
                let interval = setInterval(() => {
                    if (++tries >= maxTries || muteAndCheck()) {
                        clearInterval(interval);
                        localPlayer.playVideo();
                    }
                }, 100);
            } else {
                localPlayer.playVideo();
            }
        });
        // handle loop. api is rly old
        localPlayer.on("stateChange", (event) => {
            const YT_PLAYER_STATE_ENDED = 0;
            if (event.data === YT_PLAYER_STATE_ENDED) {
                localPlayer.playVideo();
                setTimeout(() => {
                    localPlayer.playVideo();
                }, 150);
            }
        });
        // setPlayer(localPlayer);
    }, []);

    return <>
        {/* {
            playerMuted ?
                <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={clickUnmuteButtonHandle}
                >
                    PLAY SOME GACHI
                    </Button> :
                <Button
                    variant="contained"
                    startIcon={<PauseIcon />}
                    onClick={clickMuteButtonHandle}
                >
                    PAUSE GACHI
                    </Button>
        } */}
        <div ref={videoRef} style={{
            zIndex: -1,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }}>
            {/* JS PLACES YT IFRAME HERE */}
        </div>
    </>;
};

export default Video;