import {WeatherCode} from '../open_mateo_api/forecast_api/types';
import {DateTime} from "luxon";

type IsDay = boolean | undefined;

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

export interface CurrentWeatherData extends GenericWeatherData {
    mapped: {
        time: ISOString;
        weather_code?: WeatherCode;
        is_day?: IsDay;
        temperature?: string;
        precipitation?: string;
    }
}

export interface HourlyWeatherData extends GenericWeatherData {
    mapped: {
        time: ISOString;
        weather_code?: WeatherCode;
        is_day?: IsDay;
        temperature?: string,
        precipitation?: string;
        precipitation_probability?: string;
        humidity?: string;
        cloud_cover?: string;
        visibility?: string;
        wind?: string;
        wind_gusts?: string;
    }
}

export interface DailyWeatherData extends GenericWeatherData {
    mapped: {
        time: ISOString;
        temperature_range?: string
        precipitation?: string;
        precipitation_probability?: string;
        weather_code?: WeatherCode;
        sunrise?: DateTime;
        sunset?: DateTime;
        wind?: string;
        wind_gusts?: string;
    }
}

export interface MappedWeatherData {
    latitude: number;
    longitude: number;
    current_weather?: CurrentWeatherData;
    hourly_weather?: HourlyWeatherData;
    daily_weather?: DailyWeatherData;
}
