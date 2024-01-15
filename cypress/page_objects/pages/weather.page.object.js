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
        this._nestedObject(this.container, new TopNavBarObject(), fn);
    }

    BottomNavBarObject(fn) {
        this._nestedObject(this.container, new BottomNavBarObject(), fn);
    }

    LocationSearchFormObject(fn) {
        this._nestedObject(this.container, new LocationSearchFormObject(), fn);
    }

    CurrentWeatherCardObject(fn) {
        this._nestedObject(this.container, new CurrentWeatherCardObject(), fn);
    }

    WeatherViewContainerObject(fn) {
        this._nestedObject(this.container, new WeatherViewContainerObject(), fn);
    }
}
