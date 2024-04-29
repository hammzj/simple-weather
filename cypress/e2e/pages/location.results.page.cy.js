import LocationResultsPageObject from '../../page_objects/pages/location.results.page.object';
import {getLocationName} from "../../../src/services/open_meteo_api/utils";

const locationResultsPageObject = new LocationResultsPageObject();

describe('LocationResultsPage', function () {
    beforeEach(function () {
        //Avoid Initial call at all times
        cy.intercept(`*open-meteo*`).as('openMeteo');
        cy.fixture('/open_meteo_api/geocoding_api/search.for.locations.200.berlin').as('locationDataResults');
    });

    context('Provided with correct data', function () {
        beforeEach(function () {
            cy.get(`@locationDataResults`).then(locationDataResults => {
                cy.intercept(`*/search*`, locationDataResults).as('searchForLocations');
            });
            cy.wrap(locationResultsPageObject.url() + `?name=Berlin`).as('locationResultsPageUrl');
        });

        it('renders the search form', function () {
            cy.get('@locationResultsPageUrl').then(url => {
                cy.visit(url);
                locationResultsPageObject.components.TopNavBarObject((tnbo) => {
                    tnbo.container().should('exist');
                    tnbo.components.LocationSearchFormObject(lsfo => lsfo.container().should('exist'));
                });
                locationResultsPageObject.components.BottomNavBarObject(bnvo => {
                    bnvo.container().should('exist');
                });
            });
        });

        it('renders buttons for each location', function () {
            cy.get('@locationResultsPageUrl').then(url => {
                cy.get(`@locationDataResults`).then(locationDataResults => {
                    cy.visit(url);

                    locationResultsPageObject.components.LocationButtonsListObject(locationButtonsListObject => {
                        const locationNames = locationDataResults.results.map(getLocationName);
                        locationButtonsListObject.assertButtonText(...locationNames);
                    });
                });
            });
        });

        it('allows searching for a new location', function () {
            cy.fixture('/open_meteo_api/geocoding_api/search.for.locations.200.raleigh.json').as('locationDataResultsAlternate');

            cy.get('@locationResultsPageUrl').then(url => {
                cy.get(`@locationDataResults`).then(locationDataResults => {
                    cy.get(`@locationDataResultsAlternate`).then(locationDataResultsAlternate => {
                        //Visit and validate initial results
                        cy.visit(url);
                        locationResultsPageObject.components.LocationButtonsListObject(locationButtonsListObject => {
                            const locationNames = locationDataResults.results.map(getLocationName);
                            locationButtonsListObject.assertButtonText(...locationNames);
                        });

                        //When searching in the form, return new results on page redirect
                        cy.intercept(`*/search*`, locationDataResultsAlternate).as('searchForLocations');

                        locationResultsPageObject.components.TopNavBarObject((navBar) => {
                            navBar.components.LocationSearchFormObject(function (locationSearchFormObject) {
                                locationSearchFormObject.search('raleigh');
                                cy.wait(1000);
                            });
                        });

                        //Check buttons have new results
                        locationResultsPageObject.components.LocationButtonsListObject(locationButtonsListObject => {
                            const locationNames = locationDataResultsAlternate.results.map(getLocationName);
                            locationButtonsListObject.assertButtonText(...locationNames);
                        });
                    });
                });
            });
        });
    });

    context('Error handling', function () {
        it('displays a message when no data was found', function () {
            cy.intercept(`*/search*`, {data: []}).as('searchForLocations');

            cy.visit(locationResultsPageObject.url());

            cy.get(".MuiTypography-root").should('contain.text', 'No locations could be found.');
        });

        it('displays a message when no query parameters are provided', function () {
            cy.intercept(`*/search*`, {data: []}).as('searchForLocations');

            cy.visit(locationResultsPageObject.url())

            cy.get(".MuiTypography-root").should('contain.text', 'No locations could be found.');
        });
    });
});
