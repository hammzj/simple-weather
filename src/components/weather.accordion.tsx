import React from "react";
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
    Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import PrecipitationChance from "./precipitation.chance";
import WeatherIcon from "./weather.icon";
import { NOT_AVAILABLE_TEXT } from "../constants";
import { isMobile, shadows, weatherCodeToText } from "./utils";
import { DailyWeatherDataMappings, HourlyWeatherDataMappings, IsDay } from "../services/api";
import { isEqual } from "lodash";
import { DateTime, Zone } from "luxon";
import { WeatherCode } from "../services/open_meteo_api/forecast_api";

type WeatherSummaryTimeType = "hourly" | "daily";

type MappedWeatherData = HourlyWeatherDataMappings | DailyWeatherDataMappings;

interface WeatherAccordionProps {
    type: WeatherSummaryTimeType;
    mappedWeatherData: any;
    timezone?: string | "local" | Zone;
    onChange?: any;
    props?: any;
}

interface AdditionalWeatherDetailsProps {
    type: WeatherSummaryTimeType;
    mappedWeatherData: MappedWeatherData | any;
}

interface AdditionalWeatherDetailsRowProps {
    title: string;
    value?: string | number;
}

interface WeatherAccordionSummaryProps {
    type: WeatherSummaryTimeType;
    mappedWeatherData: MappedWeatherData;
    timezone?: Zone | string;
}

const getTimeStringForSummary = (
    type: WeatherSummaryTimeType,
    dateTime: string,
    timezone?: Zone | string
): string => {
    const isDaily = isEqual(type, "daily");
    const localeString = isDaily ? DateTime.DATE_MED : DateTime.DATETIME_MED; //Consider 24-hour format
    let dt = DateTime.fromISO(dateTime);
    if (timezone) dt = dt.setZone(timezone);
    return dt.toLocaleString(localeString);
};

//Changes layout based on mobile viewport
const WeatherAccordionSummary = ({
    type,
    mappedWeatherData,
    timezone,
}: WeatherAccordionSummaryProps): React.ReactElement => {
    const timeString = getTimeStringForSummary(type, mappedWeatherData.time, timezone || "local");
    //@ts-ignore: TS2339 -- We don't need to enforce this. mappedWeatherData can be hourly or daily.
    const temperature = mappedWeatherData.temperature || mappedWeatherData.temperature_range;

    //Default to daytime variant
    //@ts-ignore: TS2339 -- We don't need to enforce this.
    const isDay = mappedWeatherData.is_day ?? IsDay.DAY;

    return (
        <AccordionSummary
            sx={{
                fontSizeAdjust: "auto",
                border: 1,
                borderRadius: 0,
            }}
            expandIcon={<ExpandMore />}>
            {isMobile() ? (
                <Stack direction='column' spacing={1}>
                    <Typography id='time' sx={{ fontSize: "0.9em", textAlign: "left" }}>
                        {timeString}
                    </Typography>
                    <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={2}>
                        <Typography id='temperature' sx={{ fontSize: "0.9rem" }}>
                            {temperature}
                        </Typography>
                        <WeatherIcon
                            weatherCode={mappedWeatherData.weather_code as WeatherCode}
                            isDay={isDay}
                        />
                        <PrecipitationChance
                            precipitation={mappedWeatherData.precipitation_probability}
                        />
                    </Stack>
                </Stack>
            ) : (
                <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    spacing={4}
                    marginLeft='0.2em'>
                    <Typography id='time' sx={{ fontSize: "0.9em" }}>
                        {timeString}
                    </Typography>
                    <Typography id='temperature' sx={{ fontSize: "0.9em" }}>
                        {temperature}
                    </Typography>
                    <WeatherIcon
                        weatherCode={mappedWeatherData.weather_code as WeatherCode}
                        isDay={isDay}
                    />
                    <PrecipitationChance
                        precipitation={mappedWeatherData.precipitation_probability}
                    />
                </Stack>
            )}
        </AccordionSummary>
    );
};

const AdditionalWeatherDetailsRow = ({
    title,
    value,
}: AdditionalWeatherDetailsRowProps): React.ReactElement => {
    const id = `${title.replace(":", "").replace(/\s/g, "-").toLowerCase()}`;
    return (
        <TableRow id={id}>
            <TableCell sx={{ align: "left", borderBottom: 1 }}>
                <Typography>{title}</Typography>
            </TableCell>
            <TableCell sx={{ align: "left", borderBottom: 1 }}>
                <Typography>{value ?? NOT_AVAILABLE_TEXT}</Typography>
            </TableCell>
        </TableRow>
    );
};

/*
 * This component is the container for the rows with additional details displayed when the accordion is expanded
 * Exporting for use in testing
 */
export const AdditionalWeatherDetails = ({
    type,
    mappedWeatherData = {},
}: AdditionalWeatherDetailsProps): React.ReactElement => {
    //handle state change when updated by newly selected row
    const hourlyDetails = (mappedWeatherData) => {
        const {
            temperature,
            precipitation_probability,
            precipitation,
            snow_depth,
            humidity,
            weather_code,
            cloud_cover,
            wind,
            wind_gusts,
        } = mappedWeatherData;
        return [
            { title: "Temperature:", value: temperature },
            { title: "Conditions:", value: weatherCodeToText(weather_code) },
            { title: "Precipitation:", value: precipitation },
            { title: "Precipitation probability:", value: precipitation_probability },
            { title: "Snow depth:", value: snow_depth },
            { title: "Wind:", value: wind },
            { title: "Wind gusts:", value: wind_gusts },
            { title: "Humidity:", value: humidity },
            { title: "Cloud cover:", value: cloud_cover },
        ];
    };
    const dailyDetails = (mappedWeatherData) => {
        const {
            temperature_range,
            weather_code,
            sunrise,
            sunset,
            precipitation_probability,
            precipitation,
            snowfall_sum,
            wind,
            wind_gusts,
        } = mappedWeatherData;

        const convertToTime = (time: string) => {
            return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
        };

        return [
            { title: "Temperature Low/High:", value: temperature_range },
            { title: "Conditions:", value: weatherCodeToText(weather_code) },
            { title: "Precipitation:", value: precipitation },
            { title: "Precipitation probability:", value: precipitation_probability },
            { title: "Snowfall sum:", value: snowfall_sum },
            { title: "Wind:", value: wind },
            { title: "Wind gusts:", value: wind_gusts },
            { title: "Sunrise:", value: convertToTime(sunrise) },
            { title: "Sunset:", value: convertToTime(sunset) },
        ];
    };

    const details = isEqual(type, "hourly")
        ? hourlyDetails(mappedWeatherData)
        : dailyDetails(mappedWeatherData);
    return (
        <Box id='additional-weather-details'>
            <TableContainer>
                <Table>
                    <TableBody>
                        {details.map(({ title, value }, i) => (
                            <AdditionalWeatherDetailsRow key={i} title={title} value={value} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

//TODO: fix typing to correctly include "expanded" and "onChange"
export default function WeatherAccordion({
    type,
    mappedWeatherData,
    timezone,
    ...props
}: WeatherAccordionProps | any) {
    return (
        <Accordion
            id={`${type}-weather-summary-accordion`}
            square={true}
            sx={{
                paddingInline: isMobile() ? 0 : 5,
                boxShadow: 0,
                backgroundImage: "none",
            }}
            {...props}>
            <WeatherAccordionSummary
                type={type}
                mappedWeatherData={mappedWeatherData}
                timezone={timezone}
            />
            <AccordionDetails
                sx={{
                    border: 0,
                    paddingTop: 1,
                    paddingInline: isMobile() ? 0 : 3,
                }}>
                <Box
                    sx={{
                        border: 1,
                        borderRadius: 0,
                        boxShadow: shadows("4px", "4px", "1px", "1px"),
                    }}>
                    <AdditionalWeatherDetails type={type} mappedWeatherData={mappedWeatherData} />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
