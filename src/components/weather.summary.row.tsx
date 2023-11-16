import React from 'react';
import {DateTime, Zone} from 'luxon';
import {isEqual} from "lodash";
import {convertWeatherCode} from "./utils";

type  WeatherSummaryRowTimeType = 'hourly' | 'daily';


const getTimeString = (type: WeatherSummaryRowTimeType, dateTime: string, timezone?: string | undefined): string => {
    const localeString = isEqual(type, 'daily') ?
        DateTime.DATE_MED :
        DateTime.TIME_SIMPLE; //Consider 24-hour format
    let dt = DateTime.fromISO(dateTime);
    if (timezone) dt = dt.setZone(timezone);
    return dt.toLocaleString(localeString);
}

export default function WeatherSummaryRow({
                                              type,
                                              time,
                                              timezone,
                                              temperature_2m,
                                              temperature_2m_min,
                                              temperature_2m_max,
                                              precipitation_probability_max,
                                              precipitation_probability,
                                              weather_code,
                                          }) {
    const hasMinMaxTemp = temperature_2m_min && temperature_2m_max;
    const precipitationProbability = precipitation_probability_max ?? precipitation_probability;
    return (
        <>
            <div id="time">
                {getTimeString(type, time, timezone)}
            </div>
            <div>
            </div>
            <div>
                {hasMinMaxTemp && (
                    <div id='min-max-temperature'>{`${temperature_2m_min} / ${temperature_2m_max}`}</div>
                )}
                {!hasMinMaxTemp && (
                    <div id='temperature'>{temperature_2m || "N/A"}</div>
                )}
                {weather_code && (
                    <div id='weather'>{convertWeatherCode(weather_code)}</div>
                )}
                {precipitationProbability && (
                    <div id='precipitation-probability'>{precipitationProbability}</div>
                )}
            </div>
        </>
    )
}
