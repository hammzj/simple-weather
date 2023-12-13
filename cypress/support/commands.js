// React 16, 17
import {mount} from 'cypress/react'
import {OpenMeteoWeatherForecastAPI} from "../../src/services/open_mateo_api";
import SimpleWeatherAPI from "../../src/services/api";

Cypress.Commands.add('mount', (component, options) => {
    // Wrap any parent components needed
    // ie: return mount(<MyProvider>{component}</MyProvider>, options)
    return mount(component, options);
});

Cypress.Commands.add('stubAndAliasWeatherData', ({
                                                         coordinatesFixture = 'coordinates.json',
                                                         fetchWeatherResponseFixture
                                                     }, alias = 'weatherData') => {
    cy.fixture(`/open_meteo_api/forecast_api/${fetchWeatherResponseFixture}`)
        .then(fetchWeatherResponseFixture => {
            cy.fixture(`/open_meteo_api/forecast_api/${coordinatesFixture}`)
                .then(coordinatesFixture => {
                    cy.stub(OpenMeteoWeatherForecastAPI, 'fetchAllWeatherForLocation').returns({data: fetchWeatherResponseFixture});
                    cy.wrap(SimpleWeatherAPI.getWeather(coordinatesFixture)).as(alias);
                });
        });
});
