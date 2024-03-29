import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { OpenMeteoWeatherForecastAPI } from "../open_meteo_api";
import {
    Coordinates,
    Timezone,
    WeatherCode,
    TemperatureUnit,
    WindSpeedUnit,
    PrecipitationUnit,
} from "../open_meteo_api/forecast_api";
import { DateTime } from "luxon";
import { gte, isEqual, isNil } from "lodash";

//1 if the current time step has daylight, 0 at night.
export enum IsDay {
    NIGHT = 0,
    DAY = 1,
}

type ISOString = string;

interface Units {
    [key: string]: string;
}

interface Values {
    [key: string]: string;
}

interface GenericWeatherData {
    units: Units;
    values: Values;
}

export type CurrentWeatherDataMappings = {
    time: ISOString;
    weather_code: WeatherCode;
    is_day: IsDay;
    temperature: string;
    temperature_range: string;
    precipitation: string;
};

export interface CurrentWeatherData extends GenericWeatherData {
    mapped: CurrentWeatherDataMappings;
}

export type HourlyWeatherDataMappings = {
    time: ISOString;
    weather_code: WeatherCode;
    is_day: IsDay;
    temperature: string;
    precipitation: string;
    precipitation_probability: string;
    humidity: string;
    cloud_cover: string;
    visibility: string;
    wind: string;
    wind_gusts: string;
};

export interface HourlyWeatherData extends GenericWeatherData {
    mapped: HourlyWeatherDataMappings;
}

export type DailyWeatherDataMappings = {
    time: ISOString;
    temperature_range: string;
    precipitation: string;
    precipitation_probability: string;
    weather_code: WeatherCode;
    sunrise: DateTime;
    sunset: DateTime;
    wind: string;
    wind_gusts: string;
};

export interface DailyWeatherData extends GenericWeatherData {
    mapped: DailyWeatherDataMappings;
}

export interface TotalWeatherData {
    latitude: number;
    longitude: number;
    current_weather: CurrentWeatherData;
    hourly_weather: HourlyWeatherData[];
    daily_weather: DailyWeatherData[];
}

export interface GetWeatherOpts {
    temperature_unit: TemperatureUnit;
    wind_speed_unit: WindSpeedUnit;
    precipitation_unit: PrecipitationUnit;
}

const exists = (v: any): boolean => !isNil(v);

const createEnumerableFromKeys = (block: VariablesWithTime) => {
    const isContainingOnlyOneTime = isEqual([block.time].flat().length, 1);
    return [block.time] // Handle when the time is just a string
        .flat()
        .map((timeString, i) => {
            const e: { [index: string]: any } = {};
            for (const k of Object.keys(block)) {
                e[k] = isContainingOnlyOneTime ? block[k] : block[k][i];
            }
            return e;
        });
};

/** @see [StackOverflow answer for getting these directions]{@link https://stackoverflow.com/a/48750814/6404865} */
const getWindDegreesAsDirection = (degrees: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const dividend = Math.round(360 / directions.length);
    const index =
        Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / dividend) % directions.length;
    return directions[index];
};

export default class SimpleWeatherAPI {
    //Maximum 25 hours worth of data from current hour
    static get MAX_HOURLY_SETS() {
        return 25;
    }

    //Maximum 10 days worth of data from current date
    static get MAX_DAILY_SETS() {
        return 10;
    }

    private static _createTotalWeatherData(fetchWeatherResponse: any): TotalWeatherData {
        //TODO: this all should be a transformer on the axios request for the Forecast API. Much more useful as a transformer

        //TODO: simplify all of these methods if possible -- DRY coding
        const createCurrentWeatherData = (
            currentWeatherValues,
            currentWeatherUnits,
            dailyWeatherBlock?: VariablesWithTime,
            dailyWeatherUnits?: any
        ): CurrentWeatherData => {
            const { time, temperature_2m, precipitation, weather_code, is_day } =
                currentWeatherValues;

            const mapped: any = {
                time,
                weather_code,
                is_day,
            };
            if (exists(temperature_2m)) {
                mapped.temperature = `${temperature_2m.toFixed(0)} ${
                    currentWeatherUnits.temperature_2m
                }`;
            }
            if (exists(precipitation)) {
                mapped.precipitation = `${+precipitation.toFixed(2)} ${
                    currentWeatherUnits.precipitation
                }`;
            }

            const currentWeather = {
                units: currentWeatherUnits,
                values: currentWeatherValues,
                mapped,
            };

            //Add temperature low/high to current
            if (dailyWeatherBlock && dailyWeatherUnits) {
                const currentDayValues = createEnumerableFromKeys(dailyWeatherBlock).find((v) => {
                    return isEqual(
                        DateTime.fromISO(v.time).startOf("day").toFormat("yyyy-MM-dd"),
                        DateTime.fromISO(currentWeatherValues.time)
                            .startOf("day")
                            .toFormat("yyyy-MM-dd")
                    );
                });
                if (currentDayValues) {
                    const { temperature_2m_min, temperature_2m_max } = currentDayValues;
                    if (exists(temperature_2m_min) && exists(temperature_2m_max)) {
                        const min = `${Math.round(temperature_2m_min)} ${
                            dailyWeatherUnits.temperature_2m_min
                        }`;
                        const max = `${Math.round(temperature_2m_max)} ${
                            dailyWeatherUnits.temperature_2m_max
                        }`;
                        currentWeather.values.temperature_2m_min =
                            currentDayValues.temperature_2m_min;
                        currentWeather.values.temperature_2m_max =
                            currentDayValues.temperature_2m_max;
                        currentWeather.units.temperature_2m_min =
                            dailyWeatherUnits.temperature_2m_min;
                        currentWeather.units.temperature_2m_max =
                            dailyWeatherUnits.temperature_2m_max;
                        currentWeather.mapped.temperature_range = `${min} / ${max}`;
                    }
                }
            }

            return currentWeather;
        };
        const createHourlyWeatherData = (
            block: VariablesWithTime,
            units: any,
            currentWeatherTime = undefined,
            maxHourlySets = SimpleWeatherAPI.MAX_HOURLY_SETS
        ): Array<HourlyWeatherData> => {
            let valueSet = createEnumerableFromKeys(block).map((values) => {
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

                const mapped: any = {
                    time,
                    weather_code,
                    is_day,
                };
                if (exists(temperature_2m)) {
                    mapped.temperature = `${temperature_2m.toFixed(0)} ${units.temperature_2m}`;
                }
                if (exists(precipitation)) {
                    //+ sign removes extra zeroes
                    //@see https://stackoverflow.com/a/12830454/6404865
                    mapped.precipitation = `${+precipitation.toFixed(2)} ${units.precipitation}`;
                }
                if (exists(precipitation_probability)) {
                    mapped.precipitation_probability = `${precipitation_probability.toFixed(0)} ${
                        units.precipitation_probability
                    }`;
                }
                if (exists(visibility)) {
                    mapped.visibility = `${visibility} ${units.visibility}`;
                }
                if (exists(relative_humidity_2m)) {
                    mapped.humidity = `${relative_humidity_2m.toFixed(0)} ${
                        units.relative_humidity_2m
                    }`;
                }
                if (exists(cloud_cover)) {
                    mapped.cloud_cover = `${cloud_cover} ${units.cloud_cover}`;
                }
                if (exists(wind_speed_10m) && exists(wind_direction_10m)) {
                    mapped.wind = `${Math.round(wind_speed_10m)} ${
                        units.wind_speed_10m
                    } ${getWindDegreesAsDirection(wind_direction_10m)}`;
                }
                if (exists(wind_gusts_10m)) {
                    mapped.wind_gusts = `${Math.round(wind_gusts_10m)} ${units.wind_gusts_10m}`;
                }

                return {
                    units,
                    values,
                    mapped,
                };
            });

            //Not using exists(currentWeatherTime) bc tsc produces TS2345
            if (currentWeatherTime != null) {
                //Only return hourly data that is equal to or greater than the current hour
                //No need to show historical hourly data, which is generally returned from the API endpoint
                const isGteCurrentWeatherTime = (v) => {
                    return gte(
                        DateTime.fromISO(v.values.time).toMillis(),
                        DateTime.fromISO(currentWeatherTime).startOf("hour").toMillis()
                    );
                };
                valueSet = valueSet.filter(isGteCurrentWeatherTime);
            }
            return valueSet.slice(0, maxHourlySets);
        };
        const createDailyWeatherData = (
            block: VariablesWithTime,
            units: any,
            maxDailySets = SimpleWeatherAPI.MAX_DAILY_SETS
        ): Array<DailyWeatherData> => {
            const valueSet = createEnumerableFromKeys(block);
            return valueSet
                .map((values) => {
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

                    const mapped: any = {
                        time,
                        weather_code,
                    };
                    if (exists(temperature_2m_min) && exists(temperature_2m_max)) {
                        const min = `${Math.round(temperature_2m_min)} ${units.temperature_2m_min}`;
                        const max = `${Math.round(temperature_2m_max)} ${units.temperature_2m_max}`;
                        mapped.temperature_range = `${min} / ${max}`;
                    }
                    if (exists(precipitation_sum)) {
                        mapped.precipitation = `${+precipitation_sum.toFixed(2)} ${
                            units.precipitation_sum
                        }`;
                    }
                    if (exists(precipitation_probability_max)) {
                        mapped.precipitation_probability = `${precipitation_probability_max.toFixed(
                            0
                        )} ${units.precipitation_probability_max}`;
                    }
                    if (exists(sunrise)) {
                        mapped.sunrise = DateTime.fromISO(sunrise);
                    }
                    if (exists(sunset)) {
                        mapped.sunset = DateTime.fromISO(sunset);
                    }
                    if (exists(wind_speed_10m_max) && exists(wind_direction_10m_dominant)) {
                        mapped.wind = `${Math.round(wind_speed_10m_max)} ${
                            units.wind_speed_10m_max
                        } ${getWindDegreesAsDirection(wind_direction_10m_dominant)}`;
                    }
                    if (exists(wind_gusts_10m_max)) {
                        mapped.wind_gusts = `${Math.round(wind_gusts_10m_max)} ${
                            units.wind_gusts_10m_max
                        }`;
                    }

                    return {
                        units,
                        values,
                        mapped,
                    };
                })
                .slice(0, maxDailySets);
        };

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
            daily_weather: createDailyWeatherData(daily, daily_units),
            hourly_weather: createHourlyWeatherData(hourly, hourly_units, current.time),
            current_weather: createCurrentWeatherData(current, current_units, daily, daily_units),
        };
    }

    //TODO: allow for units of measurement and temperature units (m vs inch; C vs F)
    //TODO: pass in timezone from system
    static async getWeather(
        coordinates: Coordinates,
        timezone: Timezone | "auto" = "auto",
        opts: GetWeatherOpts = {
            temperature_unit: TemperatureUnit.fahrenheit,
            wind_speed_unit: WindSpeedUnit.mph,
            precipitation_unit: PrecipitationUnit.inch,
        }
    ): Promise<TotalWeatherData> {
        const [latitude, longitude] = coordinates;
        const fetchWeatherResponse = await OpenMeteoWeatherForecastAPI.fetchAllWeatherForLocation({
            latitude: [latitude],
            longitude: [longitude],
            timezone,
            ...opts,
        });
        return SimpleWeatherAPI._createTotalWeatherData(fetchWeatherResponse);
    }
}
