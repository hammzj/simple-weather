import CypressPageObject from "@hammzj/cypress-page-object";
import WeatherIconObject from "./weather.icon.object";
import PrecipitationChanceObject from "./precipitation.chance.object";
import AdditionalWeatherDetailsObject from "./additional.weather.details.object";

const { ComponentObject } = CypressPageObject;

export default class WeatherAccordionObject extends ComponentObject {
    constructor(type) {
        super();
        this._type = type;
        this._baseContainerFn = () => {
            if (this._type) {
                return cy.get(`[id="${this._type}-weather-summary-accordion"]`);
            } else {
                return cy.get(`[id^="-weather-summary-accordion"]`);
            }
        };
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
        this._nestedObject(this.summary, new WeatherIconObject(), fn);
    }

    PrecipitationChanceObject(fn) {
        this._nestedObject(this.summary, new PrecipitationChanceObject(), fn);
    }

    get details() {
        return this.container.find(`.MuiAccordionDetails-root`);
    }

    AdditionalWeatherDetailsObject(fn) {
        this._nestedObject(this.details, new AdditionalWeatherDetailsObject(), fn);
    }
}
