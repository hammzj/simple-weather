import React from 'react';
import {isEqual} from "lodash";
import {DateTime, Zone} from 'luxon';
import {Accordion, AccordionSummary, AccordionDetails, Stack, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                                                    ...props
                                                }) {
    const timeString = getTimeString(type, mappedWeatherData.time, timezone);
    return (
        <Accordion id={`${type}-weather-summary-accordion`} {...props}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    <Typography id="time">{timeString}</Typography>
                    <Typography id='temperature' sx={{fontSize: '0.9rem'}}>{mappedWeatherData.temperature}</Typography>
                    <WeatherIcon weatherCode={mappedWeatherData.weather_code}/>
                    <PrecipitationItem precipitation={mappedWeatherData.precipitation_probability}/>
                </Stack>
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
