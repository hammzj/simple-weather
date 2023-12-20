import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CurrentWeatherCard from '../components/current.weather.card';
import WeatherViewContainer from '../components/weather.view.container';
import LoadingMessage from "../components/loading.message";
import SimpleWeatherAPI from "../services/api";
import {getLocationName} from "../services/open_meteo_api/utils";
import {PrecipitationUnit, TemperatureUnit, WindSpeedUnit} from "../services/open_meteo_api/forecast_api/types";
import {DateTime} from "luxon";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [locationName, setLocationName] = useState('');
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        const getWeatherData = async ([latitude, longitude]) => {
            try {
                const systemTimezone = DateTime.local().zoneName || 'auto';

                const data = await SimpleWeatherAPI.getWeather(
                    [latitude, longitude],
                    systemTimezone,
                    {
                        temperature_unit: TemperatureUnit.fahrenheit,
                        wind_speed_unit: WindSpeedUnit.mph,
                        precipitation_unit: PrecipitationUnit.inch,
                    });
                //@ts-ignore
                setWeatherData(data);
            } catch (err) {
                console.error(err);
            }
        };

        setIsLoading(true);

        //Used for the current weather to display the name
        setLocationName(getLocationName(locationData));

        //Get all weather data
        const {latitude, longitude} = locationData;
        if (latitude && longitude) {
            getWeatherData([latitude, longitude]);
        }
        setIsLoading(false);
    }, [locationData]);

    return (
        <Box>
            {
                isLoading ? <LoadingMessage/> :
                    (weatherData && locationName ?
                            <WeatherPageContainer locationName={locationName} weatherData={weatherData}/> :
                            <Typography>TODO No data available TODO</Typography>
                    )}
        </Box>
    )
};
