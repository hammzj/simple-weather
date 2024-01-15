import WeatherPage from "../../../src/pages/weather.page";
import LocationResultsPageObject from "../../page_objects/pages/location.results.page.object";
import WeatherPageObject from "../../page_objects/pages/weather.page.object";
import { getThroughAppToWeatherPage } from "../utils";
import { getLocationName } from "../../../src/services/open_meteo_api/utils";

const locationResultsPageObject = new LocationResultsPageObject();
const weatherPageObject = new WeatherPageObject();

describe(WeatherPage.name, function () {
    beforeEach(function () {
        //Avoid Initial call at all times
        cy.intercept(`*open-meteo*`).as("openMeteo");

        //Stub location data results
        cy.fixture("/open_meteo_api/geocoding_api/search.for.locations.200.berlin").as(
            "locationDataResults"
        );
        cy.get(`@locationDataResults`).then((locationDataResults) => {
            cy.intercept(`*/search*`, locationDataResults).as(`searchForLocations`);
            const individualLocation = locationDataResults.results[0];
            cy.wrap(individualLocation).as(`individualLocation`);
        });
    });

    context("Provided with correct data", function () {
        beforeEach(function () {
            //Stub weather data
            cy.fixture("/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json").as(
                "fetchAllWeatherForLocationData"
            );
            cy.stubAndAliasWeatherData({
                fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.json",
            });

            cy.get("@individualLocation").then((individualLocation) => {
                getThroughAppToWeatherPage(individualLocation.name, 0);
            });
        });

        it("renders correctly when all necessary data is provided", function () {
            cy.get("@weatherData").then((weatherData) => {
                cy.get("@individualLocation").then((individualLocation) => {
                    //Assert
                    weatherPageObject.container.should(
                        "not.have.text",
                        "An error occurred when loading the data."
                    );
                    weatherPageObject.TopNavBarObject((tnbo) => {
                        tnbo.container.should("exist");
                        tnbo.LocationSearchFormObject((lsfo) => lsfo.container.should("exist"));
                    });
                    weatherPageObject.BottomNavBarObject((bnvo) => {
                        bnvo.container.should("exist");
                    });
                    weatherPageObject.CurrentWeatherCardObject((cwco) => {
                        cwco.container.should("exist");
                        cwco.location.should("have.text", getLocationName(individualLocation));
                        cwco.temperature.should(
                            "have.text",
                            weatherData.current_weather.mapped.temperature
                        );
                    });
                    weatherPageObject.WeatherViewContainerObject((wvco) => {
                        wvco.container.should("exist");

                        wvco.hourlyButton.click();
                        wvco.HourlyWeatherAccordionObject((obj) =>
                            obj.getAllContainers().should("have.lengthOf", 25)
                        );

                        wvco.dailyButton.click();
                        wvco.DailyWeatherAccordionObject((obj) =>
                            obj.getAllContainers().should("have.lengthOf", 7)
                        );
                    });
                });
            });
        });

        it("allows to search for a new location", function () {
            cy.fixture("/open_meteo_api/geocoding_api/search.for.locations.200.raleigh").as(
                "newLocationDataResults"
            );
            cy.get(`@locationDataResults`).then((locationDataResults) => {
                cy.get(`@newLocationDataResults`).then((newLocationDataResults) => {
                    //Arrange: intercept the search and return different results
                    cy.intercept(`*/search*`, newLocationDataResults).as(`searchForLocations`);
                    const oldLocationData = locationDataResults.results[0];
                    const newLocationData = newLocationDataResults.results[0];
                    //Arrange: make sure the page displays a different name than the new search.
                    ////Redundant check but good for sanity
                    weatherPageObject.container.should(
                        "contain.text",
                        getLocationName(oldLocationData)
                    );

                    //Action: search for new location
                    weatherPageObject.TopNavBarObject((navBar) => {
                        navBar.LocationSearchFormObject(function (locationSearchFormObject) {
                            locationSearchFormObject._search(newLocationData.name);
                            cy.wait(1000);
                        });
                    });

                    //Assert: Check the first button exists
                    //cy.location('pathname').should('include', locationResultsPageObject._path);
                    cy.hash().should("include", locationResultsPageObject._path);
                    locationResultsPageObject.LocationButtonsListObject((list) => {
                        list._assertButtonText(getLocationName(newLocationData));
                    });
                });
            });
        });
    });

    context("Error handling", function () {
        it("displays a warning message when not provided any weather data", function () {
            //Arrange: return nothing for forecast
            cy.intercept(`*/forecast*`, []).as("fetchAllWeatherForLocation");

            //Action: return nothing for weather data
            //Action: Go to WeatherPage through search results
            cy.get("@individualLocation").then((individualLocation) => {
                getThroughAppToWeatherPage(individualLocation.name, 0);
            });

            //Assert
            weatherPageObject.CurrentWeatherCardObject((cwco) =>
                cwco.getAllContainers().should("not.exist")
            );
            cy.get(".MuiTypography-root").should(
                "contain.text",
                "An error occurred when loading the data."
            );
        });

        it("displays a warning message when not provided any location data", function () {
            //Action: Go directly to the weather page without giving an ID
            cy.visit(weatherPageObject.url());

            //Assert
            cy.get(".MuiTypography-root").should(
                "contain.text",
                "An error occurred when loading the data."
            );
        });
    });
});
