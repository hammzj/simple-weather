import WeatherViewContainer from '../../../src/components/weather.view.container';
import {DateTime} from "luxon";
import {NOT_AVAILABLE_TEXT} from "../../../src/components/constants";

describe(WeatherViewContainer.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
        cy.get(`@weatherData`).then(weatherData => {
            cy.mount(<WeatherViewContainer weatherData={weatherData}/>);
        });
    });

    it('defaults to "Hourly" data', function () {
        cy.contains(`[role="tab"]`, 'Hourly').should('have.attr', 'aria-selected', "true");
    });

    it('displays "Hourly" data when selected', function () {
        cy.contains(`[role="tab"]`, 'Hourly').click();

        cy.get(`[id="hourly-weather-summary-accordion"]`).should('have.lengthOf', 25);
        cy.get(`[id="daily-weather-summary-accordion"]`).should('not.exist');
        //TODO: page/component object function
        cy.get(`@weatherData`).then(weatherData => {
            const {hourly_weather} = weatherData;
            for (const [i, {mapped}] of hourly_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATETIME_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                cy.get(`[id="hourly-weather-summary-accordion"]`).eq(i).as('accordion');
                cy.get(`@accordion`).find('#time').should('have.text', time);
                cy.get(`@accordion`).find('#temperature').should('have.text', mapped.temperature);
                cy.get(`@accordion`).find('#weather-icon').find('svg').should('exist');
                cy.get(`@accordion`).find('#precipitation').should('have.text', precipitationProbability);
                cy.wait(50);
            }
        });
    });

    it('displays "Daily" data when selected', function () {
        cy.contains(`[role="tab"]`, 'Daily').click();

        cy.get(`[id="daily-weather-summary-accordion"]`).should('have.lengthOf', 7);
        cy.get(`[id="hourly-weather-summary-accordion"`).should('not.exist');

        cy.get(`@weatherData`).then(weatherData => {
            const {daily_weather} = weatherData;
            for (const [i, {mapped}] of daily_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATE_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                cy.get(`[id="daily-weather-summary-accordion"]`).eq(i).as('accordion');
                cy.get(`@accordion`).find('#time').should('have.text', time);
                cy.get(`@accordion`).find('#temperature').should('have.text', mapped.temperature);
                cy.get(`@accordion`).find('#weather-icon').find('svg').should('exist');
                cy.get(`@accordion`).find('#precipitation').should('have.text', precipitationProbability);
            }
        });
    });
});
