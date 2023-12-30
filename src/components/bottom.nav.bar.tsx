import React from 'react';
import {Container, Stack, Link as MuiLink, Typography} from '@mui/material';
import {GitHub as GitHubIcon} from '@mui/icons-material';
import OpenMeteoAttributionLink from "./open-meteo-attribution-link";
import {GITHUB_AUTHOR_LINK} from "../constants";
import PATHS from "../routes/paths";

export default function BottomNavBar(): React.ReactElement {
    return (
        <Container id='bottom-nav-bar'
                   sx={{
                       border: 1,
                       borderRadius: 0,
                       marginBottom: '2em',
                   }}
        >
            <Stack direction='row'
                   justifyContent='center'
                   spacing={5}
                   padding='1.2em'
            >
                <MuiLink
                    sx={{color: 'black', textDecorationColor: 'black'}}
                    underline='hover'
                    href={PATHS.INDEX}>
                    <Typography>Home</Typography>
                </MuiLink>
                <MuiLink
                    sx={{color: 'black', textDecorationColor: 'black'}}
                    underline='hover'
                    href={PATHS.ABOUT}>
                    <Typography>About</Typography>
                </MuiLink>
                <MuiLink
                    sx={{color: 'black', textDecorationColor: 'black'}}
                    href={GITHUB_AUTHOR_LINK}>
                    <GitHubIcon/>
                </MuiLink>
                <OpenMeteoAttributionLink/>
            </Stack>
        </Container>
    )
}
