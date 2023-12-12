import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {weatherCodeToSvg, weatherCodeToText} from "./utils";

export default function WeatherIcon({weatherCode}) {
    return (
        <Tooltip title={weatherCodeToText(weatherCode)}>
            <div id='weather-icon-div'>
                {weatherCodeToSvg(weatherCode)}
            </div>
        </Tooltip>
    )
}
