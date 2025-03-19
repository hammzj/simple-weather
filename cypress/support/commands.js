import { OpenMeteoWeatherForecastAPI } from "../../src/services/open_meteo_api";
import SimpleWeatherAPI from "../../src/services/api";

/**
 * coordinatesFixture {string}
 * fetchWeatherResponseFixture {string}
 * alias {string="weatherData"} outputs the aliased "SimpleWeatherAPI.getWeather" call as "@{alias}"
 * Stubs the Open-Meteo weather forecast API and relies on the SimpleWeatherAPI to transform the response into usable data
 */
Cypress.Commands.add(
    "stubAndAliasWeatherData",
    (
        { coordinatesFixture = "coordinates.berlin.json", fetchWeatherResponseFixture },
        alias = "weatherData"
    ) => {
        cy.fixture(`/open_meteo_api/forecast_api/${fetchWeatherResponseFixture}`).then(
            (fetchWeatherResponseFixture) => {
                cy.stub(OpenMeteoWeatherForecastAPI, "fetchAllWeatherForLocation").returns(
                    fetchWeatherResponseFixture
                );
                cy.intercept(`*/forecast*`, fetchWeatherResponseFixture).as(
                    "fetchAllWeatherForLocation"
                );
                cy.fixture(`/open_meteo_api/forecast_api/${coordinatesFixture}`).then(
                    (coordinatesFixture) => {
                        cy.wrap(SimpleWeatherAPI.getWeather(coordinatesFixture)).as(alias);
                    }
                );
            }
        );
    }
);

Cypress.Commands.add("setValue", { prevSubject: true }, function (subject, text, opts = {}) {
    cy.wrap(subject).clear();
    cy.wrap(subject).type(text, opts);
});

Cypress.Commands.add("toggleCheckbox", { prevSubject: true }, function (subject, check) {
    check ? cy.wrap(subject).check({ force: true }) : cy.wrap(subject).uncheck({ force: true });
});

Cypress.Commands.add(
    "assertLocalStorageItem",
    { prevSubject: false },
    function (url, key, value, expectation = true) {
        cy.getAllLocalStorage().then((result) => {
            cy.wrap(result[url][key]).should(expectation ? "eq" : "not.eq", value);
        });
    }
);

//Needed for testing local storage items
Cypress.Commands.add("getBaseUrlOrigin", { prevSubject: false }, function () {
    return new URL(Cypress.config().baseUrl).origin.toString();
});
