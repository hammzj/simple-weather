import React from 'react';
import {AcUnit, Cloud, FilterDrama, Thunderstorm, Shower, WbSunny, Waves} from '@mui/icons-material';
import {NOT_AVAILABLE_TEXT, SETTINGS_KEY_NAMES} from "../constants";
import {WeatherCode} from "../services/open_meteo_api/forecast_api";
import {capitalize, includes, isEqual, isNil} from "lodash";

export const weatherCodeToSvg = (weatherCode: number | WeatherCode): JSX.Element => {
    weatherCode = Number(weatherCode);
    switch (true) {
        case(isEqual(WeatherCode.CLEAR_SKY, weatherCode)):
            return <WbSunny/>
        case(includes([WeatherCode.MAINLY_CLEAR, WeatherCode.PARTLY_CLOUDY], weatherCode)):
            return <FilterDrama/>
        case(isEqual(WeatherCode.OVERCAST, weatherCode)):
            return <Cloud/>
        case(includes([WeatherCode.FOG, WeatherCode.DEPOSITING_RIME_FOG], weatherCode)):
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

//is mobile viewport
// todo: -- will use react-device-detect instead
export const isMobile = () => window.innerWidth <= 768;

export const isDarkModeSettingsEnabled = () => {
    return isEqual(localStorage.getItem(SETTINGS_KEY_NAMES.DARK_MODE), 'true');
}

export const shadows = (len1, len2, len3, blur) => {
    const color = isDarkModeSettingsEnabled() ? 'white' : 'black';
    return `${len1} ${len2} ${len3} ${blur} ${color};`;
}
