import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {getLocationName} from "../services/open_mateo_api/utils";
import {LocationData} from "../services/open_mateo_api/geocoding_api/types";
import PATHS from "../routes/paths";

export default function LocationDataButton({locationData}: { locationData: LocationData }) {
    const navigate = useNavigate();
    const locationName = getLocationName(locationData);
    const coordinates = [locationData.latitude, locationData.longitude].join(',');

    function handleOnClick() {
        return navigate(PATHS.WEATHER);
    }

    return (
        <Box id='location-data-button'>
            <form>
                <Button
                    variant="outlined"
                    value={coordinates}
                    onClick={handleOnClick}>
                <span>{locationName}</span>
            </Button>
        </form>
</Box>
)
}
