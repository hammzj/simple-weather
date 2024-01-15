import CypressPageObject from "@hammzj/cypress-page-object";
import WeatherAccordionObject from "./weather.accordion.object";

const { ComponentObject } = CypressPageObject;

export default class WeatherViewContainerObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#weather-view`));
    }

    get hourlyButton() {
        return this.container.contains(`[role="tab"]`, "Hourly");
    }

    get dailyButton() {
        return this.container.contains(`[role="tab"]`, "Daily");
    }

    get weatherTabPanelHourly() {
        return this.container.find(`#tabpanel-hourly`);
    }

    get weatherTabPanelDaily() {
        return this.container.find(`#tabpanel-daily`);
    }

    HourlyWeatherAccordionObject(fn) {
        this._nestedObject(this.weatherTabPanelHourly, new WeatherAccordionObject("hourly"), fn);
    }

    DailyWeatherAccordionObject(fn) {
        this._nestedObject(this.weatherTabPanelDaily, new WeatherAccordionObject("daily"), fn);
    }
}
