import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { isEmpty, isNaN } from "lodash";
import Page from "../components/page";
import LocationSearchForm from "../components/location.search.form";
import SavedLocationsQuickData from "../components/saved.locations.quick.data";
import { getSavedLocationId } from "../components/utils";

export default function IndexPage(): React.ReactElement {
    const savedLocationId = getSavedLocationId();
    const hasLocationId = !isEmpty(savedLocationId) && !isNaN(savedLocationId);
    return (
        <Page renderTopNavBar={false}>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                padding='1em'>
                <Typography align='center' variant='h1' paddingBottom='0.5em'>
                    Simple Weather
                </Typography>
                <Box>
                    <LocationSearchForm />
                    {hasLocationId && <SavedLocationsQuickData locationId={savedLocationId} />}
                </Box>
            </Grid>
        </Page>
    );
}
