import React from "react";
import {createHashRouter} from "react-router-dom";
import PATHS from "./paths";
import AboutPage from "../pages/about.page";
import ErrorPage from "../pages/error.page";
import IndexPage from "../pages/index.page";
import LocationResultsPage from "../pages/location.results.page";
import WeatherPage from "../pages/weather.page";

/*
Using createHashRouter for GitHub Pages deployment.
This will be adjusted if it's ever deployed to an actual domain.
@see https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
@see https://reactrouter.com/en/main/routers/create-hash-router
 */
const routerCreator = createHashRouter;

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
