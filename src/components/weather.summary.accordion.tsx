import React from 'react';
import {isEqual} from "lodash";
import {DateTime, Zone} from 'luxon';
import {weatherCodeToSvg} from "./utils";
import {Accordion, AccordionSummary, AccordionDetails, Grid, Typography, SvgIcon} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {NOT_AVAILABLE_TEXT} from './constants';
import AdditionalWeatherDetails from "./additional.weather.details";
import PrecipitationItem from './precipitation.item';
import WeatherIcon from "./weather.icon";

type  WeatherSummaryButtonTimeType = 'hourly' | 'daily';

const getTimeString = (type: WeatherSummaryButtonTimeType, dateTime: string, timezone?: Zone | string): string => {
    const isDaily = isEqual(type, 'daily');
    const localeString = isDaily ?
        DateTime.DATE_MED :
        DateTime.DATETIME_MED; //Consider 24-hour format
    let dt = DateTime.fromISO(dateTime);
    if (timezone) dt = dt.setZone(timezone);
    return dt.toLocaleString(localeString);
}

export default function WeatherSummaryAccordion({
                                                    type,
                                                    mappedWeatherData = {},
                                                    timezone,
                                                }) {
    const timeString = getTimeString(type, mappedWeatherData.time, timezone);

    return (
        <Accordion id='weather-summary-accordion'>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <Typography id="time">
                            {timeString}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            id='temperature'>{mappedWeatherData.temperature}</Typography>
                    </Grid>
                    <Grid item>
                        <WeatherIcon weatherCode={mappedWeatherData.weather_code}/>
                    </Grid>
                    <Grid item>
                        <PrecipitationItem precipitation={mappedWeatherData.precipitation_probability}/>
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
