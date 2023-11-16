import {mapDataFromFetchWeatherResponse} from "../../../src/services/open_mateo_api/utils";

describe('utils', function () {
    context('mapDataFromFetchWeatherResponse', function () {
        it('can return usable data', function () {
            cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
                .then(fetchWeatherResponseFixture => {
                    const data = mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
                    cy.log(data);

                    expect(data).to.haveOwnProperty('longitude')
                    expect(data).to.haveOwnProperty('latitude')
                    expect(data).to.haveOwnProperty('current_weather')
                    expect(data).to.haveOwnProperty('hourly_weather')
                    expect(data).to.haveOwnProperty('daily_weather')
                })
        })

        it('can return usable data when only one set of weather properties exists', function () {
            cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
                .then(fetchWeatherResponseFixture => {
                    delete fetchWeatherResponseFixture.hourly;
                    delete fetchWeatherResponseFixture.hourly_units;
                    delete fetchWeatherResponseFixture.daily;
                    delete fetchWeatherResponseFixture.daily_units;

                    const data = mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
                    cy.log(data);

                    expect(data.current_weather).to.have.lengthOf(1)
                    expect(data.hourly_weather).to.have.lengthOf(0)
                    expect(data.daily_weather).to.have.lengthOf(0)
                })
        })
    })
})
