import React from 'react';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import PATHS from "../routes/paths";
import {getLocationName} from "../services/open_mateo_api/utils";
import {LocationData} from "../services/open_mateo_api/geocoding_api/types";
import {Coordinates} from "../services/open_mateo_api/forecast_api/types";

interface LocationDataButtonParams {
    locationData: LocationData
}

//TODO: use the ID. we will refetch the locations, then get the coords from it to hit the weather api
const createWeatherPageSearchParams = (locationName: string, opts?: any) => {
    return new URLSearchParams({locationName}).toString();
}

export default function LocationDataButton({locationData}: LocationDataButtonParams) {
    const locationName = getLocationName(locationData);
    const coordinates: Coordinates = [locationData.latitude, locationData.longitude]

    return (
        <Box id='location-data-button'>
            <Link
                state={{locationData}}
                to={{
                    pathname: PATHS.WEATHER,
                    search: createWeatherPageSearchParams(locationName, coordinates),
                }}>
                <Button variant="outlined">
                    <span>{locationName}</span>
                </Button>
            </Link>
        </Box>
    )
}
