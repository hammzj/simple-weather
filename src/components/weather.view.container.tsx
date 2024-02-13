import React from "react";
import { isEqual, isEmpty } from "lodash";
import { Box, Tabs, Tab } from "@mui/material";
import WeatherAccordion from "./weather.accordion";
import { DailyWeatherData, HourlyWeatherData, TotalWeatherData } from "../services/api";
import Message from "./message";

interface WeatherRowsTabPanelProps {
    timeBasedWeatherData: (HourlyWeatherData | DailyWeatherData)[];
    type: "hourly" | "daily";
    value: number;
    index: number;
}

interface WeatherViewContainerProps {
    totalWeatherData: Record<string, never> | TotalWeatherData;
}

const tabClass = {
    "&.Mui-selected": {
        color: "inherit",
    },
};

const EmptyDataMessage = (): React.ReactElement => {
    return <Message value='No data could be returned for the location.' />;
};

const WeatherRowsTabPanel = ({
    timeBasedWeatherData,
    type,
    value,
    index,
}: WeatherRowsTabPanelProps): React.ReactElement => {
    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            role='tabpanel'
            hidden={!isEqual(value, index)}
            id={`tabpanel-${type}`}
            aria-labelledby={`tabpanel-${type}`}>
            {isEmpty(timeBasedWeatherData) ? (
                <EmptyDataMessage />
            ) : (
                isEqual(value, index) &&
                timeBasedWeatherData.map((tbwd, i) => {
                    const accordionId = `accordion-${i}`;
                    return (
                        <Box paddingBottom='2em' key={accordionId}>
                            <WeatherAccordion
                                expanded={isEqual(expanded, accordionId)}
                                onChange={handleChange(accordionId)}
                                type={type}
                                mappedWeatherData={tbwd.mapped}
                            />
                        </Box>
                    );
                })
            )}
        </Box>
    );
};

export default function WeatherViewContainer({
    totalWeatherData,
}: WeatherViewContainerProps): React.ReactElement {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box id='weather-view'>
            <Box paddingBottom='1em'>
                <Tabs value={value} onChange={handleChange} centered indicatorColor='secondary'>
                    <Tab label='Hourly' sx={tabClass} />
                    <Tab label='Daily' sx={tabClass} />
                </Tabs>
            </Box>
            <WeatherRowsTabPanel
                type='hourly'
                timeBasedWeatherData={totalWeatherData.hourly_weather}
                value={value}
                index={0}
            />
            <WeatherRowsTabPanel
                type='daily'
                timeBasedWeatherData={totalWeatherData.daily_weather}
                value={value}
                index={1}
            />
        </Box>
    );
}
