import React from 'react';
import {AcUnit, Cloud, FilterDrama, Thunderstorm, Shower, WbSunny, Waves} from '@mui/icons-material';
import {NOT_AVAILABLE_TEXT} from "./constants";
import {WeatherCode} from "../services/open_meteo_api/forecast_api";
import {capitalize, includes, isEqual, isNil} from "lodash";

//TODO: still determining if we should use these icons...
// import ClearDayIcon from "./icons/weather_icons/clear-day.icon";
// import CloudyIcon from "./icons/weather_icons/cloudy.icon";
// import OvercastDayIcon from "./icons/weather_icons/overcast-day.icon";
// import FogDayIcon from "./icons/weather_icons/fog-day.icon";

export const weatherCodeToSvg = (weatherCode: number | WeatherCode): JSX.Element => {
//TODO: find a way to utilize day/night
    weatherCode = Number(weatherCode);
    switch (true) {
        case(isEqual(WeatherCode.CLEAR_SKY, weatherCode)):
            //return <ClearDayIcon/>;
            return <WbSunny/>
        case(includes([WeatherCode.MAINLY_CLEAR, WeatherCode.PARTLY_CLOUDY], weatherCode)):
            //return <CloudyIcon/>;
            return <FilterDrama/>
        case(isEqual(WeatherCode.OVERCAST, weatherCode)):
            //return <OvercastDayIcon/>;
            return <Cloud/>
        case(includes([WeatherCode.FOG, WeatherCode.DEPOSITING_RIME_FOG], weatherCode)):
            //return <FogDayIcon/>;
            return <Waves/>
        case(includes([
            WeatherCode.THUNDERSTORM,
            WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL,
            WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL,
        ], weatherCode)):
            return <Thunderstorm/>
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
            return <Shower/>
        case(includes([
            WeatherCode.SNOW_GRAINS,
            WeatherCode.SLIGHT_SNOWFALL,
            WeatherCode.MODERATE_SNOWFALL,
            WeatherCode.HEAVY_SNOWFALL,
            WeatherCode.LIGHT_SNOW_SHOWERS,
            WeatherCode.HEAVY_SNOW_SHOWERS,
        ], weatherCode)):
            return <AcUnit/>
        default:
            //Default return nothing
            return <></>
    }
}

export const weatherCodeToText = (weatherCode: number | null | undefined): string => {
    if (isNil(weatherCode)) {
        return NOT_AVAILABLE_TEXT;
    } else {
        return capitalize(WeatherCode[weatherCode]).replace(/_/g, ' ');
    }
}
