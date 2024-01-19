import IndexPage from "../../../src/pages/index.page";
import IndexPageObject from "../../page_objects/pages/index.page.object";
import LocationResultsPageObject from "../../page_objects/pages/location.results.page.object";

const indexPage = new IndexPageObject();
const locationResultsPageObject = new LocationResultsPageObject();

describe(IndexPage.name, function () {
    beforeEach(function () {
        //Avoid Initial call at all times
        cy.intercept(`*open-meteo*`).as("openMeteo");
        cy.visit(Cypress.config().baseUrl);
    });

    it("renders correctly", function () {
        indexPage.LocationSearchFormObject((locationSearchFormObject) => {
            locationSearchFormObject.container.should("exist");
        });
        indexPage.BottomNavBarObject((bottomNavBarObject) => {
            bottomNavBarObject.container.should("exist");
        });
    });

    it("does not display a saved location when none exist", function () {
        indexPage.SavedLocationsObject((slo) => slo.__assertExists(false));
    });

    context("Searching for a location", function () {
        beforeEach(function () {
            cy.fixture("/open_meteo_api/geocoding_api/search.for.locations.200.berlin").as(
                "locationDataResults"
            );
            cy.get(`@locationDataResults`).then((locationDataResults) => {
                cy.intercept(`*/search*`, locationDataResults).as("searchForLocations");
            });
        });

        it("can search for a location correctly", function () {
            indexPage.LocationSearchFormObject((locationSearchFormObject) => {
                locationSearchFormObject._search("Berlin");
            });

            locationResultsPageObject.container.should("exist");
            locationResultsPageObject.LocationButtonsListObject((lblo) => {
                lblo._assertButtonText("Berlin, Land Berlin, Germany");
            });
        });
    });

    context("Bottom nav bar", function () {
        it("renders correctly", function () {
            indexPage.BottomNavBarObject((bottomNavBarObject) => {
                bottomNavBarObject.container.should("exist");
            });
        });

        //TODO: make this more robust
        it("can go to the about page", function () {
            indexPage.BottomNavBarObject((bottomNavBarObject) => {
                bottomNavBarObject.aboutLink.click();
                cy.url().then((url) => {
                    expect(url).to.include("/about");
                });
            });
        });
    });
});
