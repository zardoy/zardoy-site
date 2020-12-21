// todo it's workaround. make it in material-ui way
import "./main.css";

import React from "react";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import MainPage from "./MainPage";

interface Props {
}

const appTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#00ff00"
        }
    }
});

let App: React.FC<Props> = () => {
    return <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <MainPage />
    </ThemeProvider>;
};

export default App;