import React, {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {isEmpty, isNil} from "lodash";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OpenMeteoGeocodingAPI from '../services/open_mateo_api/geocoding_api';
import LocationSearchForm from '../components/location.search.form';
import LocationDataButton from '../components/location.data.button';

const NoLocationsMessage = () => {
    return (<Box alignContent='center' justifyContent='center'>
        <Typography align='center'>No locations could be found.</Typography>
    </Box>)
}

const LocationButtonsForm = ({locationDataResults}) => {
    return (
        <form id='location-data-form'>
            <Stack
                direction='column'
                spacing={3}
                alignItems="center"
                paddingTop={2}
            >
                {
                    !isEmpty(locationDataResults.results) ?
                        locationDataResults.results.map(locationData => {
                            return <LocationDataButton locationData={locationData}/>
                        }) :
                        <NoLocationsMessage/>
                }
            </Stack>
        </form>
    )
}

export default function LocationResultsPage() {
    const location = useLocation();
    const [locationDataResults, setLocationDataResults] = useState({});
    const name = new URLSearchParams(location.search).get('name');
    const language = new URLSearchParams(location.search).get('language') || undefined;

    //TODO: when hitting the back button, return to the index page ALWAYS

    useEffect(() => {
        //TODO: get other params, like pagination
        const searchForLocationsAndSetResults = async (name) => {
            try {
                const params = {name, language}
                const response = await OpenMeteoGeocodingAPI.searchForLocations(params);
                setLocationDataResults(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        searchForLocationsAndSetResults(name);
    }, [name]);

    return (
        <Container>
            <Box
                alignItems="center"
                paddingBottom={2}
            >
                <LocationSearchForm/>
            </Box>
            <Divider orientation='horizontal'/>
            {
                isNil(locationDataResults) ?
                    <NoLocationsMessage/> :
                    <LocationButtonsForm locationDataResults={locationDataResults}/>
            }
        </Container>
    )
}
