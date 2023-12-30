import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import {ExpandMore} from '@mui/icons-material';
import PrecipitationChance from './precipitation.chance';
import WeatherIcon from "./weather.icon";
import {NOT_AVAILABLE_TEXT} from '../constants';
import {weatherCodeToText} from './utils';
import {DailyWeatherData, HourlyWeatherData} from "../services/api";
import {isEqual} from "lodash";
import {DateTime, Zone} from 'luxon';

type  WeatherSummaryTimeType = 'hourly' | 'daily';

interface WeatherSummaryAccordionProps {
    type: WeatherSummaryTimeType,
    mappedWeatherData: any,
    timezone?: string | 'local' | Zone,
    onChange?: any,
    props?: any
}

interface AdditionalWeatherDetailsProps {
    type: WeatherSummaryTimeType
    mappedWeatherData: HourlyWeatherData | DailyWeatherData | {}
}

interface AdditionalWeatherDetailsRowProps {
    title: string,
    value?: string | number
}

const getTimeStringForSummary = (type: WeatherSummaryTimeType, dateTime: string, timezone?: Zone | string): string => {
    const isDaily = isEqual(type, 'daily');
    const localeString = isDaily ?
        DateTime.DATE_MED :
        DateTime.DATETIME_MED; //Consider 24-hour format
    let dt = DateTime.fromISO(dateTime);
    if (timezone) dt = dt.setZone(timezone);
    return dt.toLocaleString(localeString);
}

const AdditionalWeatherDetailsRow = ({title, value}: AdditionalWeatherDetailsRowProps): React.ReactElement => {
    const id = `${title.replace(':', '').replace(/\s/g, '-').toLowerCase()}`;
    return (
        <TableRow id={id}>
            <TableCell sx={{align: 'left', borderBottom: 1}}>
                <Typography>{title}</Typography>
            </TableCell>
            <TableCell sx={{align: 'left', borderBottom: 1}}>
                <Typography>{value ?? NOT_AVAILABLE_TEXT}</Typography>
            </TableCell>
        </TableRow>
    )
}

/*
* This component is the container for the rows with additional details displayed when the accordion is expanded
* Exporting for use in testing
*/
export const AdditionalWeatherDetails = ({type, mappedWeatherData = {}}): React.ReactElement => {
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
            {title: "Wind:", value: wind},
            {title: "Wind gusts:", value: wind_gusts},
            {title: "Humidity:", value: humidity},
            {title: "Cloud cover:", value: cloud_cover},
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

        const convertToTime = (time: string) => {
            return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
        }

        return [
            {title: "Temperature Low/High:", value: temperature_range},
            {title: "Conditions:", value: weatherCodeToText(weather_code)},
            {title: "Precipitation:", value: precipitation},
            {title: "Precipitation probability:", value: precipitation_probability},
            {title: "Wind (with dominant direction):", value: wind},
            {title: "Wind gusts:", value: wind_gusts},
            {title: "Sunrise:", value: convertToTime(sunrise)},
            {title: "Sunset:", value: convertToTime(sunset)},
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
                        {details.map(({title, value}, i) => <AdditionalWeatherDetailsRow key={i} title={title}
                                                                                         value={value}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}


//TODO: fix typing to correctly include "expanded" and "onChange"
export default function WeatherSummaryAccordion({
                                                    type,
                                                    mappedWeatherData,
                                                    timezone,
                                                    ...props
                                                }: WeatherSummaryAccordionProps | any) {
    const timeString = getTimeStringForSummary(type, mappedWeatherData.time, timezone || 'local');
    return (
        <Accordion
            id={`${type}-weather-summary-accordion`}
            sx={{boxShadow: 0}}
            {...props}>
            <AccordionSummary
                sx={{
                    border: 1,
                    borderRadius: 0,
                }}
                expandIcon={<ExpandMore/>}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                    marginLeft='0.5em'
                >
                    <Typography id="time">{timeString}</Typography>
                    <Typography id='temperature'
                                sx={{fontSize: '0.9rem'}}>{mappedWeatherData.temperature || mappedWeatherData.temperature_range}</Typography>
                    <WeatherIcon weatherCode={mappedWeatherData.weather_code}/>
                    <PrecipitationChance precipitation={mappedWeatherData.precipitation_probability}/>
                </Stack>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    border: 0,
                }}
            >
                <Box
                    sx={{
                        border: 1,
                        borderRadius: 0,
                        boxShadow: '4px 4px 1px 1px black;',
                    }}
                >
                    <AdditionalWeatherDetails type={type} mappedWeatherData={mappedWeatherData}/>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
