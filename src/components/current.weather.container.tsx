import React from 'react';
import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import PrecipitationItem from './precipitation.item';
import WeatherIcon from "./weather.icon";

export default function CurrentWeatherContainer({
                                                    locationName,
                                                    temperature,
                                                    weatherCode,
                                                    precipitation,
                                                }) {
    return (
        <Card>
            <Stack
                id="current-weather"
                direction='column'
                alignItems='center'
            >
                <Typography fontSize='1.5rem' id='location'>{locationName}</Typography>
                <Typography fontSize='2.5rem' id='temperature'>{temperature}</Typography>
                {weatherCode && (<WeatherIcon weatherCode={weatherCode}/>)}
                {precipitation && <PrecipitationItem precipitation={precipitation}/>}
            </Stack>
        </Card>
    )
}
