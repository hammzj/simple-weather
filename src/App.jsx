import React, {useEffect, useState} from "react";
import {RouterProvider} from "react-router-dom";
import {Box, ThemeProvider, CssBaseline} from "@mui/material";
import ErrorBoundary from "./components/error.boundary";
import ErrorPage from "./pages/error.page";
import {lightTheme, darkTheme, getTheme} from "./theme";
import router from "./routes/router";


export default function App() {
    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        setTheme(getTheme());
    }, []);

    return (
        <Box sx={{textAlign: 'center'}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ErrorBoundary fallback={<ErrorPage/>}>
                    <RouterProvider router={router}/>
                </ErrorBoundary>
            </ThemeProvider>
        </Box>
    );
}

