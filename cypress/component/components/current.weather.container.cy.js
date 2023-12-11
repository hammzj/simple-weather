import CurrentWeatherContainer from '../../../src/components/current.weather.container';
import {mapDataFromFetchWeatherResponse} from "../../../src/services/open_mateo_api/utils";

describe('CurrentWeatherContainer', function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json')
            .then(fetchWeatherResponseFixture => {
                return mapDataFromFetchWeatherResponse(fetchWeatherResponseFixture);
            }).as('mappedWeatherData');
    })
    specify('can display current weather details for a given location', function () {
        //TODO: add fixture for location data
        cy.get(`@mappedWeatherData`).then(mappedWeatherData => {
            const currentLocationName = 'Raleigh';
            const {current_weather} = mappedWeatherData;
            cy.log('current_weather', current_weather)

            cy.mount(<CurrentWeatherContainer
                locationName={currentLocationName}
                temperature={current_weather.temperature_2m}
                weatherCode={current_weather.weather_code}
                precipitation={current_weather.precipitation}
            />)
            cy.get(`#location`).should('have.text', 'Raleigh');
            cy.get(`#temperature`).should('have.text', '51.3 °F');
            cy.get(`#precipitation-item`).should('have.text', '0.5 inch');
            cy.get(`#weather-icon`).should('exist');

        })
    })
})
