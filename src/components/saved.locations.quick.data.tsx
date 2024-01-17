import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CurrentWeatherCard from "./current.weather.card";
import SimpleWeatherAPI from "../services/api";
import { OpenMeteoGeocodingAPI } from "../services/open_meteo_api";
import {
    PrecipitationUnit,
    TemperatureUnit,
    WindSpeedUnit,
} from "../services/open_meteo_api/forecast_api";
import PATHS from "../routes/paths";
import { getLocationName } from "../services/open_meteo_api/utils";
import { createWeatherPageSearchParams } from "./utils";
import { DateTime } from "luxon";
//import {SAVED_LOCATION_MAX_LENGTH} from "../constants";

// type AllCurrentWeatherData = {
//     id: string | number;
//     name: string;
//     data: CurrentWeatherData;
// }[]

export default function SavedLocationsQuickData({ locationIds }): React.ReactElement {
    const [allCurrentWeatherData, setAllCurrentWeatherData] = useState([]);

    //Get location name and weather data for each saved location
    //Currently, only one saved location is allowed, but it is set up to allow more
    useEffect(() => {
        const getGeocodingAndWeatherDataForAllCurrentWeatherData = async (locationId) => {
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
                    const systemTimezone = DateTime.local().zoneName || "auto";
                    return await SimpleWeatherAPI.getWeather(
                        [latitude, longitude],
                        systemTimezone,
                        opts
                    );
                } catch (err) {
                    console.error(err);
                }
            };

            const locationData = await requestLocationData(locationId);
            if (locationData) {
                const { latitude, longitude } = locationData;
                if (latitude && longitude) {
                    const data = await requestWeatherData([latitude, longitude]);
                    allCurrentWeatherData.push({
                        id: locationId,
                        name: getLocationName(locationData),
                        data: data.current_weather,
                    });
                    setAllCurrentWeatherData(allCurrentWeatherData);
                    console.log("allCurrentWeatherData", allCurrentWeatherData);
                }
            }
        };

        try {
            setAllCurrentWeatherData([]);
            //Safety check to not allow more than the max in the case a user manipulates local storage
            locationIds
                //.slice(0, SAVED_LOCATION_MAX_LENGTH)
                .map(getGeocodingAndWeatherDataForAllCurrentWeatherData);
        } catch (err) {
            console.log(err);
        }
    }, [locationIds]);

    return (
        <Box alignContent='center' justifyContent='center' padding='2em'>
            <Typography variant='h6' sx={{ paddingBottom: "1em" }}>
                Saved location
            </Typography>
            {["id", "name", "data"].every((k) => k in allCurrentWeatherData) && (
                <Box padding='0.5em'>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={{
                            pathname: PATHS.WEATHER,
                            search: createWeatherPageSearchParams(allCurrentWeatherData.id),
                        }}>
                        <CurrentWeatherCard
                            locationName={allCurrentWeatherData.name}
                            currentWeatherData={allCurrentWeatherData.data}
                        />
                    </Link>
                </Box>
            )}
        </Box>
    );
}
