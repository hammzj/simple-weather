import SettingsPage from "../../../src/pages/settings.page";
import SettingsPageObject from "../../page_objects/pages/settings.page.object";
import {
    TemperatureUnit,
    WindSpeedUnit,
    PrecipitationUnit,
} from "../../../src/services/open_meteo_api/forecast_api";
import { getThroughAppToWeatherPage } from "../utils";

const settingsPageObject = new SettingsPageObject();

describe("Website settings", function () {
    beforeEach(function () {
        cy.clearAllLocalStorage();
    });

    context("the app creates default settings when none are set", function () {
        beforeEach(function () {
            cy.visit(Cypress.config().baseUrl);
            cy.wait(1000);
        });

        specify(`colorMode default is "light"`, function () {
            cy.getBaseUrlOrigin().then((baseUrl) => {
                cy.assertLocalStorageItem(baseUrl, "colorMode", "light");
            });
        });
        specify(`temperatureUnit default is "fahrenheit"`, function () {
            cy.getBaseUrlOrigin().then((baseUrl) => {
                cy.assertLocalStorageItem(baseUrl, "temperatureUnit", "fahrenheit");
            });
        });
        specify(`windSpeedUnit default is "mph"`, function () {
            cy.getBaseUrlOrigin().then((baseUrl) => {
                cy.assertLocalStorageItem(baseUrl, "windSpeedUnit", "mph");
            });
        });
        specify(`precipitationUnit mode default is "inch"`, function () {
            cy.getBaseUrlOrigin().then((baseUrl) => {
                cy.assertLocalStorageItem(baseUrl, "precipitationUnit", "inch");
            });
        });
    });

    describe(SettingsPage.name, function () {
        beforeEach(function () {
            cy.visit(settingsPageObject.url());
        });

        it("renders correctly", function () {
            settingsPageObject.components.TopNavBarObject((navBar) => navBar.container().should("exist"));
            settingsPageObject.components.BottomNavBarObject((navBar) => navBar.container().should("exist"));
            settingsPageObject.components.SettingsMenuObject((smo) => {
                smo.container().should("exist");
            });
        });

        context("Enabling dark color mode", function () {
            it('defaults to "light" color mode', function () {
                //Assert
                settingsPageObject.components.SettingsMenuObject((smo) =>
                    smo.assertDarkModeIsSelected(false)
                );
                cy.get("body").should("have.css", "background-color").and("be.colored", "#ffffff");
            });

            it("changes the theme and saves the setting to local storage", function () {
                //Act 1
                settingsPageObject.components.SettingsMenuObject((smo) =>
                    smo.selectSettings({ darkModeToggle: true })
                );
                //Assert 1
                cy.get("body").should("have.css", "background-color").and("be.colored", "#121212");
                cy.getBaseUrlOrigin().then((baseUrl) => {
                    cy.assertLocalStorageItem(baseUrl, "colorMode", "dark");
                });

                //Act 2
                settingsPageObject.components.SettingsMenuObject((smo) =>
                    smo.selectSettings({ darkModeToggle: false })
                );
                //Assert 2
                cy.get("body").should("have.css", "background-color").and("be.colored", "#ffffff");
                cy.getBaseUrlOrigin().then((baseUrl) => {
                    cy.assertLocalStorageItem(baseUrl, "colorMode", "light");
                });
            });

            it("persists on other pages", function () {
                settingsPageObject.components.SettingsMenuObject((smo) =>
                    smo.selectSettings({ darkModeToggle: true })
                );
                settingsPageObject.components.BottomNavBarObject((navBar) => {
                    navBar.elements.aboutLink().click();
                    cy.url().then((url) => {
                        expect(url).to.include("/about");
                    });
                });
                cy.get("body").should("have.css", "background-color").and("be.colored", "#121212");
            });

            it("persists dark mode on page reload", function () {
                //Arrange
                settingsPageObject.components.SettingsMenuObject((smo) =>
                    smo.selectSettings({ darkModeToggle: true })
                );

                //Act
                cy.reload();

                //Assert
                settingsPageObject.components.SettingsMenuObject((smo) => smo.assertDarkModeIsSelected(true));
                cy.get("body").should("have.css", "background-color").and("be.colored", "#121212");
            });
        });

        context("Setting options for the weather forecast API", function () {
            const selectSettingAndGetToWeatherPage = (key, value) => {
                cy.visit(settingsPageObject.url());
                settingsPageObject.components.SettingsMenuObject((smo) => {
                    smo.selectSettings({ [key]: value });
                });
                cy.get(`@individualLocation`).then((individualLocation) => {
                    getThroughAppToWeatherPage(individualLocation.name, 0);
                });
            };
            const assertFetchWeatherRequestQueryParam = (
                key,
                value,
                alias = "@fetchAllWeatherForLocation"
            ) => {
                cy.get(alias)
                    .its("request.query")
                    .then((query) => {
                        expect(query[key]).to.eq(value);
                    });
            };

            beforeEach(function () {
                //Avoid Initial call at all times
                cy.intercept(`*open-meteo*`).as("openMeteo");
                //Stub location data
                cy.fixture("/open_meteo_api/geocoding_api/search.for.locations.200.berlin").as(
                    "locationDataResults"
                );
                cy.get(`@locationDataResults`).then((locationDataResults) => {
                    cy.intercept(`*/search*`, locationDataResults).as("searchForLocations");
                    cy.wrap(locationDataResults.results[0]).as("individualLocation");
                });
                //Stub weather data
                //This will not match the actual options supplied
                //We need to just ensure the request was sent with the wanted options
                cy.stubAndAliasWeatherData({
                    fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
                });
            });

            context("Changing temperature units", function () {
                for (const unit of Object.keys(TemperatureUnit)) {
                    it(`uses the new setting when fetching the weather on the weather page: ${unit}`, function () {
                        //Arrange/Act
                        selectSettingAndGetToWeatherPage("temperatureUnitOption", unit);

                        //Assert
                        assertFetchWeatherRequestQueryParam("temperature_unit", unit);
                    });
                }
            });

            context("Changing wind speed units", function () {
                for (const unit of Object.keys(WindSpeedUnit)) {
                    it(`uses the new setting when fetching the weather on the weather page: ${unit}`, function () {
                        //Arrange/Act
                        selectSettingAndGetToWeatherPage("windSpeedUnitOption", unit);

                        //Assert
                        assertFetchWeatherRequestQueryParam("wind_speed_unit", unit);
                    });
                }
            });

            context("Changing precipitation units", function () {
                for (const unit of Object.keys(PrecipitationUnit)) {
                    it(`uses the new setting when fetching the weather on the weather page: ${unit}`, function () {
                        //Arrange/Act
                        selectSettingAndGetToWeatherPage("precipitationUnitOption", unit);

                        //Assert
                        assertFetchWeatherRequestQueryParam("precipitation_unit", unit);
                    });
                }
            });
        });
    });
});
