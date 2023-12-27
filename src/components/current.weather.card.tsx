import React from 'react';
import {Card, Stack, Typography} from '@mui/material';
import PrecipitationChance from './precipitation.chance';
import WeatherIcon from "./weather.icon";
import {CurrentWeatherData} from "../services/api";
import {DateTime} from "luxon";

type CurrentWeatherCardParams = {
    locationName: string,
    currentWeatherData: CurrentWeatherData,
}

export default function CurrentWeatherCard({
                                               locationName,
                                               currentWeatherData
                                           }: CurrentWeatherCardParams): React.ReactElement {
    const timeString = DateTime.fromISO(currentWeatherData.mapped.time).toLocaleString(DateTime.DATETIME_MED)

    return (
        <Card>
            <Stack
                id="current-weather"
                direction='column'
                alignItems='center'
                spacing={0.4}
            >
                <Typography fontSize='1.5rem' id='location'>{locationName}</Typography>
                <Typography fontSize='2.5rem' id='temperature'>{currentWeatherData.mapped.temperature}</Typography>
                {
                    currentWeatherData.mapped.temperature_range &&
                    <Typography id='temperature-range'>{currentWeatherData.mapped.temperature_range}</Typography>
                }
                <Stack direction='row'
                       justifyContent='space-evenly'
                       alignItems='center'
                       paddingTop={1}
                       spacing={3.5}>

                    {
                        currentWeatherData.mapped.weather_code &&
                        <WeatherIcon weatherCode={currentWeatherData.mapped.weather_code}/>
                    }
                    {
                        currentWeatherData.mapped.precipitation &&
                        <PrecipitationChance precipitation={currentWeatherData.mapped.precipitation}/>
                    }
                </Stack>
                {
                    currentWeatherData.mapped.time &&
                    <Typography fontSize='.8rem' fontStyle='italic' id='last-updated-time' padding={1}>Last
                        updated: {timeString}</Typography>
                }
            </Stack>
        </Card>
    )
}
