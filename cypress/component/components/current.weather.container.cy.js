import CurrentWeatherContainer from '../../../src/components/current.weather.container';

describe('CurrentWeatherContainer', function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'})
    })
    specify('can display current weather details for a given location', function () {
        //TODO: add fixture for location data
        cy.get(`@weatherData`).then(weatherData => {
            const currentLocationName = 'Raleigh';
            const {current_weather} = weatherData;

            cy.mount(<CurrentWeatherContainer
                locationName={currentLocationName}
                weatherData={current_weather.mapped}
            />)
            cy.get(`#location`).should('have.text', 'Raleigh');
            cy.get(`#temperature`).should('have.text', '51 °F');
            cy.get(`#precipitation-item`).should('have.text', '0.500 inch');
            cy.get(`#weather-icon`).should('exist');
            cy.get(`#time`).should('have.text', 'Last updated: Nov 14, 2023, 9:30 PM');

        })
    })
})
