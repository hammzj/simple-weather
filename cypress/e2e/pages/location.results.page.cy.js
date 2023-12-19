import OpenMeteoGeocodingAPI from "../../../src/services/open_mateo_api/geocoding_api";
import LocationResultsPage from "../../../src/pages/location.results.page";
import LocationResultsPageObject from '../../page_objects/pages/location.results.page.object';
const locationResultsPageObject = new LocationResultsPageObject();

describe(LocationResultsPage.name, function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/geocoding_api/search.for.locations.200').as('locationDataResults');
    });

    it('renders correctly when all necessary data is provided', function () {
        cy.get(`@locationDataResults`).then(locationDataResults => {
            cy.stub(OpenMeteoGeocodingAPI, 'searchForLocations').returns({data: locationDataResults})
            cy.mount(<LocationResultsPage/>);
            //TODO
        });
    });

    it('displays a message when no data was found', function () {
        cy.mount(<LocationResultsPage locationDataResults={{results: []}}/>);
        cy.get(".MuiTypography-root").should('have.text', 'No locations could be found.');
    });
})
