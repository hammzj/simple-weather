import WeatherView from '../../../src/components/weather.view';
import WeatherSummaryAccordion from "../../../src/components/weather.summary.accordion";

describe('WeatherView', function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
        cy.get(`@weatherData`).then(weatherData => {
            cy.mount(<WeatherView weatherData={weatherData}/>)
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
