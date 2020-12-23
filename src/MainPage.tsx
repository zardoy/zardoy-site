import React from "react";

import { Button, Grid, makeStyles } from "@material-ui/core";
import { GitHub as GithubIcon } from "@material-ui/icons";

interface ComponentProps {
}

const useStyles = makeStyles((theme) => ({
    header: {
        // color: theme.palette.primary.main
    },
    root: {
        height: "100vh"
    },
    stayReformed: {
        // todo sugesstions hover
        fontStyle: "italic",
        color: "orange"
    }
}));

let MainPage: React.FC<ComponentProps> = () => {
    const classes = useStyles();

    return <>
        <Grid
            container
            justify="center"
            alignContent="center"
            className={classes.root}
        >
            {/* todo grid items */}
            {/* move to css */}
            <Button
                size="large"
                color="primary"
                // todo better error if using as rendered child
                startIcon={<GithubIcon />}
                rel="noreferrer noopener"
                href="https://github.com/zardoy"
            >ME ON GITHUB</Button>
            {/* todo grid item with container */}
        </Grid>
        {/* todo return back the comments block */}
    </>;
};

export default MainPage;