import React from "react";
import { CssBaseline, makeStyles, Button, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { GitHub as GithubIcon } from "@material-ui/icons";
import { Twitch as TwitchIcon } from "@icons-pack/react-simple-icons";
import { blue } from "@material-ui/core/colors";
import { DiscussionEmbed } from "disqus-react";
import Video from "./Video";

interface Props {
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    mainContainer: {},
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px"
    },
    center: {
        textAlign: "center"
    },
    iconStartButton: {
        marginRight: 5
    },
    siteComments: {
        position: "absolute",
        top: "calc(100vh - 80px)",
        width: "100%",
        maxWidth: "800px",
        padding: "0 8px"
    },
    rightAdditionalLink: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1)
    }
}));

const appTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: blue,
        secondary: {
            main: "#9146FF"
        }
    }
});

let App: React.FC<Props> = () => {
    let classes = useStyles();

    return <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Video />
        <Button
            href="https://soundcloud.com/bossofthisgym/gachimuchi-spank-it"
            rel="noreferrer noopener"
            className={classes.rightAdditionalLink}
        >
            Boss of this gym
        </Button>
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <div className={classes.buttonsContainer}>
                    {/* BUTTONS */}
                    <Button
                        size="large"
                        variant="outlined"
                        startIcon={<GithubIcon />}
                        color="primary"
                        rel="noreferrer noopener"
                        href="https://github.com/zardoy"
                    >
                        Me on Github
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        startIcon={<TwitchIcon />}
                        color="secondary"
                        rel="noreferrer noopener"
                        href="https://twitch.tv/zardoy"
                    >
                        My Twitch Channel
                    </Button>
                </div>
            </div>
            <div className={classes.siteComments}>
                <DiscussionEmbed
                    shortname="zardoy"
                    config={{
                        identifier: "HOME_PAGE"
                    }}
                />
            </div>
        </div>
    </ThemeProvider>;
};

export default App;