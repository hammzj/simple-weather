import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {isEmpty, isNil} from "lodash";
import {Box, Stack} from "@mui/material";
import Page from "../components/page";
import Message from '../components/message';
import LoadingMessage from '../components/loading.message';
import LocationDataButton from '../components/location.data.button';
import OpenMeteoGeocodingAPI from '../services/open_meteo_api/geocoding_api';

const NoLocationsMessage = (): React.ReactElement => {
    return <Message value='No locations could be found.'/>
}

const SelectLocationMessage = (): React.ReactElement => {
    return <Message
        typographyProps={{variant: 'h5'}}
        value='Select a location to view the weather forecast:'/>
}

const LocationButtonsForm = ({locationDataResults}): React.ReactElement => {
    const hasResults = !isEmpty(locationDataResults.results);
    return (
        <form id='location-data-form'>
            <Stack
                direction='column'
                spacing={4}
                alignItems="center"
            >
                {hasResults ? (
                    <>
                        <SelectLocationMessage/>
                        {locationDataResults.results.map((locationData, i) => {
                            return <LocationDataButton key={i} locationData={locationData}/>
                        })}
                    </>
                ) : <NoLocationsMessage/>}
            </Stack>
        </form>
    )
}

export default function LocationResultsPage(): React.ReactElement {
    const location = useLocation();
    const [locationDataResults, setLocationDataResults] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const name = new URLSearchParams(location.search).get('name');
    const language = new URLSearchParams(location.search).get('language') || undefined;

    //TODO: when hitting the back button, return to the index page ALWAYS
    useEffect(() => {
        //TODO: get other params, like pagination
        const searchForLocationsAndSetResults = async (name) => {
            try {
                setIsLoading(true);
                const response = await OpenMeteoGeocodingAPI.searchForLocations({name, language});
                console.debug('searchForLocations response', response);
                setLocationDataResults(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        searchForLocationsAndSetResults(name);
    }, [name]);

    return (
        <Page>
            <Box
                paddingTop={2}
                paddingBottom={2}
            >
            {
                isLoading ? <LoadingMessage/> :
                    isNil(locationDataResults) ?
                        <NoLocationsMessage/> :
                        <LocationButtonsForm locationDataResults={locationDataResults}/>
            }
            </Box>
        </Page>
    )
}
