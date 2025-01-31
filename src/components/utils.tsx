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
import { capitalize, isEqual, isNil } from "lodash";
import { OpenMeteoGeocodingAPI } from "../services/open_meteo_api";
import { DateTime } from "luxon";
import SimpleWeatherAPI, { TotalWeatherData } from "../services/api";
import { LocationData } from "../services/open_meteo_api/geocoding_api";

export const weatherCodeToText = (weatherCode?: number): string => {
    if (isNil(weatherCode) || isNil(WeatherCode[weatherCode])) {
        return NOT_AVAILABLE_TEXT;
    } else {
        return capitalize(WeatherCode[weatherCode]).replace(/_/g, " ");
    }
};

//is mobile viewport
// todo: -- will use react-device-detect instead
export const isMobile = (): boolean => window.innerWidth <= 768;

export const isDarkModeSettingsEnabled = (): boolean => {
    return isEqual(localStorage.getItem(SETTINGS_KEY_NAMES.COLOR_MODE), "dark");
};

export const shadows = (len1, len2, len3, blur): string => {
    //This should be improved but the color theme is simple enough
    const color = isDarkModeSettingsEnabled() ? "white" : "black";
    return `${len1} ${len2} ${len3} ${blur} ${color};`;
};

export const createWeatherPageSearchParams = (id): URLSearchParams => {
    return new URLSearchParams({ id });
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
        // const systemTimezone = DateTime.local().zoneName || "auto";
         const systemTimezone = "auto";
        return await SimpleWeatherAPI.getWeather([latitude, longitude], systemTimezone, opts);
    };

    const allData = { id: locationId, geocodingData: await requestGeocodingData(locationId) };
    const { latitude, longitude } = allData.geocodingData;
    Object.assign(allData, { weatherData: await requestWeatherData([latitude, longitude]) });
    return allData;
};
