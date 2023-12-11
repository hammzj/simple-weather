import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import {VariablesWithTime} from "@openmeteo/sdk/variables-with-time"
import {OpenMeteoWeatherForecastAPI} from '../open_mateo_api'

import {
    Coordinates,
    Timezone,
    TemperatureUnit,
    WindSpeedUnit,
    PrecipitationUnit,
} from "../open_mateo_api/forecast_api/types";
import * as T from "./types";
import {DateTime} from "luxon";
import {gte, includes, isEqual, isNil} from "lodash";


const createEnumerableFromKeys = (block: VariablesWithTime) => {
    const isContainingOnlyOneTime = isEqual([block.time].flat().length, 1);
    return [block.time]  // Handle when the time is just a string
        .flat()
        .map((timeString, i) => {
            const e: { [index: string]: any } = {}
            for (const k of Object.keys(block)) {
                e[k] = isContainingOnlyOneTime ? block[k] : block[k][i];
            }
            return e;
        });
}

/** @see [StackOverflow answer for getting these directions]{@link https://stackoverflow.com/a/48750814/6404865} */
const getWindDegreesAsDirection = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const dividend = Math.round(360 / directions.length);
    const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / dividend) % directions.length;
    return directions[index];
}


export default class SimpleWeatherAPI {
    //Maximum 25 hours worth of data from current hour
    static get MAX_HOURLY_SETS() {
        return 25;
    }

    //Maximum 10 days worth of data from current date
    static get MAX_DAILY_SETS() {
        return 10;
    }

    private static _createMappedWeatherData(fetchWeatherResponse: WeatherApiResponse[]): T.MappedWeatherData {
        const createCurrentWeatherData = (values, units): T.CurrentWeatherData => {
            const {
                time,
                temperature_2m,
                precipitation,
                weather_code,
                is_day
            } = values;

            const mapped = {
                time,
                weather_code,
                is_day,
            };
            if (temperature_2m) {
                mapped.temperature = `${temperature_2m.toFixed(0)} ${units.temperature_2m}`;
            }
            if (precipitation) {
                mapped.precipitation = `${precipitation.toFixed(3)} ${units.precipitation}`;
            }
            return {
                units,
                values,
                mapped
            }
        }
        const createHourlyWeatherData = (block: VariablesWithTime, units: object, currentWeatherTime = undefined, maxHourlySets = SimpleWeatherAPI.MAX_HOURLY_SETS): T.HourlyWeatherData => {
            let valueSet = createEnumerableFromKeys(block)
                .map(values => {
                    const {
                        time,
                        temperature_2m,
                        relative_humidity_2m,
                        cloud_cover,
                        wind_speed_10m,
                        wind_direction_10m,
                        wind_gusts_10m,
                        precipitation,
                        precipitation_probability,
                        visibility,
                        weather_code,
                        is_day,
                    } = values;

                    const mapped = {
                        time,
                        weather_code,
                        is_day,
                    };
                    if (temperature_2m) {
                        mapped.temperature = `${temperature_2m.toFixed(0)} ${units.temperature_2m}`;
                    }
                    if (precipitation) {
                        mapped.precipitation = `${precipitation.toFixed(3)} ${units.precipitation}`;
                    }
                    if (precipitation_probability) {
                        mapped.precipitation_probability = `${precipitation_probability.toFixed(0)} ${units.precipitation_probability}`;
                    }
                    if (visibility) {
                        mapped.visibility = `${visibility} ${units.visibility}`;
                    }
                    if (relative_humidity_2m) {
                        mapped.humidity = `${relative_humidity_2m.toFixed(0)} ${units.relative_humidity_2m}`;
                    }
                    if (cloud_cover) {
                        mapped.cloud_cover = `${cloud_cover} ${units.cloud_cover}`
                    }
                    if (wind_speed_10m && wind_direction_10m) {
                        mapped.wind = `${Math.round(wind_speed_10m)} ${units.wind_speed_10m} ${getWindDegreesAsDirection(wind_direction_10m)}`
                    }
                    if (wind_gusts_10m) {
                        mapped.wind_gusts = `${Math.round(wind_gusts_10m)} ${units.wind_gusts_10m}`
                    }

                    return {
                        units,
                        values,
                        mapped
                    }
                })
            //TODO: only grab those greater than the current hour
            const isGteCurrentWeatherTime = (v) => {
                return gte(DateTime.fromISO(v.values.time).toMillis(), DateTime.fromISO(currentWeatherTime).startOf('hour').toMillis());
            }
            if (!isNil(currentWeatherTime)) {
                valueSet = valueSet.filter(isGteCurrentWeatherTime);
            }
            return valueSet.slice(0, maxHourlySets);
        }
        const createDailyWeatherData = (block: VariablesWithTime, units: object, maxDailySets = SimpleWeatherAPI.MAX_DAILY_SETS): T.DailyWeatherData => {
            const valueSet = createEnumerableFromKeys(block);
            return valueSet.map(values => {
                const {
                    time,
                    temperature_2m_min,
                    temperature_2m_max,
                    precipitation_sum,
                    precipitation_probability_max,
                    weather_code,
                    sunrise,
                    sunset,
                    wind_speed_10m_max,
                    wind_direction_10m_dominant,
                    wind_gusts_10m_max,
                } = values;

                const mapped = {
                    time,
                    weather_code,
                };
                if (temperature_2m_min && temperature_2m_max) {
                    const min = `${Math.round(temperature_2m_min)} ${units.temperature_2m_min}`;
                    const max = `${Math.round(temperature_2m_max)} ${units.temperature_2m_max}`;
                    mapped.temperature = `${min} / ${max}`;
                }
                if (precipitation_sum) {
                    mapped.precipitation = `${precipitation_sum.toFixed(3)} ${units.precipitation_sum}`;
                }
                if (precipitation_probability_max) {
                    mapped.precipitation_probability = `${precipitation_probability_max.toFixed(0)} ${units.precipitation_probability_max}`;
                }
                if (sunrise) {
                    mapped.sunrise = DateTime.fromISO(sunrise);
                }
                if (sunset) {
                    mapped.sunset = DateTime.fromISO(sunset);
                }
                if (wind_speed_10m_max && wind_direction_10m_dominant) {
                    mapped.wind = `${Math.round(wind_speed_10m_max)} ${units.wind_speed_10m_max} ${getWindDegreesAsDirection(wind_direction_10m_dominant)}`
                }
                if (wind_gusts_10m_max) {
                    mapped.wind_gusts = `${Math.round(wind_gusts_10m_max)} ${units.wind_gusts_10m_max}`
                }

                return {
                    units,
                    values,
                    mapped
                }
            }).slice(0, maxDailySets)
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

        const mappedWeatherData = {
            latitude,
            longitude,
        };
        if (current && current_units) {
            mappedWeatherData.current_weather = createCurrentWeatherData(current, current_units);
        }
        if (hourly && hourly_units) {
            mappedWeatherData.hourly_weather = createHourlyWeatherData(hourly, hourly_units, current.time);
        }
        if (daily && daily_units) {
            mappedWeatherData.daily_weather = createDailyWeatherData(daily, daily_units);
        }

        return mappedWeatherData;
    }


//TODO: allow for units of measurement and temperature units (m vs inch; C vs F)
    static async getWeather(coordinates: Coordinates, opts: {
        timezone: Timezone,
        temperature_unit: TemperatureUnit,
        wind_speed_unit: WindSpeedUnit,
        precipitation_unit: PrecipitationUnit,
    } = {
        timezone: 'auto',
        temperature_unit: TemperatureUnit.fahrenheit,
        wind_speed_unit: WindSpeedUnit.mph,
        precipitation_unit: PrecipitationUnit.inch,
    }): Promise<T.MappedWeatherData> {
        const [latitude, longitude] = coordinates;

        //TODO: error handling
        const fetchWeatherResponse = await OpenMeteoWeatherForecastAPI.fetchAllWeatherForLocation({
            latitude,
            longitude,
            ...opts,
        });

        return SimpleWeatherAPI._createMappedWeatherData(fetchWeatherResponse.data);
    }
}



