// React 16, 17
import {mount} from 'cypress/react18'
import {MemoryRouter} from 'react-router-dom'
import {OpenMeteoWeatherForecastAPI} from "../../src/services/open_meteo_api";
import SimpleWeatherAPI from "../../src/services/api";


Cypress.Commands.add('mount', (component, options = {}) => {
    const {routerProps = {initialEntries: ['/']}, ...mountOptions} = options
    const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>

    // Wrap any parent components needed
    // ie: return mount(<MyProvider>{component}</MyProvider>, options)
    return mount(wrapped, mountOptions);
});

Cypress.Commands.add('stubAndAliasWeatherData', ({
                                                     coordinatesFixture = 'coordinates.json',
                                                     fetchWeatherResponseFixture
                                                 }, alias = 'weatherData') => {
    cy.fixture(`/open_meteo_api/forecast_api/${fetchWeatherResponseFixture}`)
        .then(fetchWeatherResponseFixture => {
            cy.fixture(`/open_meteo_api/forecast_api/${coordinatesFixture}`)
                .then(coordinatesFixture => {
                    cy.stub(OpenMeteoWeatherForecastAPI, 'fetchAllWeatherForLocation').returns(fetchWeatherResponseFixture);
                    cy.wrap(SimpleWeatherAPI.getWeather(coordinatesFixture)).as(alias);
                });
        });
});

Cypress.Commands.add("setValue", {prevSubject: true}, function (subject, text, opts = {}) {
    cy.wrap(subject).clear();
    cy.wrap(subject).type(text, opts);
});
