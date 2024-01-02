import React from "react";
import {Link as MuiLink, Stack, Typography} from "@mui/material";
import Page from '../components/page';
import {
    CYPRESS_IO_HOMEPAGE, GITHUB_AUTHOR_LINK,
    MATERIAL_UI_HOMEPAGE, NODEJS_HOMEPAGE,
    OPEN_METEO_HOMEPAGE,
    REACT_DEV_HOMEPAGE, TYPESCRIPT_HOMEPAGE,
} from "../constants";

//TODO: use react markdown instead. it's better
const linkStyle = {color: 'black', textDecorationColor: 'black'};

export default function AboutPage(): React.ReactElement {
    return (
        <Page>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding='1em'
            >
                <Typography variant='h1' paddingBottom='0.5em'>About</Typography>
                <Stack direction='column' spacing={2}>
                    <Typography>
                        <b>Simple Weather</b> was built for two reasons: as a way for me to
                        practice and maintain my web development skills
                        using current frameworks and
                        full-stack development techniques, and to provide a clear implementation of weather forecast
                        data. The website is composed of simple design to convey only necessary information,
                        while being easy to navigate. There are many web applications today that are cluttered with
                        competing content, like empty spaces filled with animated advertisements, chatbot notifications,
                        popup dialogs on page loads, and options hidden behind many menus. It can be a distracting
                        experience that requires a strong focus in order to find the desired information. Therefore,
                        I tried to go back to the basics with a comfortable style in this application.
                    </Typography>

                    <Typography>
                        The frontend uses <MuiLink sx={linkStyle} href={NODEJS_HOMEPAGE}>Node-js</MuiLink>, <MuiLink
                        sx={linkStyle}
                        href={TYPESCRIPT_HOMEPAGE}>TypeScript</MuiLink>, <MuiLink sx={linkStyle}
                                                                                  href={REACT_DEV_HOMEPAGE}>React</MuiLink>, <MuiLink
                        sx={linkStyle} href={MATERIAL_UI_HOMEPAGE}>Material
                        UI</MuiLink>, and is tested with <MuiLink sx={linkStyle}
                                                                  href={CYPRESS_IO_HOMEPAGE}>Cypress</MuiLink>. The
                        backend
                        services
                        utilize the <MuiLink sx={linkStyle} href={OPEN_METEO_HOMEPAGE}>Open-Meteo API</MuiLink>, which
                        pulls from
                        various sources.
                        Take note that the API may only update the data in intervals ranging between ten minutes up to
                        an hour, so
                        please check that website to see the refresh rates of their forecasting sources.
                    </Typography>

                    <Typography> I hope that this website provides a very fluid and comforting experience.</Typography>

                    <Typography>For any information about this website or to report issues, please respond to me through
                        my <MuiLink sx={linkStyle} href={GITHUB_AUTHOR_LINK}>GitHub profile.</MuiLink></Typography>
                </Stack>
            </Stack>
        </Page>
    )
};
