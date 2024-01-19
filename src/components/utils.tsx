import React from "react";
import {
    AcUnit,
    Cloud,
    FilterDrama,
    Shower,
    Thunderstorm,
    Waves,
    WbSunny,
} from "@mui/icons-material";
import {
    LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION,
    NOT_AVAILABLE_TEXT,
    SETTINGS_KEY_NAMES,
} from "../constants";
import {
    PrecipitationUnit,
    TemperatureUnit,
    WeatherCode,
    WindSpeedUnit,
} from "../services/open_meteo_api/forecast_api";
import { capitalize, includes, isEqual, isNil } from "lodash";
import { OpenMeteoGeocodingAPI } from "../services/open_meteo_api";
import { DateTime } from "luxon";
import SimpleWeatherAPI, { TotalWeatherData } from "../services/api";
import { LocationData } from "../services/open_meteo_api/geocoding_api";

export const weatherCodeToSvg = (weatherCode: number | WeatherCode): JSX.Element => {
    weatherCode = Number(weatherCode);
    switch (true) {
        case isEqual(WeatherCode.CLEAR_SKY, weatherCode):
            return <WbSunny />;
        case includes([WeatherCode.MAINLY_CLEAR, WeatherCode.PARTLY_CLOUDY], weatherCode):
            return <FilterDrama />;
        case isEqual(WeatherCode.OVERCAST, weatherCode):
            return <Cloud />;
        case includes([WeatherCode.FOG, WeatherCode.DEPOSITING_RIME_FOG], weatherCode):
            return <Waves />;
        case includes(
            [
                WeatherCode.THUNDERSTORM,
                WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL,
                WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL,
            ],
            weatherCode
        ):
            return <Thunderstorm />;
        case includes(
            [
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
            ],
            weatherCode
        ):
            return <Shower />;
        case includes(
            [
                WeatherCode.SNOW_GRAINS,
                WeatherCode.SLIGHT_SNOWFALL,
                WeatherCode.MODERATE_SNOWFALL,
                WeatherCode.HEAVY_SNOWFALL,
                WeatherCode.LIGHT_SNOW_SHOWERS,
                WeatherCode.HEAVY_SNOW_SHOWERS,
            ],
            weatherCode
        ):
            return <AcUnit />;
        default:
            //Default return nothing
            return <></>;
    }
};

export const weatherCodeToText = (weatherCode: number | null | undefined): string => {
    if (isNil(weatherCode)) {
        return NOT_AVAILABLE_TEXT;
    } else {
        return capitalize(WeatherCode[weatherCode]).replace(/_/g, " ");
    }
};

//is mobile viewport
// todo: -- will use react-device-detect instead
export const isMobile = () => window.innerWidth <= 768;

export const isDarkModeSettingsEnabled = () => {
    return isEqual(localStorage.getItem(SETTINGS_KEY_NAMES.COLOR_MODE), "dark");
};

export const shadows = (len1, len2, len3, blur) => {
    const color = isDarkModeSettingsEnabled() ? "white" : "black";
    return `${len1} ${len2} ${len3} ${blur} ${color};`;
};

export const createWeatherPageSearchParams = (id) => {
    return new URLSearchParams({ id }).toString();
};

export const getSavedLocationId = (): string | null =>
    localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION);

export const getGeocodingAndWeatherData = async (
    locationId: string | number
): Promise<{
    id: string | number;
    geocodingData?: LocationData;
    weatherData?: TotalWeatherData;
}> => {
    const requestGeocodingData = async (id): Promise<LocationData> => {
        const { data } = await OpenMeteoGeocodingAPI.getLocation(id);
        return data;
    };
    const requestWeatherData = async ([latitude, longitude]): Promise<TotalWeatherData> => {
        const opts = {
            temperature_unit:
                TemperatureUnit[localStorage.getItem("temperatureUnit") ?? "fahrenheit"],
            wind_speed_unit: WindSpeedUnit[localStorage.getItem("windSpeedUnit") ?? "mph"],
            precipitation_unit:
                PrecipitationUnit[localStorage.getItem("precipitationUnit") ?? "inch"],
        };
        const systemTimezone = DateTime.local().zoneName || "auto";
        return await SimpleWeatherAPI.getWeather([latitude, longitude], systemTimezone, opts);
    };

    const allData = { id: locationId, geocodingData: await requestGeocodingData(locationId) };
    const { latitude, longitude } = allData.geocodingData;
    Object.assign(allData, { weatherData: await requestWeatherData([latitude, longitude]) });
    return allData;
};
