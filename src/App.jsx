import React from "react";
import {Box, ThemeProvider, CssBaseline} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import {theme} from "./theme";
import router from "./routes/router";

export default function App() {
    return (
        <Box sx={{textAlign: 'center'}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </Box>
    );
}

