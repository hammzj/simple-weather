import PageObject from "./page.object";
import LocationSearchFormObject from "../components/location.search.form.object";
import CurrentWeatherCardObject from "../components/current.weather.card.object";
import WeatherViewContainerObject from "../components/weather.view.container.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class WeatherPageObject extends PageObject {
    constructor() {
        super(`/weather`);
    }

    TopNavBarObject(fn) {
        this.container.within(() => fn(new TopNavBarObject()));
    }

    BottomNavBarObject(fn) {
        this.container.within(() => fn(new BottomNavBarObject()));
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

