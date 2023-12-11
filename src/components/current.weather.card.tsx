import React from 'react';
import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import PrecipitationItem from './precipitation.item';
import WeatherIcon from "./weather.icon";
import {DateTime} from "luxon";

export default function CurrentWeatherCard({
                                               locationName,
                                               currentWeatherData = {}
                                           }) {
    const timeString = DateTime.fromISO(currentWeatherData.time).toLocaleString(DateTime.DATETIME_MED)

    return (
        <Card>
            <Stack
                id="current-weather"
                direction='column'
                alignItems='center'
                spacing={0.4}
            >
                <Typography fontSize='1.5rem' id='location'>{locationName}</Typography>
                <Typography fontSize='2.5rem' id='temperature'>{currentWeatherData.temperature}</Typography>
                {currentWeatherData.weather_code && (<WeatherIcon weatherCode={currentWeatherData.weather_code}/>)}
                {currentWeatherData.precipitation &&
                <PrecipitationItem precipitation={currentWeatherData.precipitation}/>}
                {currentWeatherData.time &&
                <Typography fontSize='.8rem' fontStyle='italic' id='time'>Last updated: {timeString}</Typography>}
            </Stack>
        </Card>
    )
}
