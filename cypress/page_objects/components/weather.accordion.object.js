import ElementCollection from "../element.collection";
import WeatherIconObject from "./weather.icon.object";
import PrecipitationChanceObject from "./precipitation.chance.object";
import AdditionalWeatherDetailsObject from "./additional.weather.details.object";

export default class WeatherAccordionObject extends ElementCollection {
    constructor(type) {
        super();
        this._type = type;
        this._baseContainerFn = () => {
            if (this._type) {
                return cy.get(`[id="${this._type}-weather-summary-accordion"]`);
            } else {
                return cy.get(`[id^="-weather-summary-accordion"]`);
            }
        }
    }

    get summary() {
        return this.container.find(`.MuiAccordionSummary-root`);
    }

    get time() {
        return this.summary.find(`#time`);
    }

    get temperature() {
        return this.summary.find(`#temperature`);
    }

    WeatherIconObject(fn) {
        this.summary.within(() => fn(new WeatherIconObject()));
    }

    PrecipitationChanceObject(fn) {
        this.summary.within(() => fn(new PrecipitationChanceObject()));
    }

    get details() {
        return this.container.find(`.MuiAccordionDetails-root`);
    }

    AdditionalWeatherDetailsObject(fn) {
        this.details.within(() => fn(new AdditionalWeatherDetailsObject()));
    }
}
