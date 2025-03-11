import { ComponentObject } from "@hammzj/cypress-page-object";
import WeatherAccordionObject from "./weather.accordion.object";

export default class WeatherViewContainerObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#weather-view`));
        this.addElements = {
            hourlyButton: () => this.container().contains(`[role="tab"]`, "Hourly"),
            dailyButton: () => this.container().contains(`[role="tab"]`, "Daily"),
            weatherTabPanelHourly: () => this.container().find(`#tabpanel-hourly`),
            weatherTabPanelDaily: () => this.container().find(`#tabpanel-daily`),
        };
        this.addComponents = {
            HourlyWeatherAccordionObject: (fn) => {
                this.performWithin(
                    this.elements.weatherTabPanelHourly(),
                    new WeatherAccordionObject("hourly"),
                    fn
                );
            },
            DailyWeatherAccordionObject: (fn) => {
                this.performWithin(
                    this.elements.weatherTabPanelDaily(),
                    new WeatherAccordionObject("daily"),
                    fn
                );
            },
        };
    }
}
