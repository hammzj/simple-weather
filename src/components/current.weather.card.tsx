import React from 'react';
import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import PrecipitationChance from './precipitation.chance';
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
                {
                    currentWeatherData.temperature_range &&
                    <Typography id='temperature-range'>{currentWeatherData.temperature_range}</Typography>
                }
                <Stack direction='row'
                       justifyContent='space-evenly'
                       alignItems='center'
                       paddingTop={1}
                       spacing={3.5}>

                    {
                        currentWeatherData.weather_code &&
                        <WeatherIcon weatherCode={currentWeatherData.weather_code}/>
                    }
                    {
                        currentWeatherData.precipitation &&
                        <PrecipitationChance precipitation={currentWeatherData.precipitation}/>
                    }
                </Stack>
                {
                    currentWeatherData.time &&
                    <Typography fontSize='.8rem' fontStyle='italic' id='last-updated-time' padding={1}>Last
                        updated: {timeString}</Typography>
                }
            </Stack>
        </Card>
    )
}
