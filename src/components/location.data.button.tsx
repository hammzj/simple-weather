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

const buildGetWeatherSearchParams = (coordinates: Coordinates, opts?: any) => {
    const [latitude, longitude] = coordinates;
    //Typecasting to avoid TS errors but it's completely unnecessary
    return new URLSearchParams({latitude: latitude.toString(), longitude: longitude.toString()}).toString();
}

export default function LocationDataButton({locationData}: LocationDataButtonParams) {
    const locationName = getLocationName(locationData);
    const coordinates: Coordinates = [locationData.latitude, locationData.longitude]

    return (
        <Box id='location-data-button'>
            <Link to={{
                pathname: PATHS.WEATHER,
                search: buildGetWeatherSearchParams(coordinates),
            }}>
                <Button variant="outlined">
                    <span>{locationName}</span>
                </Button>
            </Link>
        </Box>
    )
}
