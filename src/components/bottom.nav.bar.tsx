import React from 'react';
import {Link} from 'react-router-dom'
import {Container, Grid,} from '@mui/material';
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
                       marginTop: '1em',
                       marginBottom: '2em',
                   }}
        >
            <Grid container
                  justifyContent='center'
                  alignContent='center'
                  padding={2}
                  spacing={3}
            >
                <Grid item><TextLink href={PATHS.INDEX}>Home</TextLink></Grid>
                <Grid item><TextLink href={PATHS.ABOUT}>About</TextLink></Grid>
                <Grid item><GitHubIconLink/></Grid>
                <Grid item><OpenMeteoAttributionLink/></Grid>
            </Grid>
        </Container>
    )
}
