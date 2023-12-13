import React from "react";
import {isEqual, isEmpty} from "lodash";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import WeatherSummaryAccordion from "./weather.summary.accordion";

const EmptyDataMessage = () => {
    return (<Box alignContent='center' justifyContent='center'>
        <Typography align='center'>No data could be returned for the location.</Typography>
    </Box>)
}

const WeatherRowsTabPanel = (props) => {
    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    const {timeBasedWeatherData, type, value, index} = props;
    return (<Box
        role="tabpanel"
        hidden={!isEqual(value, index)}
        id={`tabpanel-${type}`}
        aria-labelledby={`tabpanel-${type}`}
    >
        {isEmpty(timeBasedWeatherData) ?
            <EmptyDataMessage/> :
            isEqual(value, index) && timeBasedWeatherData.map((tbwd, i) => {
                const accordionId = `accordion-${i}`
                return (
                    <Box paddingBottom={'1.5em'}>
                        <WeatherSummaryAccordion
                            expanded={isEqual(expanded, accordionId)}
                            onChange={handleChange(accordionId)}
                            type={type}
                            mappedWeatherData={tbwd.mapped}
                        />
                    </Box>)
            })}
    </Box>)
}


export default function WeatherViewContainer({weatherData}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const {hourly_weather, daily_weather} = weatherData;

    return (<Box id='weather-view'>
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
