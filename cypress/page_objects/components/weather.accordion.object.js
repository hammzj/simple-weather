import { ComponentObject } from "@hammzj/cypress-page-object";
import WeatherIconObject from "./weather.icon.object";
import PrecipitationChanceObject from "./precipitation.chance.object";
import AdditionalWeatherDetailsObject from "./additional.weather.details.object";

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
        this.addElements = {
            summary: () => this.container().find(`.MuiAccordionSummary-root`),
            time: () => this.elements.summary().find(`#time`),
            temperature: () => this.elements.summary().find(`#temperature`),
            details: () => this.container().find(`.MuiAccordionDetails-root`),
        };
        this.addComponents = {
            WeatherIconObject: (fn) => {
                this.performWithin(this.elements.summary(), new WeatherIconObject(), fn);
            },
            PrecipitationChanceObject: (fn) => {
                this.performWithin(this.elements.summary(), new PrecipitationChanceObject(), fn);
            },
            AdditionalWeatherDetailsObject: (fn) => {
                this.performWithin(
                    this.elements.details(),
                    new AdditionalWeatherDetailsObject(),
                    fn
                );
            },
        };
    }
}
