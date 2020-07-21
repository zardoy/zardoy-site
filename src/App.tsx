import React from "react";
import { CssBaseline, makeStyles, Button, Typography, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { GitHub as GithubIcon } from "@material-ui/icons";
import { Twitch as TwitchIcon } from "@icons-pack/react-simple-icons";
import { blue } from "@material-ui/core/colors";
import { DiscussionEmbed } from "disqus-react";

interface Props {
}

const useStyles = makeStyles({
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
        width: "800px"
    }
});

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
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <Typography
                    variant="h1"
                    component="h1"
                    className={classes.center}
                >
                    Ruining The Games
                </Typography>
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
                        Dead Github Acc
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        startIcon={<TwitchIcon />}
                        color="secondary"
                        rel="noreferrer noopener"
                        href="https://twitch.tv/zardoy"
                    >
                        Silent Twitch Channel
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