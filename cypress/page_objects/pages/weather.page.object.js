import PageObject from "./page.object";
import LocationSearchFormObject from "../components/location.search.form.object";
import CurrentWeatherCardObject from "../components/current.weather.card.object";
import WeatherViewContainerObject from "../components/weather.view.container.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import SavedLocationCheckboxObject from "../components/saved.location.checkbox.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class WeatherPageObject extends PageObject {
    constructor() {
        super({ path: `/weather` });
        this.addComponents = {
            TopNavBarObject: (fn) => {
                this.performWithin(this.container(), new TopNavBarObject(), fn);
            },
            BottomNavBarObject: (fn) => {
                this.performWithin(this.container(), new BottomNavBarObject(), fn);
            },
            CurrentWeatherCardObject: (fn) => {
                this.performWithin(this.container(), new CurrentWeatherCardObject(), fn);
            },
            SavedLocationCheckboxObject: (fn) => {
                this.performWithin(this.container(), new SavedLocationCheckboxObject(), fn);
            },
            WeatherViewContainerObject: (fn) => {
                this.performWithin(this.container(), new WeatherViewContainerObject(), fn);
            },
        };
    }
}
