import {Coordinates, Latitude, Longitude, WeatherCode} from "./forecast_api/types";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import {isEqual, isNil, includes} from "lodash";

export const extractCoordinatesFromALocation =
    (location: any): Coordinates => {
        return [location.latitude, location.longitude];
    }

export const mapDataFromFetchWeatherResponse =
    (fetchWeatherResponse) => {
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
            current_weather: (current && current_units) ? mapLocationDataToTime(current, current_units) : [],
            hourly_weather: (hourly && hourly_units) ? mapLocationDataToTime(hourly, hourly_units) : [],
            daily_weather: (daily && daily_units) ? mapLocationDataToTime(daily, daily_units) : [],
        };
    }
