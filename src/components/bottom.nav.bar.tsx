import React from 'react';
import {Container, Stack, Link as MuiLink, Typography} from '@mui/material';
import {GitHub as GitHubIcon} from '@mui/icons-material';
import {GITHUB_AUTHOR_LINK} from "./constants";
import PATHS from "../routes/paths";

export default function BottomNavBar(): React.ReactElement {
    return (
        <Container id='bottom-nav-bar'>
            <Stack direction='row'
                   justifyContent='center'
                   spacing={5}
                   padding='1.2em'
                   marginBottom='2em'
            >
                <MuiLink
                    underline='hover'
                    href={PATHS.ABOUT}>
                    <Typography>About</Typography>
                </MuiLink>
                <MuiLink href={GITHUB_AUTHOR_LINK}>
                    <GitHubIcon/>
                </MuiLink>
            </Stack>
        </Container>
    )
}
