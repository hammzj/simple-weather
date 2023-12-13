import CurrentWeatherCardObject from "../components/current.weather.card.object";
import WeatherViewContainerObject from "../components/weather.view.container.object";
import PageObject from "./page.object";

export default class WeatherPageObject extends PageObject {
    constructor() {
        super();
    }

    CurrentWeatherCardObject(fn) {
        this.container.within(() => fn(new CurrentWeatherCardObject()));
    }

    WeatherViewContainerObject(fn) {
        this.container.within(() => fn(new WeatherViewContainerObject()));
    }

}

