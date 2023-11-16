import WeatherSummaryRow from '../../../src/components/weather.summary.row';
import {mapDataFromFetchWeatherResponse} from "../../../src/services/open_mateo_api/utils";

describe('WeatherSummaryRow', function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
            .then(fetchWeatherResponseFixture => {
                return mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
            }).as('mappedWeatherData');
    })
    context('Hourly', function () {
        specify('can create a row from hourly data', function () {
            cy.get(`@mappedWeatherData`).then(mappedWeatherData => {
                const firstHour = mappedWeatherData.hourly_weather[0];
                cy.mount(<WeatherSummaryRow
                    type='hourly'
                    time={firstHour.time}
                    timezone={firstHour.timezone}
                    temperature_2m={firstHour.temperature_2m}
                    temperature_2m_min={firstHour.temperature_2m_min}
                    temperature_2m_max={firstHour.temperature_2m_max}
                    precipitation_probability_max={firstHour.precipitation_probability_max}
                    precipitation_probability={firstHour.precipitation_probability}
                    weather_code={firstHour.weather_code}
                />)
            })
        })
    })
    context('Daily', function () {})
})
