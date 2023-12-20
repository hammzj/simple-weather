import React from "react";
import {createBrowserRouter} from "react-router-dom";
import PATHS from "./paths";
import IndexPage from "../pages/index.page";
import WeatherPage from "../pages/weather.page";
import LocationResultsPage from "../pages/location.results.page";
import ErrorPage from "../pages/error.page";

const router = createBrowserRouter([
    {
        path: PATHS.INDEX,
        element: <IndexPage/>,
    },
    {
        path: PATHS.ABOUT,
        element: <div>TODO: add text here</div>
    },
    {
        path: PATHS.RESULTS,
        element: <LocationResultsPage/>,
    },
    {
        path: PATHS.WEATHER,
        element: <WeatherPage/>,
    },
    {
        path: PATHS.WILDCARD,
        element: <ErrorPage/>,
    },
]);

export default router;
