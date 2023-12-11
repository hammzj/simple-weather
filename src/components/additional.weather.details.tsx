import React from 'react';
import {isEqual, isNil} from "lodash";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {NOT_AVAILABLE_TEXT} from './constants';
import {weatherCodeToText} from './utils';
import {DateTime} from "luxon";

//TODO: move to general types
type  AdditionalWeatherDetailsType = 'hourly' | 'daily';


const Row = ({title, value}) => {
    const id = `tr-${title.replace(':', '').replace(/\s/g, '-').toLowerCase()}`;
    return (
        <TableRow id={id}>
            <TableCell align='left'>
                <Typography>{title}</Typography>
            </TableCell>
            <TableCell align='left'>
                <Typography>{value ?? NOT_AVAILABLE_TEXT}</Typography>
            </TableCell>
        </TableRow>
    )
}

export default function AdditionalWeatherDetails({
                                                     type,
                                                     mappedWeatherData = {}
                                                 }) {
    //handle state change when updated by newly selected row
    const hourlyDetails = (mappedWeatherData) => {
        const {
            temperature,
            precipitation_probability,
            precipitation,
            humidity,
            weather_code,
            cloud_cover,
            wind,
            wind_gusts,
        } = mappedWeatherData;
        return [
            {title: "Temperature:", value: temperature},
            {title: "Conditions:", value: weatherCodeToText(weather_code)},
            {title: "Precipitation:", value: precipitation},
            {title: "Precipitation probability:", value: precipitation_probability},
            {title: "Humidity:", value: humidity},
            {title: "Cloud cover:", value: cloud_cover},
            {title: "Wind:", value: wind},
            {title: "Wind gusts:", value: wind_gusts},
        ]
    }
    const dailyDetails = (mappedWeatherData) => {
        const {
            temperature_range,
            weather_code,
            sunrise,
            sunset,
            precipitation_probability,
            precipitation,
            wind,
            wind_gusts,
        } = mappedWeatherData;

        const convertToTime = (time) => {
            return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
        }

        return [
            {title: "Temperature Low/High:", value: temperature_range},
            {title: "Conditions:", value: weatherCodeToText(weather_code)},
            {title: "Sunrise:", value: convertToTime(sunrise)},
            {title: "Sunset:", value: convertToTime(sunset)},
            {title: "Precipitation probability:", value: precipitation_probability},
            {title: "Precipitation accumulation:", value: precipitation},
            {title: "Wind (with dominant direction):", value: wind},
            {title: "Wind gusts:", value: wind_gusts},
        ];
    }

    const details = isEqual(type, 'hourly') ?
        hourlyDetails(mappedWeatherData) :
        dailyDetails(mappedWeatherData);
    return (
        <Box id="additional-weather-details">
            <TableContainer>
                <Table>
                    <TableBody>
                        {details.map(({title, value}, i) => <Row key={i} title={title} value={value}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
