import WeatherView from '../../../src/components/weather.view';
import {mapDataFromFetchWeatherResponse} from "../../../src/services/open_mateo_api/utils";
import WeatherSummaryAccordion from "../../../src/components/weather.summary.accordion";

describe('WeatherView', function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
            .then(fetchWeatherResponseFixture => {
                return mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
            }).as('mappedWeatherData');

        cy.get(`@mappedWeatherData`).then(mappedWeatherData => {
            cy.mount(<WeatherView
                weatherData={mappedWeatherData}
            />)
        })
    })
    it.only('displayed "Hourly" data when selected', function () {
        //TODO
        cy.contains(`[role="tab"]`, 'Hourly').click()
    })
    it('displayed "Daily" data when selected', function () {
        //TODO
    })
    it('defaults to "Hourly" data', function () {
        //TODO
        cy.contains(`[role="tab"]`, 'Daily').click()
    })
})
