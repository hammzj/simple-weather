import React from "react";
import { Box, Tooltip } from "@mui/material";
import { weatherCodeToText, weatherCodeToClassName } from "./utils";

export default function WeatherIcon({ weatherCode }) {
    //Why didn't Font Awesome rename this tag??? It conflicts with italics `i` tag!
    return (
        <Tooltip title={weatherCodeToText(weatherCode)}>
            <Box id='weather-icon-div' display='flex' justifyContent='center'>
                <i className={weatherCodeToClassName(weatherCode)} />
            </Box>
        </Tooltip>
    );
}
