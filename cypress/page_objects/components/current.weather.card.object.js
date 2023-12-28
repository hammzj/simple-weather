import ElementCollection from "../element.collection";
import WeatherIconObject from "./weather.icon.object";
import PrecipitationChanceObject from "./precipitation.chance.object";

export default class CurrentWeatherCardObject extends ElementCollection {
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
        this.container.within(() => fn(new WeatherIconObject()));
    }

    PrecipitationChanceObject(fn) {
        this.container.within(() => fn(new PrecipitationChanceObject()));
    }

    get time() {
        return this.container.find(`#last-updated-time`);
    }


}

