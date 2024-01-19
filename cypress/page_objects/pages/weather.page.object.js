import PageObject from "./page.object";
import LocationSearchFormObject from "../components/location.search.form.object";
import CurrentWeatherCardObject from "../components/current.weather.card.object";
import WeatherViewContainerObject from "../components/weather.view.container.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import SavedLocationCheckboxObject from "../components/saved.location.checkbox.object";
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

    CurrentWeatherCardObject(fn) {
        this._nestedObject(this.container, new CurrentWeatherCardObject(), fn);
    }

    SavedLocationCheckboxObject(fn) {
        this._nestedObject(this.container, new SavedLocationCheckboxObject(), fn);
    }

    WeatherViewContainerObject(fn) {
        this._nestedObject(this.container, new WeatherViewContainerObject(), fn);
    }
}
