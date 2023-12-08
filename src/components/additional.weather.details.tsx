import React from 'react';
import {isEqual, isNil} from "lodash";
import {WeatherCode} from "../services/open_mateo_api/forecast_api/types";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

//TODO: move to general types
type  AdditionalWeatherDetailsType = 'hourly' | 'daily';

const NOT_AVAILABLE_TEXT = "N/A";

const convertWeatherCodeToText = (weatherCode: number | null | undefined) => {
    if (!isNil(WeatherCode[weatherCode])) {
        return WeatherCode[weatherCode]
            .replace(/_/g, ' ')
            .toLowerCase();
    } else {
        return NOT_AVAILABLE_TEXT;
    }
}

const Row = ({title, value}) => {
    const id = `tr-${title.replace(':', '').replace(/\s/g, '-').toLowerCase()}`;
    return (
        <TableRow id={id}>
            <TableCell align='left'>
                <Typography>{title}</Typography>
            </TableCell>
            <TableCell align='left'>
                <Typography>{value || NOT_AVAILABLE_TEXT}</Typography>
            </TableCell>
        </TableRow>
    )
}

export default function AdditionalWeatherDetails({
                                                     type,
                                                     properties = {}
                                                 }) {
    //handle state change when updated by newly selected row
    const hourlyDetails = (properties) => {
        const {
            temperature_2m,
            precipitation_probability,
            precipitation,
            relative_humidity_2m,
            weather_code,
            cloud_cover,
            wind_speed_10m,
            wind_direction_10m,
            wind_gusts_10m,
        } = properties;
        const wind = (wind_speed_10m && wind_direction_10m) ?
            `${wind_speed_10m} ${wind_direction_10m}` :
            NOT_AVAILABLE_TEXT;
        return [
            {title: "Temperature:", value: temperature_2m},
            {title: "Conditions:", value: convertWeatherCodeToText(weather_code)},
            {title: "Precipitation:", value: precipitation},
            {title: "Precipitation probability:", value: precipitation_probability},
            {title: "Humidity:", value: relative_humidity_2m},
            {title: "Cloud cover:", value: cloud_cover},
            {title: "Wind:", value: wind},
            {title: "Wind gusts:", value: wind_gusts_10m},
        ]
    }
    const dailyDetails = (properties) => {
        const {
            weather_code,
            temperature_2m_min,
            temperature_2m_max,
            sunrise,
            sunset,
            precipitation_sum,
            precipitation_hours, //Idk how to use this
            precipitation_probability_max,
            wind_speed_10m_max,
            wind_direction_10m_dominant,
            wind_gusts_10m_max,
        } = properties;

        //TODO: convert to time
        const convertToTime = (time) => {
            return time
        }
        const minMaxTemp = (temperature_2m_min && temperature_2m_max) ?
            `${temperature_2m_min} / ${temperature_2m_max}` :
            NOT_AVAILABLE_TEXT;
        //Maybe consider an icon explaining this is the dominant direction?
        const wind = (wind_speed_10m_max && wind_direction_10m_dominant) ?
            `${wind_speed_10m_max} ${wind_direction_10m_dominant}` :
            NOT_AVAILABLE_TEXT;
        return [
            {title: "Temperature Low/High:", value: minMaxTemp},
            {title: "Conditions:", value: convertWeatherCodeToText(weather_code)},
            {title: "Sunrise:", value: convertToTime(sunrise)},
            {title: "Sunset:", value: convertToTime(sunset)},
            {title: "Precipitation probability:", value: precipitation_probability_max},
            {title: "Precipitation accumulation:", value: precipitation_sum},
            {title: "Wind (with dominant direction):", value: wind},
            {title: "Wind gusts:", value: wind_gusts_10m_max},
        ];
    }

    const details = isEqual(type, 'hourly') ?
        hourlyDetails(properties) :
        dailyDetails(properties);
    return (
        <Box id="additional-weather-details">
            <TableContainer>
                <Table>
                    <TableBody>
                        {details.map(({title, value}) => <Row title={title} value={value}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
