import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { gt } from "lodash";
import Page from "../components/page";
import LocationSearchForm from "../components/location.search.form";
import SavedLocationsQuickData from "../components/saved.locations.quick.data";
import { getSavedLocationIds } from "../components/utils";

export default function IndexPage(): React.ReactElement {
    const savedLocationIds = getSavedLocationIds();
    console.log(savedLocationIds);
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
                    {gt(savedLocationIds.length, 0) && (
                        <SavedLocationsQuickData locationIds={savedLocationIds} />
                    )}
                </Box>
            </Grid>
        </Page>
    );
}
