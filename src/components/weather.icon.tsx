import React from "react";
import { Box, Tooltip } from "@mui/material";
import { weatherCodeToText } from "./utils";
import { WeatherCode } from "../services/open_meteo_api/forecast_api";
import { includes, isEqual } from "lodash";

interface WeatherIconProps {
    weatherCode: number | WeatherCode;
    modifiers?: string[];
    isDay?: 0 | 1 | boolean;
}

//Exported for testing
/**
 *
 * @param weatherCode {number | WeatherCode}
 * @param modifiers {string[]} See the "Utility Classes" section on the weather icons page
 * @param isDay {boolean} if false, use the night variants. Most of the night variants I use have "night-alt" in them in place of "day", but some just have "night".
 * @see https://erikflowers.github.io/weather-icons/
 */
export const weatherCodeToClassName = (
    weatherCode: number | WeatherCode,
    modifiers: string[] = [],
    isDay: boolean = true
): string => {
    weatherCode = Number(weatherCode);
    const getBaseClass = (): string => {
        switch (true) {
            case includes([WeatherCode.MAINLY_CLEAR, WeatherCode.CLEAR_SKY], weatherCode):
                return isDay ? "wi-day-sunny" : "wi-night-clear";
            case includes([WeatherCode.PARTLY_CLOUDY], weatherCode):
                return isDay ? "wi-day-cloudy" : "wi-night-alt-partly-cloudy";
            case includes([WeatherCode.OVERCAST], weatherCode):
                //There's no overcast at night, so default to a different variant
                return isDay ? "wi-day-sunny-overcast" : "wi-night-alt-cloudy";
            case includes([WeatherCode.FOG, WeatherCode.DEPOSITING_RIME_FOG], weatherCode):
                //No "night-alt" variant
                return isDay ? "wi-day-fog" : "wi-night-fog";
            case includes(
                [
                    WeatherCode.THUNDERSTORM,
                    WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL,
                    WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL,
                ],
                weatherCode
            ):
                return isDay ? "wi-day-thunderstorm" : "wi-night-alt-thunderstorm";
            case includes(
                [
                    WeatherCode.SLIGHT_RAIN,
                    WeatherCode.HEAVY_RAIN,
                    WeatherCode.MODERATE_RAIN,
                    WeatherCode.LIGHT_FREEZING_RAIN,
                    WeatherCode.HEAVY_FREEZING_RAIN,
                ],
                weatherCode
            ):
                return isDay ? "wi-day-rain" : "wi-night-alt-rain";
            case includes(
                [
                    WeatherCode.SLIGHT_RAIN_SHOWERS,
                    WeatherCode.MODERATE_RAIN_SHOWERS,
                    WeatherCode.VIOLENT_RAIN_SHOWERS,
                ],
                weatherCode
            ):
                return isDay ? "wi-day-showers" : "wi-night-alt-showers";
            case includes(
                [
                    WeatherCode.LIGHT_DRIZZLE,
                    WeatherCode.MODERATE_DRIZZLE,
                    WeatherCode.DENSE_DRIZZLE,
                    WeatherCode.LIGHT_FREEZING_DRIZZLE,
                    WeatherCode.DENSE_FREEZING_DRIZZLE,
                ],
                weatherCode
            ):
                return isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle";
            case includes(
                [
                    WeatherCode.SNOW_GRAINS,
                    WeatherCode.SLIGHT_SNOWFALL,
                    WeatherCode.MODERATE_SNOWFALL,
                    WeatherCode.HEAVY_SNOWFALL,
                ],
                weatherCode
            ):
                return isDay ? "wi-day-snow" : "wi-night-alt-snow";
            case includes(
                [WeatherCode.LIGHT_SNOW_SHOWERS, WeatherCode.HEAVY_SNOW_SHOWERS],
                weatherCode
            ):
                return isDay ? "wi-day-sleet" : "wi-night-alt-sleet";
            default:
                //Default an icon for "Not available"
                return "wi-na";
        }
    };
    return ["wi", getBaseClass(), ...modifiers].join(" ").trim();
};

export default function WeatherIcon({
    weatherCode,
    modifiers,
    isDay,
}: WeatherIconProps): React.ReactElement {
    if (includes([0, 1], isDay)) {
        isDay = isEqual(isDay, 0);
    }

    //Why didn't Font Awesome rename this tag??? It conflicts with italics `i` tag!
    return (
        <Tooltip title={weatherCodeToText(weatherCode)}>
            <Box id='weather-icon-div' display='flex' justifyContent='center'>
                <i className={weatherCodeToClassName(weatherCode, modifiers, isDay)} />
            </Box>
        </Tooltip>
    );
}
