import React, {useState, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CurrentWeatherCard from "./current.weather.card";
import Message from "./message";
import LoadingMessage from "./loading.message";
import PATHS from "../routes/paths";
import {getLocationName} from "../services/open_meteo_api/utils";
import {createWeatherPageSearchParams, getGeocodingAndWeatherData} from "./utils";
import {CurrentWeatherData} from "../services/api";

type AllCurrentWeatherData = {
    name: string;
    data: CurrentWeatherData;
};

export default function SavedLocations({locationId}): React.ReactElement {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [savedCurrentWeatherData, setSavedCurrentWeatherData] = useState<
        AllCurrentWeatherData | any
    >({});

    //Get location name and weather data for each saved location
    //Currently, only one saved location is allowed, but it is set up to allow more
    useEffect(() => {
        const setData = async () => {
            try {
                setIsLoading(true);
                const allData = await getGeocodingAndWeatherData(locationId);
                if (allData.geocodingData) {
                    setSavedCurrentWeatherData({
                        data: allData.weatherData?.current_weather,
                        name: getLocationName(allData.geocodingData),
                    });
                }
            } catch (err) {
                console.log(err);
                setHasError(true)
            } finally {
                setIsLoading(false);
            }
        };

        setData();
    }, [locationId]);

    function ErrorMessage() {
        return <Message value="Data could not be loaded."/>
    }

    return (
        <Box
            alignContent='center'
            justifyContent='center'
            display='inline'
            margin='1em'
            id='saved-locations'>
            <Typography variant='h6' sx={{paddingBottom: "1em"}} textAlign='center'>
                Saved location
            </Typography>
            {isLoading ? (
                    <LoadingMessage/>
                ) :
                hasError ? <ErrorMessage/>
                    :
                    (
                        <>
                            {["name", "data"].every((k) => k in savedCurrentWeatherData) && (
                                <Box padding='0.5em'>
                                    <Link
                                        style={{textDecoration: "none"}}
                                        to={{
                                            pathname: PATHS.WEATHER,
                                            search: createWeatherPageSearchParams(locationId).toString(),
                                        }}>
                                        <CurrentWeatherCard
                                            locationName={savedCurrentWeatherData.name}
                                            currentWeatherData={savedCurrentWeatherData.data}
                                        />
                                    </Link>
                                </Box>
                            )}
                        </>
                    )}
        </Box>
    );
}
