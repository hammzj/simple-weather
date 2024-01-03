import React from "react";
import {Box, Tooltip} from "@mui/material";
import {weatherCodeToSvg, weatherCodeToText} from "./utils";

export default function WeatherIcon({weatherCode}) {
    return (
        <Tooltip title={weatherCodeToText(weatherCode)}>
            <Box id='weather-icon-div'
                 display='flex'
                 justifyContent='center'>
                {weatherCodeToSvg(weatherCode)}
            </Box>
        </Tooltip>
    )
}
