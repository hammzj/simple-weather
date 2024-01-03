import React from "react";
import {createBrowserRouter, createHashRouter} from "react-router-dom";
import PATHS from "./paths";
import AboutPage from "../pages/about.page";
import ErrorPage from "../pages/error.page";
import IndexPage from "../pages/index.page";
import LocationResultsPage from "../pages/location.results.page";
import WeatherPage from "../pages/weather.page";

//When deployed on GitHub pages, we need to use createHashRouter
const routerCreator = (process.env.USE_GITHUB_PAGES) ? createHashRouter : createBrowserRouter;

const router = routerCreator([
    {
        path: PATHS.INDEX,
        element: <IndexPage/>,
    },
    {
        path: PATHS.ABOUT,
        element: <AboutPage/>
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
        element: <ErrorPage/>
    }
]);

export default router;
