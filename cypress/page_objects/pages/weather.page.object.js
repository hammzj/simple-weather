import PageObject from "./page.object";
import LocationSearchFormObject from "../components/location.search.form.object";
import CurrentWeatherCardObject from "../components/current.weather.card.object";
import WeatherViewContainerObject from "../components/weather.view.container.object";

export default class WeatherPageObject extends PageObject {
    constructor() {
        super(`/weather`);
    }

    LocationSearchFormObject(fn) {
        this.container.within(() => fn(new LocationSearchFormObject()));
    }

    CurrentWeatherCardObject(fn) {
        this.container.within(() => fn(new CurrentWeatherCardObject()));
    }

    WeatherViewContainerObject(fn) {
        this.container.within(() => fn(new WeatherViewContainerObject()));
    }

}

