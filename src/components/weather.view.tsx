import React from "react";
import {isEqual} from "lodash";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WeatherSummaryAccordion from "./weather.summary.accordion";

const WeatherRowsTabPanel = (props) => {
    const {timeBasedMappedWeatherData, type, value, index} = props;
    return (<Box
        role="tabpanel"
        hidden={!isEqual(value, index)}
        id={`tabpanel-${type}`}
        aria-labelledby={`tabpanel-${type}`}
    >
        {isEqual(value, index) && timeBasedMappedWeatherData.map(mwd => {
            return <WeatherSummaryAccordion type={type} mappedWeatherData={mwd}/>
        })}
    </Box>)
}

export default function WeatherView({weatherData}) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (<Container>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
            >
                <Tab label="Hourly"/>
                <Tab label="Daily"/>
            </Tabs>
            <WeatherRowsTabPanel value={value} index={0} type="hourly" timeBasedMappedWeatherData={weatherData.hourly_weather}/>
            <WeatherRowsTabPanel value={value} index={1} type="daily" timeBasedMappedWeatherData={weatherData.daily_weather}/>
        </Container>
    )
}
