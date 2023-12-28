import React from "react";
import {Box, Tabs, Tab, Typography} from "@mui/material";
import WeatherSummaryAccordion from "./weather.summary.accordion";
import {isEqual, isEmpty} from "lodash";

//TODO: make reusable Message component
const EmptyDataMessage = (): React.ReactElement => {
    return (
        <Box alignContent='center' justifyContent='center'>
            <Typography align='center'>No data could be returned for the location.</Typography>
        </Box>
    )
}

const WeatherRowsTabPanel = (props): React.ReactElement => {
    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    const {timeBasedWeatherData, type, value, index} = props;
    return (
        <Box
            role="tabpanel"
            hidden={!isEqual(value, index)}
            id={`tabpanel-${type}`}
            aria-labelledby={`tabpanel-${type}`}
        >
            {isEmpty(timeBasedWeatherData) ?
                <EmptyDataMessage/> :
                isEqual(value, index) && timeBasedWeatherData.map((tbwd, i) => {
                    const accordionId = `accordion-${i}`;
                    return (
                        <Box paddingBottom={'1.5em'}>
                            <WeatherSummaryAccordion
                                expanded={isEqual(expanded, accordionId)}
                                onChange={handleChange(accordionId)}
                                type={type}
                                mappedWeatherData={tbwd.mapped}
                            />
                        </Box>
                    )
                })}
        </Box>
    )
}

export default function WeatherViewContainer({weatherData}): React.ReactElement {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const {hourly_weather, daily_weather} = weatherData;

    return (
        <Box id='weather-view'>
            <Box paddingBottom='1em'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Hourly"/>
                    <Tab label="Daily"/>
                </Tabs>
            </Box>
            <WeatherRowsTabPanel value={value} index={0} type="hourly" timeBasedWeatherData={hourly_weather}/>
            <WeatherRowsTabPanel value={value} index={1} type="daily" timeBasedWeatherData={daily_weather}/>
        </Box>
    )
}
