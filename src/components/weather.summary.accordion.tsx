import React from 'react';
import {isEqual} from "lodash";
import {DateTime, Zone} from 'luxon';
import {weatherCodeToSvg} from "./utils";
import {Accordion, AccordionSummary, AccordionDetails, Grid, Typography, SvgIcon} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {NOT_AVAILABLE_TEXT} from './constants';
import AdditionalWeatherDetails from "./additional.weather.details";
import PrecipitationItem from './precipitation.item';

type  WeatherSummaryButtonTimeType = 'hourly' | 'daily';

const getTimeString = (type: WeatherSummaryButtonTimeType, dateTime: string, timezone?: Zone | string): string => {
    const localeString = isEqual(type, 'daily') ?
        DateTime.DATE_MED :
        DateTime.TIME_SIMPLE; //Consider 24-hour format
    let dt = DateTime.fromISO(dateTime);
    if (timezone) dt = dt.setZone(timezone);
    return dt.toLocaleString(localeString);
}

export default function WeatherSummaryAccordion({
                                                    type,
                                                    mappedWeatherData = {}
                                                }) {
    const {
        time,
        timezone,
        temperature_2m,
        temperature_2m_min,
        temperature_2m_max,
        precipitation_probability_max,
        precipitation_probability,
        weather_code
    } = mappedWeatherData;

    const isHourly = isEqual(type, 'hourly');
    const timeString = getTimeString(type, time, timezone);
    const temperature = isHourly ?
        temperature_2m :
        `${temperature_2m_min} / ${temperature_2m_max}`;
    const precipitationProbability =
        (isHourly ?
            precipitation_probability :
            precipitation_probability_max) ?? NOT_AVAILABLE_TEXT;
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
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
                            {timeString}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            id='temperature'>{temperature}</Typography>
                    </Grid>
                    <Grid item>
                        <SvgIcon id='weather-icon'>{weatherCodeToSvg(weather_code)}</SvgIcon>
                    </Grid>
                    <Grid item>
                        <PrecipitationItem precipitation={precipitationProbability}/>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <AdditionalWeatherDetails
                    type={type}
                    mappedWeatherData={mappedWeatherData}
                />
            </AccordionDetails>
        </Accordion>
    )
}
