import React from "react";

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
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
            justify="space-between"
            direction="column"
            alignContent="center"
            className={classes.root}
        >
            {/* todo grid items */}
            <Grid item>
                <Typography className={classes.header} variant="h1">Welcome!</Typography>
                <Typography style={{ textAlign: "center" }} variant="h6">(Huge content coming soon!)</Typography>
            </Grid>
            <Grid item>
                <Button
                    size="large"
                    color="primary"
                    // todo better error if using as rendered child
                    startIcon={<GithubIcon />}
                    rel="noreferrer noopener"
                    href="https://github.com/zardoy"
                >Me GitHub</Button>
            </Grid>
            {/* todo grid item with container */}
            <Grid item>
                <Grid container justify="flex-end" style={{ width: "100%" }}>
                    <Grid item>
                        {/* todo another font */}
                        <Typography variant="button" className={classes.stayReformed}>Stay Reformed...</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        {/* todo return back the comments block */}
    </>;
};

export default MainPage;