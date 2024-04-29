import { ComponentObject } from "@hammzj/cypress-page-object";
import WeatherIconObject from "./weather.icon.object";
import PrecipitationChanceObject from "./precipitation.chance.object";

export default class CurrentWeatherCardObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`[id="current-weather"]`));
        this.addElements = {
            location: () => this.container().find(`#location`),
            temperature: () => this.container().find(`#temperature`),
            temperatureRange: () => this.container().find(`#temperature-range`),
            time: () => this.container().find(`#last-updated-time`),
        };
        this.addComponents = {
            WeatherIconObject: (fn) => {
                this.performWithin(this.container(), new WeatherIconObject(), fn);
            },
            PrecipitationChanceObject: (fn) => {
                this.performWithin(this.container(), new PrecipitationChanceObject(), fn);
            },
        };
    }
}
