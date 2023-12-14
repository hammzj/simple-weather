import React from 'react';
import {capitalize, includes, isEqual, isNil} from "lodash";
import {WeatherCode} from "../services/open_mateo_api/forecast_api/types";
import CloudIcon from '@mui/icons-material/Cloud';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ShowerIcon from '@mui/icons-material/Shower';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WavesIcon from '@mui/icons-material/Waves';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {NOT_AVAILABLE_TEXT} from "./constants";

// import ClearDayIcon from "./icons/weather_icons/clear-day.icon";
// import CloudyIcon from "./icons/weather_icons/cloudy.icon";
// import OvercastDayIcon from "./icons/weather_icons/overcast-day.icon";
// import FogDayIcon from "./icons/weather_icons/fog-day.icon";

export const weatherCodeToSvg = (weatherCode: number | WeatherCode) => {
//TODO: find a way to utilize day/night
    weatherCode = Number(weatherCode);
    switch (true) {
        case(isEqual(WeatherCode.CLEAR_SKY, weatherCode)):
            //return <ClearDayIcon/>;
            return <WbSunnyIcon/>
        case(includes([WeatherCode.MAINLY_CLEAR, WeatherCode.PARTLY_CLOUDY], weatherCode)):
            //return <CloudyIcon/>;
            return <FilterDramaIcon/>
        case(isEqual(WeatherCode.OVERCAST, weatherCode)):
            //return <OvercastDayIcon/>;
            return <CloudIcon/>
        case(includes([WeatherCode.FOG, WeatherCode.DEPOSITING_RIME_FOG], weatherCode)):
            //return <FogDayIcon/>;
            return <WavesIcon/>
        case(includes([
            WeatherCode.THUNDERSTORM,
            WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL,
            WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL,
        ], weatherCode)):
            return <ThunderstormIcon/>
        case(includes([
            WeatherCode.SLIGHT_RAIN,
            WeatherCode.HEAVY_RAIN,
            WeatherCode.MODERATE_RAIN,
            WeatherCode.SLIGHT_RAIN_SHOWERS,
            WeatherCode.MODERATE_RAIN_SHOWERS,
            WeatherCode.VIOLENT_RAIN_SHOWERS,
            WeatherCode.LIGHT_FREEZING_RAIN,
            WeatherCode.HEAVY_FREEZING_RAIN,
            WeatherCode.LIGHT_DRIZZLE,
            WeatherCode.MODERATE_DRIZZLE,
            WeatherCode.DENSE_DRIZZLE,
            WeatherCode.LIGHT_FREEZING_DRIZZLE,
            WeatherCode.DENSE_FREEZING_DRIZZLE,
        ], weatherCode)):
            return <ShowerIcon/>
        case(includes([
            WeatherCode.SNOW_GRAINS,
            WeatherCode.SLIGHT_SNOWFALL,
            WeatherCode.MODERATE_SNOWFALL,
            WeatherCode.HEAVY_SNOWFALL,
            WeatherCode.LIGHT_SNOW_SHOWERS,
            WeatherCode.HEAVY_SNOW_SHOWERS,
        ], weatherCode)):
            return <AcUnitIcon/>
        default:
            //Default return nothing
            return <></>
    }
}

export const weatherCodeToText = (weatherCode: number | null | undefined) => {
    if (isNil(weatherCode)) {
        return NOT_AVAILABLE_TEXT;
    } else {
        return capitalize(WeatherCode[weatherCode]).replace(/_/g, ' ');
    }
}
