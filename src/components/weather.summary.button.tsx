import React from 'react';
import {Card, Grid, Typography, SvgIcon} from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
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

//TODO: would an accordion work where the detail container is in the dropdown?
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
        <Card>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                id={`${type}-weather-summary-row`}
            >
                <Grid item xs={6}>
                    <Typography id="time">
                        {getTimeString(type, time, timezone)}
                    </Typography>
                </Grid>
                {hasMinMaxTemp && (
                    <Grid item>
                        <Typography
                            id='min-max-temperature'>{`${temperature_2m_min} / ${temperature_2m_max}`}</Typography>
                    </Grid>
                )}
                {!hasMinMaxTemp && (
                    <Grid item>
                        <Typography id='temperature'>{temperature_2m || "N/A"}</Typography>
                    </Grid>
                )}
                {weather_code && (
                    <Grid item>
                        <span id='weather-icon'>{weatherCodeToSvg(weather_code)}</span>
                    </Grid>
                )}
                {precipitationProbability && (
                    <Grid item>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <WaterDropIcon/>
                            <Typography id='precipitation-probability'>{precipitationProbability}</Typography>
                        </div>
                    </Grid>
                )}
            </Grid>
        </Card>
    )
}
