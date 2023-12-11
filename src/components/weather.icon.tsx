import React from "react";
import {weatherCodeToSvg} from "./utils";

export default function WeatherIcon({weatherCode}) {
    return (
        <span id='weather-icon'>{weatherCodeToSvg(weatherCode)}</span>
    )
}
