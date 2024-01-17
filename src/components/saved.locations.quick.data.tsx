import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CurrentWeatherCard from "./current.weather.card";
import PATHS from "../routes/paths";
import { getLocationName } from "../services/open_meteo_api/utils";
import { createWeatherPageSearchParams, getGeocodingAndWeatherData } from "./utils";
import { CurrentWeatherData } from "../services/api";

type AllCurrentWeatherData = {
    name: string;
    data: CurrentWeatherData;
};

export default function SavedLocationsQuickData({ locationId }): React.ReactElement {
    const [savedCurrentWeatherData, setSavedCurrentWeatherData] = useState<
        AllCurrentWeatherData | object
    >({});

    //Get location name and weather data for each saved location
    //Currently, only one saved location is allowed, but it is set up to allow more
    useEffect(() => {
        try {
            getGeocodingAndWeatherData(locationId).then((allData) => {
                const currentWeatherData = { data: allData.weatherData?.current_weather };
                if (allData.geocodingData) {
                    currentWeatherData.name = getLocationName(allData.geocodingData);
                }
                setSavedCurrentWeatherData(currentWeatherData);
            });
        } catch (err) {
            console.log(err);
        }
    }, [locationId]);

    return (
        <Box alignContent='center' justifyContent='center' padding='2em'>
            <Typography variant='h6' sx={{ paddingBottom: "1em" }}>
                Saved location
            </Typography>
            {["name", "data"].every((k) => k in savedCurrentWeatherData) && (
                <Box padding='0.5em'>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={{
                            pathname: PATHS.WEATHER,
                            search: createWeatherPageSearchParams(locationId),
                        }}>
                        <CurrentWeatherCard
                            locationName={savedCurrentWeatherData.name}
                            currentWeatherData={savedCurrentWeatherData.data}
                        />
                    </Link>
                </Box>
            )}
        </Box>
    );
}
