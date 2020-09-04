import React, { useRef, useEffect, useState, useCallback } from "react";
import { VolumeUp as VolumeUpIcon, VolumeOff as VolumeOffIcon } from "@material-ui/icons";
import YoutubePlayer from "youtube-player";
import { YouTubePlayer } from "youtube-player/dist/types";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

const BACKGROUND_VIDEO_ID = "pITfVZcUSeI";
const SHOW_UNMUTE_WARNING_KEY = "showUnmuteWarning";

interface Props {
}

let Video: React.FC<Props> = () => {
    const videoRef = useRef(null as HTMLDivElement | null);

    const [player, setPlayer] = useState(null as null | YouTubePlayer);
    const [playerMuted, setPlayerMuted] = useState(true);
    const [showWarning, setShowWarning] = useState(false);

    const handleWarningClose = useCallback(() => setShowWarning(false), []);
    const handleUnmuteConfirm = useCallback(() => {
        if (!player) throw new TypeError("Player hasn't initialized.");
        handleWarningClose();
        localStorage.setItem(SHOW_UNMUTE_WARNING_KEY, "false");
        player.unMute();
        setPlayerMuted(false);
    }, [player, handleWarningClose]);
    const clickUnmuteButtonHandle = useCallback(() => {
        const showUnmuteWarning = localStorage.getItem(SHOW_UNMUTE_WARNING_KEY) === null;
        if (showUnmuteWarning) {
            setShowWarning(true);
        } else {
            handleUnmuteConfirm();
        }
    }, [handleUnmuteConfirm]);
    const clickMuteButtonHandle = useCallback(() => {
        if (!player) throw new TypeError("Player hasn't initialized.");
        player.mute();
        setPlayerMuted(true);
    }, [player]);

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
        setPlayer(localPlayer);
    }, []);

    return <>
        {
            playerMuted ?
                <Button
                    variant="contained"
                    startIcon={<VolumeUpIcon />}
                    onClick={clickUnmuteButtonHandle}
                >
                    UNMUTE
                    </Button> :
                <Button
                    variant="contained"
                    startIcon={<VolumeOffIcon />}
                    onClick={clickMuteButtonHandle}
                >
                    MUTE
                    </Button>
        }

        <Dialog
            open={showWarning}
            onClose={handleWarningClose}
        >
            <DialogTitle>READ BEFORE UNMUTE!!!</DialogTitle>
            <DialogContent>
                THE FOLLOWING CONTENT (SOUND) MAY CONTAIN ELEMENTS THAT ARE NOT SUITABLE FOR SOME AUDIENCES.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleWarningClose}>Cancel</Button>
                <Button onClick={handleUnmuteConfirm}>UNMUTE!!!</Button>
            </DialogActions>
        </Dialog>
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
            {/* YT IFRAME GOES HERE */}
        </div>
    </>;
};

export default Video;