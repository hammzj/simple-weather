import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CurrentWeatherCard from '../components/current.weather.card';
import WeatherViewContainer from '../components/weather.view.container';
import SimpleWeatherAPI from "../services/api";
import {getLocationName} from "../services/open_mateo_api/utils";

const WeatherPageContainer = ({locationName, weatherData = {}}: {
    locationName: string;
    weatherData: any;
}) => {
    const {current_weather} = weatherData;
    return (<Box>
        {current_weather && (
            <CurrentWeatherCard locationName={locationName} currentWeatherData={current_weather}/>
        )}
        <Divider/>
        <WeatherViewContainer weatherData={weatherData}/>
    </Box>)
}

//TODO: rename to WeatherContainer???
export default function WeatherPage() {
    const location = useLocation();
    const {locationData} = location.state;
    const [locationName, setLocationName] = useState('');
    const [weatherData, setWeatherData] = useState({});

    //Used for the current weather to display the name
    useEffect(() => {
        setLocationName(getLocationName(locationData));
    }, [locationData]);

    //Get all weather data
    useEffect(() => {
        const getWeatherData = async ([latitude, longitude]) => {
            try {
                const data = await SimpleWeatherAPI.getWeather([latitude, longitude]);
                //@ts-ignore
                setWeatherData(data);
            } catch (err) {
                console.error(err);
            }
        };
        const {latitude, longitude} = locationData;
        if (latitude && longitude) {
            getWeatherData([latitude, longitude]);
        }
    }, [locationData]);

    return (
        <Box>
            {(weatherData && locationName ?
                    <WeatherPageContainer locationName={locationName} weatherData={weatherData}/> :
                    <Typography>TODO No data available TODO</Typography>
            )}
        </Box>
    )
};
