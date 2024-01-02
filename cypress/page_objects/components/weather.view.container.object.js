import ElementCollection from "../element.collection";
import WeatherAccordionObject from "./weather.accordion.object";

export default class WeatherViewContainerObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`#weather-view`));
    }

    get hourlyButton() {
        return this.container.contains(`[role="tab"]`, 'Hourly');
    }

    get dailyButton() {
        return this.container.contains(`[role="tab"]`, 'Daily');
    }

    get weatherTabPanelHourly() {
        return this.container.find(`#tabpanel-hourly`);
    }

    get weatherTabPanelDaily() {
        return this.container.find(`#tabpanel-daily`);
    }

    HourlyWeatherAccordionObject(fn) {
        return this.weatherTabPanelHourly.within(() => fn(new WeatherAccordionObject('hourly')))
    }

    DailyWeatherAccordionObject(fn) {
        return this.weatherTabPanelDaily.within(() => fn(new WeatherAccordionObject('daily')))
    }
}
