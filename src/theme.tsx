import {createTheme, responsiveFontSizes, Theme, ThemeOptions} from "@mui/material/styles";
import {common, red, blue, orange, green, grey} from '@mui/material/colors';
import {isDarkModeSettingsEnabled} from "./components/utils";
import {isEqual} from "lodash";

export type PaletteMode = 'light' | 'dark';

const baseTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: common.white,
            light: '#f5f5f5',
            dark: '#dedede',
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
        //TS Problem child
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    //borderColor: 'primary',
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

export const lightTheme: Theme = responsiveFontSizes(createTheme(baseTheme));

export const darkTheme: Theme = responsiveFontSizes(createTheme(Object.assign(baseTheme, {
    palette: {
        mode: 'dark',
        primary: {
            main: '#292929',
            light: '#a9a9a9',
            dark: '#4b4b4b',
            contrastText: common.white,
        },
        secondary: grey,
        error: red,
        warning: orange,
        info: blue,
        success: green,
    }
})));

export const getTheme = (mode): Theme => isEqual(mode, 'dark')  ? darkTheme : lightTheme;

