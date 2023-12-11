import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CurrentWeatherCard from '../components/current.weather.card';
import WeatherViewContainer from '../components/weather.view.container';

const Weather = ({locationData, weatherData = {}}) => {
    const {current_weather} = weatherData;
    return (<Box>
        <CurrentWeatherCard locationName={locationData.name} currentWeatherData={current_weather.mapped}/>
        <Divider/>
        <WeatherViewContainer weatherData={weatherData}/>
    </Box>)
}

//TODO
export default function WeatherPage(props) {
    const {weatherData, locationData} = props;
    console.log('WeatherPage.weatherData', props)
    return (
        <Box>
            {(weatherData && locationData ?
            <Weather locationData={locationData} weatherData={weatherData}/> :
            <Typography>TODO No data available TODO</Typography>
            )}
        </Box>
    )
};
