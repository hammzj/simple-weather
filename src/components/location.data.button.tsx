import React from 'react';
import {Link} from "react-router-dom";
import {Box, Button} from '@mui/material';
import PATHS from "../routes/paths";
import {getLocationName} from "../services/open_meteo_api/utils";
import {LocationData} from "../services/open_meteo_api/geocoding_api";

interface LocationDataButtonParams {
    locationData: LocationData
}

const createWeatherPageSearchParams = (id) => {
    return new URLSearchParams({id}).toString();
}

export default function LocationDataButton({locationData}: LocationDataButtonParams): React.ReactElement {
    return (
        <Box id='location-data-button'>
            <Link
                to={{
                    pathname: PATHS.WEATHER,
                    search: createWeatherPageSearchParams(locationData.id)
                }}>
                <Button
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        border: 1,
                        borderRadius: 0,
                        boxShadow: '2px 2px 1px 1px black;',
                    }}>
                    <span>{getLocationName(locationData)}</span>
                </Button>
            </Link>
        </Box>
    )
}
