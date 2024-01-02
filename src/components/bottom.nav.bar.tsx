import React from 'react';
import {Link} from 'react-router-dom'
import {Container, Stack,} from '@mui/material';
import {GitHub as GitHubIcon} from '@mui/icons-material';
import TextLink from "./text.link";
import OpenMeteoAttributionLink from "./open-meteo-attribution-link";
import {GITHUB_AUTHOR_LINK} from "../constants";
import PATHS from "../routes/paths";

const GitHubIconLink = () => {
    return (<Link
        to={GITHUB_AUTHOR_LINK}>
        <GitHubIcon sx={{color: 'black', textDecorationColor: 'black'}}/>
    </Link>);
}

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
                <TextLink href={PATHS.INDEX}>Home</TextLink>
                <TextLink href={PATHS.ABOUT}>About</TextLink>
                <GitHubIconLink/>
                <OpenMeteoAttributionLink/>
            </Stack>
        </Container>
    )
}
