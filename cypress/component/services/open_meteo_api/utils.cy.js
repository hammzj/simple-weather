import {getLocationName} from "../../../../src/services/open_meteo_api/utils";

describe('open-meteo API utility functions', function () {
    context('getLocationName', function () {
        it('creates readable names from the geocoding response', function () {
            cy.fixture('open_meteo_api/geocoding_api/individual.location.berlin.json').then(fixture => {
                expect(getLocationName(fixture)).to.eq('Berlin, Land Berlin, Germany');
            });

            cy.fixture('open_meteo_api/geocoding_api/individual.location.berlin.json').then(fixture => {
                delete fixture.admin1
                expect(getLocationName(fixture)).to.eq('Berlin, Germany');
            });

            cy.fixture('open_meteo_api/geocoding_api/individual.location.berlin.json').then(fixture => {
                delete fixture.country
                expect(getLocationName(fixture)).to.eq('Berlin, Land Berlin');
            });
        });
    })
})
