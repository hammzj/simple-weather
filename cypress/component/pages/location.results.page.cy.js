import LocationResultsPage from "../../../src/pages/location.results.page";
import LocationResultsPageObject from '../../page_objects/pages/location.results.page.object';

const locationResultsPageObject = new LocationResultsPageObject();

describe(LocationResultsPage.name, function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/geocoding_api/search.for.locations.200').as('locationDataResults');
    });

    it.only('renders correctly when all necessary data is provided', function () {
        cy.get(`@locationDataResults`).then(locationDataResults => {
            cy.mount(<LocationResultsPage locationDataResults={locationDataResults}/>);

            //TODO
        });
    });

    it('displays a message when no data was found', function () {
        cy.mount(<LocationResultsPage locationDataResults={{results: []}}/>);
        cy.get(".MuiTypography-root").should('have.text', 'No locations could be found.');
    });
})
