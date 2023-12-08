import React from 'react';
import Grid from '@mui/material/Grid';
import {isEqual, isNil} from "lodash";
import {WeatherCode} from "../services/open_mateo_api/forecast_api/types";

//TODO: move to general types
type  AdditionalWeatherDetailsGridType = 'hourly' | 'daily';

const NOT_AVAILABLE_TEXT = "N/A";

const convertWeatherCodeToText = (weatherCode: number | null | undefined) => {
    if (!isNil(WeatherCode[weatherCode])) {
        return WeatherCode[weatherCode]
            .replace(/_/g, ' ')
            .toLowerCase();
    } else {
        return NOT_AVAILABLE_TEXT;
    }
}


function DetailedViewHourly({
                                temperature_2m,
                                precipitation_probability,
                                precipitation,
                                relative_humidity_2m,
                                weather_code,
                                cloud_cover,
                                wind_speed_10m,
                                wind_direction_10m,
                                wind_gusts_10m,
                            }) {
    const wind = (wind_speed_10m && wind_direction_10m) ?
        `${wind_speed_10m} ${wind_direction_10m}` :
        NOT_AVAILABLE_TEXT;

    return (
        <div id={`hourly-detailed-view`}>
            <table>
                <tbody>
                <tr>
                    <td>Temperature:</td>
                    <td>{temperature_2m || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Conditions:</td>
                    <td>{convertWeatherCodeToText(weather_code)}</td>
                </tr>
                <tr>
                    <td>Precipitation:</td>
                    <td>{precipitation || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Precipitation probability:</td>
                    <td>{precipitation_probability || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Humidity:</td>
                    <td>{relative_humidity_2m || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Cloud cover:</td>
                    <td>{cloud_cover || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Wind:</td>
                    <td>{wind}</td>
                </tr>
                <tr>
                    <td>Wind gusts:</td>
                    <td>{wind_gusts_10m || NOT_AVAILABLE_TEXT}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

function DetailedViewDaily({
                               weather_code,
                               temperature_2m_min,
                               temperature_2m_max,
                               sunrise,
                               sunset,
                               precipitation_sum,
                               precipitation_hours, //Idk how to use this
                               precipitation_probability_max,
                               wind_speed_10m_max,
                               wind_direction_10m_dominant,
                               wind_gusts_10m_max,
                           }) {
    //TODO: convert to time
    const convertToTime = (time) => {
        return time
    }
    const minMaxTemp = (temperature_2m_min && temperature_2m_max) ?
        `${temperature_2m_min} / ${temperature_2m_max}` :
        NOT_AVAILABLE_TEXT;
    //Maybe consider an icon explaining this is the dominant direction?
    const wind = (wind_speed_10m_max && wind_direction_10m_dominant) ?
        `${wind_speed_10m_max} at ${wind_direction_10m_dominant}` :
        NOT_AVAILABLE_TEXT;
    return (
        <div id={`daily-detailed-view`}>
            <table>
                <tbody>
                <tr>
                    <td>Temperature Low/High:</td>
                    <td>{minMaxTemp}</td>
                </tr>
                <tr>
                    <td>Conditions:</td>
                    <td>{convertWeatherCodeToText(weather_code)}</td>
                </tr>
                <tr>
                    <td>Sunrise:</td>
                    <td>{convertToTime(sunrise) || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Sunset:</td>
                    <td>{convertToTime(sunset) || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Precipitation probability:</td>
                    <td>{precipitation_probability_max || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Precipitation accumulation:</td>
                    <td>{precipitation_sum || NOT_AVAILABLE_TEXT}</td>
                </tr>
                <tr>
                    <td>Wind (with dominant direction):</td>
                    <td>{wind}</td>
                </tr>
                <tr>
                    <td>Wind gusts:</td>
                    <td>{wind_gusts_10m_max || NOT_AVAILABLE_TEXT}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


export default function AdditionalWeatherDetailsGrid({
                                                  type,
                                                  properties = {}
                                              }) {
    //handle state change when updated by newly selected row

    return (
        <section>
            {
                isEqual(type, 'hourly') ?
                    DetailedViewHourly(properties) :
                    DetailedViewDaily(properties)
            }
        </section>
    )
}
