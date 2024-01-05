import React, {useEffect, useMemo} from "react";
import {RouterProvider} from "react-router-dom";
import {Box, ThemeProvider, CssBaseline} from "@mui/material";
import {Theme} from "@mui/material/styles";
import ErrorBoundary from "./components/error.boundary";
import ErrorPage from "./pages/error.page";
import {getTheme, PaletteMode} from "./theme";
import {SETTINGS_KEY_NAMES} from './constants';
import {ColorModeContext} from './contexts';
import router from "./routes/router";
import {TemperatureUnit, WindSpeedUnit, PrecipitationUnit} from './services/open_meteo_api/forecast_api';
import {isNil, toString} from "lodash";

//I bet there's a better way to handle this, but it'll work for now.
//Maybe using a JSON object is better, but we'd still need to individually set the keys.
const createDefaultSettings = () => {
    const defaultSettings = [
        {
            key: SETTINGS_KEY_NAMES.COLOR_MODE,
            fallback: 'light',
        },
        {
            key: SETTINGS_KEY_NAMES.TEMPERATURE_UNIT,
            fallback: TemperatureUnit.fahrenheit,
        },
        {
            key: SETTINGS_KEY_NAMES.WIND_SPEED_UNIT,
            fallback: WindSpeedUnit.mph,
        },
        {
            key: SETTINGS_KEY_NAMES.PRECIPITATION_UNIT,
            fallback: PrecipitationUnit.inch,
        },
    ];
    for (const {key, fallback} of defaultSettings) {
        if (isNil(localStorage.getItem(key))) {
            localStorage.setItem(key, toString(fallback));
            console.debug('No default found for setting. Default value was set for key:', key, toString(fallback));
        }
    }
}

export default function App(): React.ReactElement {
    const [mode, setMode] = React.useState<string>('light');

    //Use local storage to set the color mode
    const colorMode = React.useMemo(
        () => ({
            setColorMode: () => {
                setMode(localStorage.getItem(SETTINGS_KEY_NAMES.COLOR_MODE) ?? 'light')
            },
        }),
        [],
    );
    // Update the theme only if the mode changes
    const theme = useMemo(() => getTheme(mode), [mode]);

    useEffect(() => {
        createDefaultSettings();
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{textAlign: 'center'}}>
                    <ErrorBoundary fallback={<ErrorPage/>}>
                        <RouterProvider router={router}/>
                    </ErrorBoundary>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

