import {Coordinates, Latitude, Longitude, WeatherCode} from "./forecast_api/types";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import {isEqual, isNil, includes, inRange} from "lodash";


export const extractCoordinatesFromALocation =
    (location: any): Coordinates => {
        return [location.latitude, location.longitude];
    }


export const mapDataFromFetchWeatherResponse =
    (fetchWeatherResponse) => {
        const formatNumber = (temperature: number): string => {
            return `${Number.isInteger(temperature) ?
                temperature :
                temperature.toFixed(1)}`;
        }

        /** @see [StackOverflow answer for getting these directions]{@link https://stackoverflow.com/a/48750814/6404865} */
        const getWindDegreesAsDirection = (degrees: number): string => {
            const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            const dividend = Math.round(360 / directions.length);
            const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / dividend) % directions.length;
            return directions[index];
        }


        const mapLocationDataToTime = (block, units) => {
            const isContainingOnlyOneTime = isEqual([block.time].flat().length, 1);
            return [block.time]  // Handle when the time is just a string
                .flat()
                .map((timeString, i) => {
                    const e: { [index: string]: any } = {}
                    for (const k of Object.keys(block)) {
                        const v = isContainingOnlyOneTime ? block[k] : block[k][i];
                        switch (true) {
                            case(isNil(units[k])):
                                //Case can be removed by trimming the default's string
                                e[k] = `${v}`;
                                break;
                            case(includes(['time', 'sunrise', 'sunset', 'is_day'], k)):
                                e[k] = `${v}`;
                                break;
                            case(includes['temperature_2m', 'temperature_2m_min', 'temperature_2m_max'], k):
                                e[k] = `${v.toFixed(0)} ${units[k]}`;
                                break;
                            case(includes(['wind_speed_10m', 'wind_speed_10m_max'], k)):
                                e[k] = `${formatNumber(v)} ${units[k]}`;
                                break;
                            case(includes(['wind_direction_10m_dominant', 'wind_direction_10m'], k)):
                                e[k] = `${getWindDegreesAsDirection(v)}`;
                                break;
                            case(isEqual(k, 'weather_code')):
                                e[k] = `${v}`;
                                break;
                            default:
                                e[k] = `${v} ${[units[k]]}`;
                                break;
                        }
                    }
                    return e;
                });
        }

        const {
            latitude,
            longitude,
            current,
            current_units,
            hourly,
            hourly_units,
            daily,
            daily_units,
        } = fetchWeatherResponse;

        return {
            latitude,
            longitude,
            current_weather: (current && current_units) ? mapLocationDataToTime(current, current_units)[0] : {},
            hourly_weather: (hourly && hourly_units) ? mapLocationDataToTime(hourly, hourly_units) : [],
            daily_weather: (daily && daily_units) ? mapLocationDataToTime(daily, daily_units) : [],
        };
    }

