import React from 'react';
import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import PrecipitationItem from './precipitation.item';
import WeatherIcon from "./weather.icon";
import {DateTime} from "luxon";

export default function CurrentWeatherContainer({
                                                    locationName,
                                                    weatherData = {}
                                                }) {
    const timeString = DateTime.fromISO(weatherData.time).toLocaleString(DateTime.DATETIME_MED)

    return (
        <Card>
            <Stack
                id="current-weather"
                direction='column'
                alignItems='center'
                spacing={0.4}
            >
                <Typography fontSize='1.5rem' id='location'>{locationName}</Typography>
                <Typography fontSize='2.5rem' id='temperature'>{weatherData.temperature}</Typography>
                {weatherData.weather_code && (<WeatherIcon weatherCode={weatherData.weather_code}/>)}
                {weatherData.precipitation && <PrecipitationItem precipitation={weatherData.precipitation}/>}
                {weatherData.time && <Typography fontSize='.8rem' fontStyle='italic' id='time'>Last updated: {timeString}</Typography>}
            </Stack>
        </Card>
    )
}
