import React from 'react';
import {useNavigate, Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import PATHS from "../routes/paths";
import {getLocationName} from "../services/open_mateo_api/utils";
import {LocationData} from "../services/open_mateo_api/geocoding_api/types";

export default function LocationDataButton({locationData}: { locationData: LocationData }) {
    //const navigate = useNavigate();
    const locationName = getLocationName(locationData);
    const coordinates = [locationData.latitude, locationData.longitude].join(',');

    function handleOnClick() {
        // return navigate(PATHS.WEATHER);
    }

    return (
        <Box id='location-data-button'>
            <Button
                variant="outlined"
                value={coordinates}>
                <span>{locationName}</span>
            </Button>
        </Box>
    )


//TODO: make this work in cypress
    // return (
    //     <Box id='location-data-button'>
    //         <Link to={PATHS.WEATHER}>
    //             <Button
    //                 variant="outlined"
    //                 value={coordinates}>
    //                 <span>{locationName}</span>
    //             </Button>
    //         </Link>
    //     </Box>
    // )
}
