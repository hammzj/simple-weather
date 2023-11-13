//import { posix } from "path";
import { fetchWeatherApi } from "openmeteo";
import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import * as Types from "./types";
import { CurrentWeatherParameters } from "./current.weather.types";
import { HourlyWeatherParameters } from "./hourly.weather.types";
import { DailyWeatherTypes } from "./daily.weather.types";

const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/";

class OpenMeteoWeatherForecastAPI {
    static async fetchAllWeatherForLocation(opts: {
        latitude: Types.Latitude;
        longitude: Types.Longitude;
        forecast_days: 10;
        timezone: "auto";
        temperature_unit: Types.TemperatureUnit;
        wind_speed_unit: Types.WindSpeedUnit;
        precipitation_unit: Types.PrecipitationUnit;
    }): Promise<WeatherApiResponse[]> {
        const current = {
            minutely_15: [
                CurrentWeatherParameters.temperature_2m,
                CurrentWeatherParameters.relative_humidity_2m,
                CurrentWeatherParameters.precipitation,
                CurrentWeatherParameters.wind_direction_10m,
                CurrentWeatherParameters.wind_speed_10m,
                CurrentWeatherParameters.visibility,
                CurrentWeatherParameters.weather_code,
            ],
        };

        const hourly = {
            hourly: [
                HourlyWeatherParameters.temperature_2m,
                HourlyWeatherParameters.relative_humidity_2m,
                HourlyWeatherParameters.cloud_cover,
                HourlyWeatherParameters.wind_speed_10m,
                HourlyWeatherParameters.wind_direction_10m,
                HourlyWeatherParameters.wind_gusts_10m,
                HourlyWeatherParameters.precipitation,
                HourlyWeatherParameters.precipitation_probability,
                HourlyWeatherParameters.visibility,
                HourlyWeatherParameters.weather_code,
                HourlyWeatherParameters.is_day,
            ],
        };

        const daily = {
            daily: [
                DailyWeatherTypes.temperature_2m_min,
                DailyWeatherTypes.temperature_2m_max,
                DailyWeatherTypes.precipitation_sum,
                DailyWeatherTypes.weather_code,
                DailyWeatherTypes.sunrise,
                DailyWeatherTypes.sunset,
                DailyWeatherTypes.wind_speed_10m_max,
                DailyWeatherTypes.wind_gusts_10m_max,
                DailyWeatherTypes.wind_direction_10m_dominant,
            ],
        };

        return await fetchWeatherApi(OPEN_METEO_API_URL + "/forecast", {
            ...opts,
            current,
            hourly,
            daily,
        });
    }
}

export default OpenMeteoWeatherForecastAPI;
