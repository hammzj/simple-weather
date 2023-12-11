import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {weatherCodeToSvg, weatherCodeToText} from "./utils";

export default function WeatherIcon({weatherCode}) {
    return (
        <Tooltip id='weather-icon' title={weatherCodeToText(weatherCode)}>{weatherCodeToSvg(weatherCode)}</Tooltip>
    )
}
