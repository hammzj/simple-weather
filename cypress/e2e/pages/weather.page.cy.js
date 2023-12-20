import WeatherPage from '../../../src/pages/weather.page';
import IndexPageObject from '../../page_objects/pages/index.page.object';
import LocationResultsPageObject from '../../page_objects/pages/location.results.page.object';
import WeatherPageObject from '../../page_objects/pages/weather.page.object';
import {getLocationName} from "../../../src/services/open_meteo_api/utils";

const indexPageObject = new IndexPageObject();
const locationResultsPageObject = new LocationResultsPageObject();
const weatherPage = new WeatherPageObject();

describe(WeatherPage.name, function () {
    beforeEach(function () {
        //Avoid Initial call at all times
        cy.intercept(`*open-meteo*`).as('openMeteo');
    });

    context('Provided with correct data', function () {
        beforeEach(function () {
            cy.fixture('/open_meteo_api/geocoding_api/search.for.locations.200').as('locationDataResults');
            cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json').as('fetchAllWeatherForLocationData');
            cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});

            cy.get(`@fetchAllWeatherForLocationData`).then(fetchAllWeatherForLocationData => {
                cy.intercept(`*/forecast*`, fetchAllWeatherForLocationData).as('fetchAllWeatherForLocation');
            });
            cy.get(`@locationDataResults`).then(locationDataResults => {
                cy.intercept(`*/search*`, locationDataResults).as(`searchForLocations`);
                const locationData = locationDataResults.results[0];
                cy.wrap(locationData).as(`locationData`);
            });

            cy.get('@locationData').then(locationData => {
                cy.visit(Cypress.config().baseUrl);
                indexPageObject.LocationSearchFormObject(locationSearchFormObject => {
                    locationSearchFormObject._search(locationData.name);
                    cy.get(`[id="location-data-button"]`).eq(0).click();
                    //locationResultsPageObject._selectLocation(locationData); //Not working
                });
            });
        });

        it('renders correctly when all necessary data is provided', function () {
            cy.get('@weatherData').then(weatherData => {
                cy.get('@locationData').then(locationData => {
                    weatherPage.CurrentWeatherCardObject((cwco) => {
                        cwco.container.should('exist');
                        cwco.location.should('have.text', getLocationName(locationData));
                        cwco.temperature.should('have.text', weatherData.current_weather.mapped.temperature);
                    });
                    weatherPage.WeatherViewContainerObject((wvco) => {
                        wvco.container.should('exist');

                        wvco.hourlyButton.click();
                        wvco.HourlyWeatherSummaryAccordionObject((obj) => obj.container.should('have.lengthOf', 25));

                        wvco.dailyButton.click();
                        wvco.DailyWeatherSummaryAccordionObject((obj) => obj.container.should('have.lengthOf', 7));
                    });
                });
            });
        });
    });

    context('Error handling', function () {
        //TODO
        it('displays a warning message when not provided location data', function () {
            expect('one').to.be(1);
        });
    });
});


