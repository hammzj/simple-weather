import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Box, Divider, Stack} from "@mui/material";
import Page from '../components/page';
import Message from "../components/message";
import LoadingMessage from "../components/loading.message";
import CurrentWeatherCard from '../components/current.weather.card';
import WeatherViewContainer from '../components/weather.view.container';
import SimpleWeatherAPI from "../services/api";
import {OpenMeteoGeocodingAPI} from "../services/open_meteo_api";
import {PrecipitationUnit, TemperatureUnit, WindSpeedUnit} from "../services/open_meteo_api/forecast_api";
import {getLocationName} from "../services/open_meteo_api/utils";
import {DateTime} from "luxon";

interface WeatherPageContainerProps {
    locationName: string;
    weatherData: any;
}

const ErrorMessage = () => {
    return <Message value='An error occurred when loading the data.'/>
}

const WeatherPageContainer = ({locationName, weatherData = {}}: WeatherPageContainerProps): React.ReactElement => {
    const {current_weather} = weatherData;
    const hasNeededData = weatherData.current_weather && locationName;

    return (<Stack direction='column' padding={1}>
            {hasNeededData ?
                (
                    <Box>
                        <CurrentWeatherCard locationName={locationName} currentWeatherData={current_weather}/>
                        <Divider/>
                        <Box marginTop='1.5em'>
                            <WeatherViewContainer weatherData={weatherData}/>
                        </Box>
                    </Box>
                ) :
                <ErrorMessage/>
            }
        </Stack>
    )
}

export default function WeatherPage(): React.ReactElement {
    const {search} = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [locationName, setLocationName] = useState('');
    const [weatherData, setWeatherData] = useState({});

    //Get location name and weather data
    useEffect(() => {
        const getGeocodingAndWeatherData = async (locationId) => {
            const requestLocationData = async (id) => {
                try {
                    const {data} = await OpenMeteoGeocodingAPI.getLocation(id);
                    return data;
                } catch (err) {
                    console.log(err);
                }
            }
            const requestWeatherData = async ([latitude, longitude]) => {
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

            try {
                const locationData = await requestLocationData(locationId);
                if (locationData) {
                    const {latitude, longitude} = locationData;
                    //Used for the current weather to display the name
                    setLocationName(getLocationName(locationData));
                    if (latitude && longitude) {
                        await requestWeatherData([latitude, longitude]);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        }

        try {
            const id = new URLSearchParams(search).get('id');
            setIsLoading(true);
            getGeocodingAndWeatherData(id);
        } catch (err) {
            console.log(err);
        }
    }, [search]);
    return (
        <Page>
            {
                isLoading ?
                    <LoadingMessage/> :
                    <WeatherPageContainer locationName={locationName} weatherData={weatherData}/>
            }
        </Page>
    )
};
