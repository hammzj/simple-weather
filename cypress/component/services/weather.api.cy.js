import {OpenMeteoGeocodingAPI as GeocodingAPI} from "../../../src/services/open_mateo_api";
import * as searchForLocations200 from '../../fixtures/open_meteo_api/geocoding_api/search.for.locations.200.json'

describe("Weather API", function () {
    describe("open-mateo API", function () {
        context("Geocoding API client", function () {
            it('can return a list of locations based on a given search parameter', function () {
                GeocodingAPI.searchForLocations({name: 'Raleigh'}).then(response => {
                    expect(response.results).to.eq(true);
                });
            });

            it('returns an error when a location is not found', function () {

            });
        });

        context("Weather API client", function () {

        });
    });
});
