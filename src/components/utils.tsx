import React from 'react';
import {WeatherCode} from "../services/open_mateo_api/forecast_api/types";
import {includes, isEqual} from "lodash";
import ClearDayIcon from "./icons/weather_icons/clear-day.icon";
import CloudyIcon from "./icons/weather_icons/cloudy.icon";
import OvercastDayIcon from "./icons/weather_icons/overcast-day.icon";
import FogDayIcon from "./icons/weather_icons/fog-day.icon";

export const weatherCodeToSvg = (weatherCode: number | WeatherCode) => {
//TODO: find a way to utilize day/night
    weatherCode = Number(weatherCode);
    switch (true) {
        case(isEqual(WeatherCode.CLEAR_SKY, weatherCode)):
            return <ClearDayIcon/>;
        case(includes([WeatherCode.MAINLY_CLEAR, WeatherCode.PARTLY_CLOUDY], weatherCode)):
            return <CloudyIcon/>;
        case(isEqual(WeatherCode.OVERCAST, weatherCode)):
            return <OvercastDayIcon/>;
        case(includes([WeatherCode.FOG, WeatherCode.DEPOSITING_RIME_FOG], weatherCode)):
            return <FogDayIcon/>;
        default:
            //Default return nothing
            return <></>
    }
}
