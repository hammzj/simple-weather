import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import Page from '../components/page';
import LocationSearchForm from "../components/location.search.form";

export default function IndexPage(): React.ReactElement {
    return (
        <Page renderTopNavBar={false}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding='1em'
            >
                <Typography variant='h1' paddingBottom='0.5em'>Simple Weather</Typography>
                <Box>
                    <LocationSearchForm/>
                </Box>
            </Grid>
        </Page>
    )
};
