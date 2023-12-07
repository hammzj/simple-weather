import WeatherSummaryButton from '../../../src/components/weather.summary.button';
import {mapDataFromFetchWeatherResponse} from "../../../src/services/open_mateo_api/utils";

describe('WeatherSummaryButton', function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
            .then(fetchWeatherResponseFixture => {
                return mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
            }).as('mappedWeatherData');
    })
    context('Hourly', function () {
        specify('can create a row button from hourly data', function () {
            cy.get(`@mappedWeatherData`).then(mappedWeatherData => {
                const firstHour = mappedWeatherData.hourly_weather[0];

                cy.mount(<WeatherSummaryButton
                    type='hourly'
                    time={firstHour.time}
                    timezone={firstHour.timezone}
                    temperature_2m={firstHour.temperature_2m}
                    precipitation_probability={firstHour.precipitation_probability}
                    weather_code={firstHour.weather_code}
                />)

                cy.get('#time').should('have.text', '12:00 AM');
                cy.get('#temperature').should('have.text', firstHour.temperature_2m);
                cy.get('#weather-icon').find('svg').should('exist');
                cy.get('#precipitation-probability').should('have.text', firstHour.precipitation_probability);
            })
        })
    })
    context('Daily', function () {})
})
