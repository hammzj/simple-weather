import LocationDataButton from '../../../src/components/location.data.button';
import LocationDataButtonObject from '../../page_objects/components/location.data.button.object';

describe(LocationDataButton.name, function () {
    it('contains the name of a location', function () {
        cy.fixture('/open_meteo_api/geocoding_api/individual.location').then(locationData => {
            cy.mount(<LocationDataButton locationData={locationData}/>);

            const ldbo = new LocationDataButtonObject('Berlin');
            ldbo.name.should('have.text', 'Berlin, Land Berlin, Germany');

        });
    });
})
