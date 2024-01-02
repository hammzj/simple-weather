import {createTheme, responsiveFontSizes} from "@mui/material";
import {common, red, blue, orange, green, grey} from '@mui/material/colors';

const lightTheme = responsiveFontSizes(createTheme({
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
}));

export const theme = lightTheme;

//TODO: figure this out later
/*
export const darkTheme = baseTheme({
    mode: 'dark',
    primary: {
        main: common.white,
        contrastText: common.black,
    },
    secondary: grey,
    error: red,
    warning: orange,
    info: blue,
    success: green,
});
*/

