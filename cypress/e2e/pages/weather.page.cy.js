import WeatherPage from '../../../src/pages/weather.page';

describe('WeatherPage', function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'})
    })
    //TODO
    specify('full page', function () {
        //TODO: add fixture for location data
        const locationData = {name: 'Raleigh'};

        cy.get(`@weatherData`).then(weatherData => {
            cy.mount(
                <WeatherPage locationData={locationData}
                             weatherData={weatherData}/>);
        });
    });
})
