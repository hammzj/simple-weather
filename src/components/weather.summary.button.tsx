import React from 'react';

import {DateTime, Zone} from 'luxon';
import {isEqual} from "lodash";
import {weatherCodeToSvg} from "./utils";

type  WeatherSummaryButtonTimeType = 'hourly' | 'daily';


const getTimeString = (type: WeatherSummaryButtonTimeType, dateTime: string, timezone?: Zone | string): string => {
    const localeString = isEqual(type, 'daily') ?
        DateTime.DATE_MED :
        DateTime.TIME_SIMPLE; //Consider 24-hour format
    let dt = DateTime.fromISO(dateTime);
    if (timezone) dt = dt.setZone(timezone);
    return dt.toLocaleString(localeString);
}

export default function WeatherSummaryButton({
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
        <div id={`${type}-weather-summary-row`}>
            <span id="time">
                {getTimeString(type, time, timezone)}
            </span>
            <span>
                {hasMinMaxTemp && (
                    <span id='min-max-temperature'>{`${temperature_2m_min} / ${temperature_2m_max}`}</span>
                )}
                {!hasMinMaxTemp && (
                    <span id='temperature'>{temperature_2m || "N/A"}</span>
                )}
                {weather_code && (
                    <span id='weather-icon'>{weatherCodeToSvg(weather_code)}</span>
                )}
                {precipitationProbability && (
                    <span id='precipitation-probability'>{precipitationProbability}</span>
                )}
            </span>
        </div>
    )
}
