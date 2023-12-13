import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CurrentWeatherCard from '../components/current.weather.card';
import WeatherViewContainer from '../components/weather.view.container';
import {getLocationName} from "../services/open_mateo_api/utils";

const Weather = ({locationData, weatherData = {}}) => {
    const {current_weather} = weatherData;
    return (<Box>
        <CurrentWeatherCard locationName={getLocationName(locationData)} currentWeatherData={current_weather.mapped}/>
        <Divider/>
        <WeatherViewContainer weatherData={weatherData}/>
    </Box>)
}

//TODO
export default function WeatherPage(props) {
    const {weatherData, locationData} = props;
    return (
        <Box>
            {(weatherData && locationData ?
            <Weather locationData={locationData} weatherData={weatherData}/> :
            <Typography>TODO No data available TODO</Typography>
            )}
        </Box>
    )
};
