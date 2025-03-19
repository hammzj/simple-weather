import WeatherPage from "../../../src/pages/weather.page";
import IndexPageObject from "../../page_objects/pages/index.page.object";
import LocationResultsPageObject from "../../page_objects/pages/location.results.page.object";
import WeatherPageObject from "../../page_objects/pages/weather.page.object";
import { getThroughAppToWeatherPage } from "../utils";
import { getLocationName } from "../../../src/services/open_meteo_api/utils";

const indexPageObject = new IndexPageObject();
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
            cy.fixture(
                "/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.berlin.json"
            ).as("fetchAllWeatherForLocationData");
            cy.stubAndAliasWeatherData({
                fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
            });

            cy.get("@individualLocation").then((individualLocation) => {
                getThroughAppToWeatherPage(individualLocation.name, 0);
            });
        });

        it("renders correctly when all necessary data is provided", function () {
            cy.get("@weatherData").then((weatherData) => {
                cy.get("@individualLocation").then((individualLocation) => {
                    //Assert
                    weatherPageObject
                        .container()
                        .should("not.have.text", "An error occurred when loading the data.");
                    weatherPageObject.components.TopNavBarObject((tnbo) => {
                        tnbo.container().should("exist");
                        tnbo.components.LocationSearchFormObject((lsfo) =>
                            lsfo.container().should("exist")
                        );
                    });
                    weatherPageObject.components.BottomNavBarObject((bnvo) => {
                        bnvo.container().should("exist");
                    });
                    weatherPageObject.components.CurrentWeatherCardObject((cwco) => {
                        cwco.container().should("exist");
                        cwco.elements
                            .location()
                            .should("have.text", getLocationName(individualLocation));
                        cwco.elements
                            .temperature()
                            .should("have.text", weatherData.current_weather.mapped.temperature);
                    });
                    weatherPageObject.components.WeatherViewContainerObject((wvco) => {
                        wvco.elements.container().should("exist");

                        wvco.elements.hourlyButton().click();
                        wvco.components.HourlyWeatherAccordionObject((obj) =>
                            obj.getAllContainers().should("have.lengthOf", 25)
                        );

                        wvco.elements.dailyButton().click();
                        wvco.components.DailyWeatherAccordionObject((obj) =>
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
                    weatherPageObject
                        .container()
                        .should("contain.text", getLocationName(oldLocationData));

                    //Action: search for new location
                    weatherPageObject.components.TopNavBarObject((navBar) => {
                        navBar.components.LocationSearchFormObject(
                            function (locationSearchFormObject) {
                                locationSearchFormObject.search(newLocationData.name);
                                cy.wait(1000);
                            }
                        );
                    });

                    //Assert: Check the first button exists
                    //cy.location('pathname').should('include', locationResultsPageObject._path);
                    cy.hash().should("include", locationResultsPageObject.metadata.path);
                    locationResultsPageObject.components.LocationButtonsListObject((list) => {
                        list.assertButtonText(getLocationName(newLocationData));
                    });
                });
            });
        });

        context("Setting as a saved location", function () {
            it("saves the location to be able to view current weather from the index page", function () {
                //Arrange
                weatherPageObject.components.SavedLocationCheckboxObject((checkboxObject) => {
                    //Act
                    checkboxObject.elements.checkbox().toggleCheckbox(true);
                    checkboxObject.elements.checkbox().should("be.checked");
                });

                //Assert
                cy.get("@individualLocation").then((individualLocation) => {
                    cy.visit(indexPageObject.url());
                    indexPageObject.components.SavedLocationsObject((slo) => {
                        slo.assertExists();
                        slo.components.CurrentWeatherCardObject((cwco) => {
                            cwco.elements
                                .location()
                                .should("have.text", getLocationName(individualLocation));
                        });
                    });
                });
            });

            it("can be accessed from the index page", function () {
                //Arrange
                weatherPageObject.components.SavedLocationCheckboxObject((slco) => {
                    slco.elements.checkbox().toggleCheckbox(true);
                });

                //Act
                cy.visit(indexPageObject.url());
                indexPageObject.components.SavedLocationsObject((slo) => {
                    slo.components.CurrentWeatherCardObject((cwco) => cwco.container().click());
                });

                //Assert
                cy.get("@individualLocation").then((individualLocation) => {
                    weatherPageObject.components.CurrentWeatherCardObject((cwco) => {
                        cy.url().should("include", `?id=${individualLocation.id}`);
                        cwco.elements
                            .location()
                            .should("have.text", getLocationName(individualLocation));
                    });
                });
                weatherPageObject.components.SavedLocationCheckboxObject((checkboxObject) => {
                    checkboxObject.elements.checkbox().toggleCheckbox(true);
                    checkboxObject.elements.checkbox().should("be.checked");
                });
            });

            it("can be unchecked to remove the saved location", function () {
                //Arrange
                weatherPageObject.components.SavedLocationCheckboxObject((slco) => {
                    slco.elements.checkbox().toggleCheckbox(true);
                });
                cy.visit(indexPageObject.url());
                cy.get("@individualLocation").then((individualLocation) => {
                    cy.visit(indexPageObject.url());
                    indexPageObject.components.SavedLocationsObject((slo) => {
                        slo.components.CurrentWeatherCardObject((cwco) => {
                            cwco.elements
                                .location()
                                .should("have.text", getLocationName(individualLocation));

                            //Act
                            cwco.container().click();
                        });
                    });
                });
                weatherPageObject.components.SavedLocationCheckboxObject((slco) => {
                    slco.elements.checkbox().toggleCheckbox(false);
                    slco.elements.checkbox().should("not.be.checked");
                });
                cy.visit(indexPageObject.url());

                //Assert
                indexPageObject.components.SavedLocationsObject((slo) => {
                    slo.assertExists(false);
                });
            });

            specify("only one location can be saved at a time", function () {
                //Arrange
                weatherPageObject.components.SavedLocationCheckboxObject((slco) => {
                    slco.elements.checkbox().toggleCheckbox(true);
                });
                cy.visit(indexPageObject.url());
                cy.get("@individualLocation").then((individualLocation) => {
                    indexPageObject.components.SavedLocationsObject((slo) => {
                        slo.assertExists(true);
                        slo.components.CurrentWeatherCardObject((cwco) => {
                            cwco.elements
                                .location()
                                .should("have.text", getLocationName(individualLocation));
                        });
                    });
                });

                //Act
                //Restub with the alternate location response
                //Stub alternate location name
                cy.fixture(
                    "/open_meteo_api/geocoding_api/search.for.locations.200.raleigh.json"
                ).then((alternateLocationDataResults) => {
                    cy.intercept(`*/search*`, alternateLocationDataResults).as(
                        `searchForLocations`
                    );
                    const alternateIndividualLocation = alternateLocationDataResults.results[0];
                    cy.wrap(alternateIndividualLocation).as("alternateIndividualLocation");
                });
                cy.fixture(
                    "/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.raleigh.json"
                ).then((fetchWeatherResponseFixture) => {
                    cy.intercept(`*/forecast*`, fetchWeatherResponseFixture).as(
                        "fetchAllWeatherForLocation"
                    );
                });

                cy.get("@alternateIndividualLocation").then((alternateIndividualLocation) => {
                    getThroughAppToWeatherPage(alternateIndividualLocation.name, 0);

                    //Assert
                    //This is the weather page for the second location
                    weatherPageObject.components.CurrentWeatherCardObject((cwco) => {
                        cwco.elements
                            .location()
                            .should("have.text", getLocationName(alternateIndividualLocation));
                    });
                    weatherPageObject.components.SavedLocationCheckboxObject((slco) => {
                        slco.elements.checkbox().should("be.disabled");
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
            weatherPageObject.components.CurrentWeatherCardObject((cwco) =>
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
