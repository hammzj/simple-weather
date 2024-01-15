import CypressPageObject from "@hammzj/cypress-page-object";
import WeatherIconObject from "./weather.icon.object";
import PrecipitationChanceObject from "./precipitation.chance.object";

const { ComponentObject } = CypressPageObject;

export default class CurrentWeatherCardObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#current-weather`));
    }

    get location() {
        return this.container.find(`#location`);
    }

    get temperature() {
        return this.container.find(`#temperature`);
    }

    get temperatureRange() {
        return this.container.find(`#temperature-range`);
    }

    WeatherIconObject(fn) {
        this._nestedObject(this.container, new WeatherIconObject(), fn);
    }

    PrecipitationChanceObject(fn) {
        this._nestedObject(this.container, new PrecipitationChanceObject(), fn);
    }

    get time() {
        return this.container.find(`#last-updated-time`);
    }
}
