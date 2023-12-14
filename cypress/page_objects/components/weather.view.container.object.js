import ElementCollection from "../element.collection";
import WeatherSummaryAccordionObject from "./weather.summary.accordion.object";

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

    HourlyWeatherSummaryAccordionObject(fn) {
        return this.weatherTabPanelHourly.within(() => fn(new WeatherSummaryAccordionObject('hourly')))
    }

    DailyWeatherSummaryAccordionObject(fn) {
        return this.weatherTabPanelDaily.within(() => fn(new WeatherSummaryAccordionObject('daily')))
    }
}