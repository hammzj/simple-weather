import {mapDataFromFetchWeatherResponse} from "../../../src/services/open_mateo_api/utils";

describe('utils', function () {
    context('mapDataFromFetchWeatherResponse', function () {
        it('can return usable data', function () {
            cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
                .then(fetchWeatherResponseFixture => {
                    cy.fixture('/open_meteo_api/utils/mapped.weather.all.json').then(mappedWeatherFixture => {
                        const data = mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
                        expect(data).to.haveOwnProperty('current_weather')
                        expect(data).to.haveOwnProperty('hourly_weather')
                        expect(data).to.haveOwnProperty('daily_weather')
                       cy.log(data);
                    })
                })
        })
    })
})
