import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {getLocationName} from "../services/open_mateo_api/utils";
import {LocationData} from "../services/open_mateo_api/geocoding_api/types";

export default function LocationDataButton({locationData}: { locationData: LocationData }) {
    const locationName = getLocationName(locationData);
    const coordinates = [locationData.latitude, locationData.longitude].join(',');


    function handleOnClick(event) {
        event.preventDefault();
        //TODO: code to open weather page
    }

    return (
        <Box id='location-data-button'>
            <Link
                onClick={handleOnClick}
            >
                <Button
                    type="submit"
                    variant="outlined"
                    value={coordinates}>
                    <span>{locationName}</span>
                </Button>
            </Link>
        </Box>
    )
}
