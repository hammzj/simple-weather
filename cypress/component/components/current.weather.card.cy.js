import CurrentWeatherCard from '../../../src/components/current.weather.card';
import CurrentWeatherCardObject from '../../page_objects/components/current.weather.card.object';

describe(CurrentWeatherCard.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'})
    })
    specify('can display current weather details for a given location', function () {
        //TODO: add fixture for location data
        cy.get(`@weatherData`).then(weatherData => {
            const currentLocationName = 'Raleigh';
            const {current_weather} = weatherData;

            cy.mount(<CurrentWeatherCard
                locationName={currentLocationName}
                currentWeatherData={current_weather.mapped}
            />);

            const cwco = new CurrentWeatherCardObject();

            cwco.location.should('have.text', 'Raleigh');
            cwco.temperature.should('have.text', '51 °F');
            cwco.temperatureRange.should('have.text', '48 °F / 55 °F');
            cwco.PrecipitationChanceObject((pco) => pco._assertValue('0.1 inch'));
            cwco.WeatherIconObject((wio) => wio.container.find(`svg`).should('exist'));
            cwco.time.should('have.text', 'Last updated: Nov 14, 2023, 9:30 PM');
        });
    });
})
