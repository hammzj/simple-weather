//import { posix } from "path";
import {fetchWeatherApi} from "openmeteo";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import * as T from './types'

export default class OpenMeteoWeatherForecastAPI {
    private static get BASE_URL() {
        return "https://api.open-meteo.com/v1/";
    }

    static async fetchAllWeatherForLocation(opts: {
        latitude: T.Latitude;
        longitude: T.Longitude;
        forecast_days: 10;
        timezone: "auto";
        temperature_unit: T.TemperatureUnit;
        wind_speed_unit: T.WindSpeedUnit;
        precipitation_unit: T.PrecipitationUnit;
    }): Promise<WeatherApiResponse[]> {
        const current = {
            minutely_15: [
                T.CurrentWeatherParameters.temperature_2m,
                T.CurrentWeatherParameters.relative_humidity_2m,
                T.CurrentWeatherParameters.precipitation,
                T.CurrentWeatherParameters.wind_direction_10m,
                T.CurrentWeatherParameters.wind_speed_10m,
                T.CurrentWeatherParameters.visibility,
                T.CurrentWeatherParameters.weather_code,
                T.CurrentWeatherParameters.is_day,
            ],
        };

        const hourly = {
            hourly: [
                T.HourlyWeatherParameters.temperature_2m,
                T.HourlyWeatherParameters.relative_humidity_2m,
                T.HourlyWeatherParameters.cloud_cover,
                T.HourlyWeatherParameters.wind_speed_10m,
                T.HourlyWeatherParameters.wind_direction_10m,
                T.HourlyWeatherParameters.wind_gusts_10m,
                T.HourlyWeatherParameters.precipitation,
                T.HourlyWeatherParameters.precipitation_probability,
                T.HourlyWeatherParameters.visibility,
                T.HourlyWeatherParameters.weather_code,
                T.HourlyWeatherParameters.is_day,
            ],
        };

        const daily = {
            daily: [
                T.DailyWeatherTypes.temperature_2m_min,
                T.DailyWeatherTypes.temperature_2m_max,
                T.DailyWeatherTypes.precipitation_sum,
                T.DailyWeatherTypes.precipitation_probability_max,
                T.DailyWeatherTypes.weather_code,
                T.DailyWeatherTypes.sunrise,
                T.DailyWeatherTypes.sunset,
                T.DailyWeatherTypes.wind_speed_10m_max,
                T.DailyWeatherTypes.wind_gusts_10m_max,
                T.DailyWeatherTypes.wind_direction_10m_dominant,
            ],
        };

        const response = await fetchWeatherApi(OpenMeteoWeatherForecastAPI.BASE_URL + "/forecast", {
            ...opts,
            current,
            hourly,
            daily
        });
        //TODO: figure out error handling
        if (response) {
        }
        return response;

    }
}

