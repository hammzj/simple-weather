import {Coordinates, Latitude, Longitude, WeatherCodes} from "./forecast_api/types";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import {isEqual, isNil, includes} from "lodash";

export const extractCoordinatesFromALocation =
    (location: any): Coordinates => {
        return [location.latitude, location.longitude];
    }

export const mapDataFromFetchWeatherResponse =
    (fetchWeatherResponse) => {
        const mapLocationDataToTime = (block, units) => {
            return [block.time]  // Handle when the time is just a string
                .flat()
                .map((timeString, i) => {
                    const e: { [index: string]: any } = {}
                    for (const k of Object.keys(block)) {
                        const v = block[k][i] ?? block[k];
                        switch (true) {
                            case(isNil(units[k])):
                                e[k] = `${v}`;
                                break;
                            case(includes(['time', 'sunrise', 'sunset', `is_day`], k)):
                                e[k] = `${v}`;
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
            current_units,
            current,
            hourly_units,
            hourly,
            daily_units,
            daily
        } = fetchWeatherResponse;
        const data = {
            ...fetchWeatherResponse.latitude,
            ...fetchWeatherResponse.longitude
        };
        if (current && current_units) {
            data.current_weather = mapLocationDataToTime(current, current_units);
        }
        if (hourly && hourly_units) {
            data.hourly_weather = mapLocationDataToTime(hourly, hourly_units);
        }
        if (daily && daily_units) {
            data.daily_weather = mapLocationDataToTime(daily, daily_units);
        }
        return data;
    }
