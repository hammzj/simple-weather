import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
//import { DateTime } from "luxon";
import { Box, Divider, Stack } from "@mui/material";
import Page from "../components/page";
import Message from "../components/message";
import LoadingMessage from "../components/loading.message";
import CurrentWeatherCard from "../components/current.weather.card";
import WeatherViewContainer from "../components/weather.view.container";
import SavedLocationCheckbox from "../components/saved.location.checkbox";
import { getLocationName } from "../services/open_meteo_api/utils";
import SimpleWeatherAPI, { TotalWeatherData } from "../services/api";
import { OpenMeteoGeocodingAPI } from "../services/open_meteo_api";
import {
    PrecipitationUnit,
    TemperatureUnit,
    WindSpeedUnit,
} from "../services/open_meteo_api/forecast_api";

interface WeatherPageContainerProps {
    locationId: string | number | null;
    locationName: string;
    totalWeatherData: Record<string, never> | TotalWeatherData;
}

const ErrorMessage = () => {
    return <Message value='An error occurred when loading the data.' />;
};

const WeatherPageContainer = ({
    locationId,
    locationName,
    totalWeatherData = {},
}: WeatherPageContainerProps): React.ReactElement => {
    const { current_weather } = totalWeatherData;
    const hasNeededData = current_weather && locationName && !isEmpty(locationId);
    return (
        <Stack direction='column' padding={1}>
            {hasNeededData ? (
                <Box>
                    <CurrentWeatherCard
                        locationName={locationName}
                        currentWeatherData={current_weather}
                    />
                    <SavedLocationCheckbox locationId={locationId} />
                    <Divider />
                    <Box marginTop='1.5em'>
                        <WeatherViewContainer totalWeatherData={totalWeatherData} />
                    </Box>
                </Box>
            ) : (
                <ErrorMessage />
            )}
        </Stack>
    );
};

export default function WeatherPage(): React.ReactElement {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get("id");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [locationName, setLocationName] = useState("");
    const [totalWeatherData, setTotalWeatherData] = useState({});

    //Get location name and weather data
    useEffect(() => {
        const getGeocodingAndWeatherData = async (locationId) => {
            const requestLocationData = async (id) => {
                try {
                    const { data } = await OpenMeteoGeocodingAPI.getLocation(id);
                    return data;
                } catch (err) {
                    console.log(err);
                }
            };
            const requestWeatherData = async ([latitude, longitude]) => {
                try {
                    const opts = {
                        temperature_unit:
                            TemperatureUnit[
                                localStorage.getItem("temperatureUnit") ?? "fahrenheit"
                            ],
                        wind_speed_unit:
                            WindSpeedUnit[localStorage.getItem("windSpeedUnit") ?? "mph"],
                        precipitation_unit:
                            PrecipitationUnit[localStorage.getItem("precipitationUnit") ?? "inch"],
                    };
                    //const systemTimezone = DateTime.local().zoneName || "auto";
                    const systemTimezone = 'auto'
                    const data = await SimpleWeatherAPI.getWeather(
                        [latitude, longitude],
                        systemTimezone,
                        opts
                    );
                    //@ts-ignore
                    setTotalWeatherData(data);
                } catch (err) {
                    console.error(err);
                }
            };

            try {
                const locationData = await requestLocationData(locationId);
                if (locationData) {
                    const { latitude, longitude } = locationData;
                    //Used for the current weather to display the name
                    setLocationName(getLocationName(locationData));
                    if (latitude && longitude) {
                        await requestWeatherData([latitude, longitude]);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        try {
            setIsLoading(true);
            getGeocodingAndWeatherData(id);
        } catch (err) {
            console.log(err);
        }
    }, [search]);
    return (
        <Page>
            {isLoading ? (
                <LoadingMessage />
            ) : (
                <WeatherPageContainer
                    locationId={id}
                    locationName={locationName}
                    totalWeatherData={totalWeatherData}
                />
            )}
        </Page>
    );
}
