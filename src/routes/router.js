import React from "react";
import {createBrowserRouter} from "react-router-dom";
import WeatherPage from '../pages/weather.page';
import LocationResultsPage from '../pages/location.results.page';
import PATHS from './paths';

const router = createBrowserRouter([
    {
        path: PATHS.INDEX,
        element: <div>Hello world!</div>, //Change to index page
    },
    {
        path: PATHS.ABOUT,
        element: <div>TODO</div>
    },
    {
        path: PATHS.RESULTS,
        element: <LocationResultsPage/>
    },
    {
        path: PATHS.WEATHER,
        element: <WeatherPage/>
    },
]);

export default router;
