import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import PATHS from "../routes/paths";
import { getLocationName } from "../services/open_meteo_api/utils";
import { LocationData } from "../services/open_meteo_api/geocoding_api";
import { createWeatherPageSearchParams, shadows } from "./utils";

interface LocationDataButtonParams {
    locationData: LocationData;
}

export default function LocationDataButton({
    locationData,
}: LocationDataButtonParams): React.ReactElement {
    return (
        <Box id='location-data-button'>
            <Link
                to={{
                    pathname: PATHS.WEATHER,
                    search: createWeatherPageSearchParams(locationData.id),
                }}>
                <Button
                    sx={{
                        color: "primary.contrastText",
                        border: 1,
                        borderRadius: 0,
                        boxShadow: shadows("2px", "2px", "1px", "1px"),
                        "&:hover": {
                            backgroundColor: "primary.light",
                        },
                    }}>
                    <span>{getLocationName(locationData)}</span>
                </Button>
            </Link>
        </Box>
    );
}
