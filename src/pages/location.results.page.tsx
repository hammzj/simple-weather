import React from "react";
import {isEmpty} from "lodash";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationSearchForm from '../components/location.search.form';
import LocationDataButton from '../components/location.data.button';

const NoLocationsMessage = () => {
    return (<Box alignContent='center' justifyContent='center'>
        <Typography align='center'>No locations could be found.</Typography>
    </Box>)
}

const LocationButtonsForm = ({locationDataResults}) => {
    return !isEmpty(locationDataResults.results) ?
        (
            <form id='location-data-form'>
                <Stack
                    direction='column'
                    spacing={3}
                    alignItems="center"
                    paddingTop={2}
                >
                    {locationDataResults.results.map(locationData => {
                        return <LocationDataButton locationData={locationData}/>
                    })}
                </Stack>
            </form>
        ) :
        (
            <NoLocationsMessage/>
        )
}

export default function LocationResultsPage(props) {
    const {locationDataResults} = props;
    return (
        <Container>
            <Box
                alignItems="center"
                paddingBottom={2}
            >
                <LocationSearchForm/>
            </Box>
            <Divider orientation='horizontal'/>
            <LocationButtonsForm locationDataResults={locationDataResults}/>
        </Container>)
}
