import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import PATHS from "./routes/paths";
import WeatherPage from "./pages/weather.page";
import LocationResultsPage from "./pages/location.results.page";
import IndexPage from "./pages/index.page";

function App() {
    return (
        <>
            <BrowserRouter basename={PATHS.INDEX}>
                <Switch>
                    <Route path={PATHS.INDEX} component={IndexPage}/>
                    <Route path={PATHS.ABOUT} component={<div>TODO</div>}/>
                    <Route path={PATHS.WEATHER} component={WeatherPage}/>
                    <Route path={PATHS.RESULTS} component={LocationResultsPage}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
