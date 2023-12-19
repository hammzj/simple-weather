import LocationDataButton from '../../../src/components/location.data.button';
import LocationDataButtonObject from '../../page_objects/components/location.data.button.object';

describe(LocationDataButton.name, function () {
    context('General tests', function () {
        beforeEach(function () {
            cy.fixture('/open_meteo_api/geocoding_api/individual.location').as('locationData');
            cy.get('@locationData').then(locationData => {
                cy.mount(<LocationDataButton locationData={locationData}/>);
            });
        });

        it('contains the name of a location', function () {
            const ldbo = new LocationDataButtonObject('Berlin');
            ldbo.name.should('have.text', 'Berlin, Land Berlin, Germany');
        });

        it('has a link to the weather page with the correct coordinates', function () {
            cy.get('@locationData').then(locationData => {
                const {latitude, longitude} = locationData;
                const ldbo = new LocationDataButtonObject('Berlin');
                ldbo.link.should('have.attr', 'href', `/weather?latitude=${latitude}&longitude=${longitude}`);
            });
        });
    });
});
