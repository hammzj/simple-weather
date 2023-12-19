import {fetchWeatherApi} from "openmeteo";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import * as T from './types'
import axios, {AxiosResponse} from "axios";
import {lt, gt} from "lodash";


const OPEN_METEO_WEATHER_API_URL = "https://api.open-meteo.com/"
const api = axios.create({baseURL: OPEN_METEO_WEATHER_API_URL});
export default class OpenMeteoWeatherForecastAPI {
    static async fetchAllWeatherForLocation(opts: {
        latitude: [T.Latitude];
        longitude: [T.Longitude];
        temperature_unit: T.TemperatureUnit;
        wind_speed_unit: T.WindSpeedUnit;
        precipitation_unit: T.PrecipitationUnit;
        forecast_days?: number;
        timezone?: T.Timezone;
    }): Promise<AxiosResponse[]> {
        if (!opts.forecast_days) opts.forecast_days = 10;
        if (!opts.timezone) opts.timezone = 'auto';

        const current = [
            T.CurrentWeatherParameters.temperature_2m,
            T.CurrentWeatherParameters.precipitation,
            T.CurrentWeatherParameters.weather_code,
            T.CurrentWeatherParameters.is_day,
        ].join(',');
        const hourly = [
            T.HourlyWeatherParameters.temperature_2m,
            T.HourlyWeatherParameters.relative_humidity_2m,
            T.HourlyWeatherParameters.cloud_cover,
            T.HourlyWeatherParameters.precipitation,
            T.HourlyWeatherParameters.precipitation_probability,
            T.HourlyWeatherParameters.visibility,
            T.HourlyWeatherParameters.wind_speed_10m,
            T.HourlyWeatherParameters.wind_direction_10m,
            T.HourlyWeatherParameters.wind_gusts_10m,
            T.HourlyWeatherParameters.weather_code,
            T.HourlyWeatherParameters.is_day,
        ].join(',');
        const daily = [
            T.DailyWeatherTypes.temperature_2m_min,
            T.DailyWeatherTypes.temperature_2m_max,
            T.DailyWeatherTypes.precipitation_sum,
            T.DailyWeatherTypes.precipitation_probability_max,
            T.DailyWeatherTypes.weather_code,
            T.DailyWeatherTypes.sunrise,
            T.DailyWeatherTypes.sunset,
            T.DailyWeatherTypes.wind_speed_10m_max,
            T.DailyWeatherTypes.wind_direction_10m_dominant,
            T.DailyWeatherTypes.wind_gusts_10m_max,
        ].join(',');

        const response = await api.get(`/v1/forecast`, {
            params: {
                current,
                hourly,
                daily,
                ...opts,
            }
        });
        console.debug('fetchAllWeatherForLocation response', {status: response.status, data: response.data});

        //Terrible error handling
        if (lt(response.status, 200) || gt(response.status, 299)) {
            console.error(response);
        }
        // @ts-ignore: TS2740
        return response.data;
    }
}
