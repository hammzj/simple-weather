import {createTheme, responsiveFontSizes} from "@mui/material";
import {common, red, blue, orange, green, grey} from '@mui/material/colors';
import {isDarkModeSettingsEnabled} from "./components/utils";

const baseTheme = {
    palette: {
        mode: 'light',
        primary: {
            main: common.white,
            contrastText: common.black,
        },
        secondary: grey,
        error: red,
        warning: orange,
        info: blue,
        success: green,
    },
    typography: {
        fontFamily: [
            "Roboto Mono",
            '-apple-system',
            'Consolas',
            'Segoe UI',
            'serif',
        ].join(','),
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderColor: 1,
                    borderRadius: 0,
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 0,
                },
            },
        }
    }
}

const lightTheme = responsiveFontSizes(createTheme(baseTheme));

const darkTheme = responsiveFontSizes(createTheme(Object.assign(baseTheme, {
    palette: {
        mode: 'dark',
        primary: {
            main: common.black,
            contrastText: common.white,
        },
        secondary: grey,
        error: red,
        warning: orange,
        info: blue,
        success: green,
    }
})));

const getTheme = () => isDarkModeSettingsEnabled() ? darkTheme : lightTheme;
export {
    lightTheme,
    darkTheme,
    getTheme,
}
