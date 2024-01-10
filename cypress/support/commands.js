// React 16, 17
import {mount} from 'cypress/react18'
import {MemoryRouter} from 'react-router-dom'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {OpenMeteoWeatherForecastAPI} from "../../src/services/open_meteo_api";
import SimpleWeatherAPI from "../../src/services/api";
import {lightTheme as baseTheme} from "../../src/theme";

Cypress.Commands.add('mount', (component, options = {}) => {
    const {routerProps = {initialEntries: ['/']}, theme, ...mountOptions} = options;
    //Default to base theme if not given
    const wrapped = (
        <MemoryRouter {...routerProps}>
            <ThemeProvider theme={theme ?? baseTheme}>
                <CssBaseline/>
                {component}
            </ThemeProvider>
        </MemoryRouter>
    );

    // Wrap any parent components needed
    // ie: return mount(<MyProvider>{component}</MyProvider>, options)
    return mount(wrapped, mountOptions);
});

/**
 * coordinatesFixture {string}
 * fetchWeatherResponseFixture {string}
 * alias {string="weatherData"} outputs the aliased "SimpleWeatherAPI.getWeather" call as "@{alias}"
 * Stubs the Open-Meteo weather forecast API and relies on the SimpleWeatherAPI to transform the response into usable data
 */
Cypress.Commands.add('stubAndAliasWeatherData', ({
                                                     coordinatesFixture = 'coordinates.json',
                                                     fetchWeatherResponseFixture
                                                 }, alias = 'weatherData') => {
    cy.fixture(`/open_meteo_api/forecast_api/${fetchWeatherResponseFixture}`)
        .then(fetchWeatherResponseFixture => {
            cy.fixture(`/open_meteo_api/forecast_api/${coordinatesFixture}`)
                .then(coordinatesFixture => {
                    cy.stub(OpenMeteoWeatherForecastAPI, 'fetchAllWeatherForLocation').returns(fetchWeatherResponseFixture);
                    cy.intercept(`*/forecast*`, fetchWeatherResponseFixture).as('fetchAllWeatherForLocation');
                    cy.wrap(SimpleWeatherAPI.getWeather(coordinatesFixture)).as(alias);
                });
        });
});

Cypress.Commands.add("setValue", {prevSubject: true}, function (subject, text, opts = {}) {
    cy.wrap(subject).clear();
    cy.wrap(subject).type(text, opts);
});

Cypress.Commands.add("toggleCheckbox", {prevSubject: true}, function (subject, check) {
    check ? cy.wrap(subject).check({force: true}) : cy.wrap(subject).uncheck({force: true});
});

Cypress.Commands.add("assertLocalStorageItem", {prevSubject: false}, function (url, key, value, expectation = true) {
    cy.getAllLocalStorage().then(result => {
        cy.wrap(result[url][key]).should(expectation ? 'eq' : 'not.eq', value);
    });
});
