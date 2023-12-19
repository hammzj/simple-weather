import WeatherPage from '../../../src/pages/weather.page';
import WeatherPageObject from '../../page_objects/pages/weather.page.object';
import {getLocationName} from "../../../src/services/open_mateo_api/utils";

const weatherPage = new WeatherPageObject();

describe(WeatherPage.name, function () {
    beforeEach(function () {
        cy.fixture('/open_meteo_api/geocoding_api/individual.location').as('locationData');
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'})
    })
    //TODO
    it('renders correctly when all necessary data is provided', function () {
        cy.get(`@locationData`).then(locationData => {
            cy.get(`@weatherData`).then(weatherData => {
                cy.mount(
                    <WeatherPage locationData={locationData}
                                 weatherData={weatherData}/>);


                weatherPage.CurrentWeatherCardObject((cwco) => {
                    cwco.container.should('exist');
                    cwco.location.should('have.text', getLocationName(locationData));
                    cwco.temperature.should('have.text', weatherData.current_weather.mapped.temperature);
                });
                weatherPage.WeatherViewContainerObject((wvco) => {
                    wvco.container.should('exist');

                    wvco.hourlyButton.click();
                    wvco.HourlyWeatherSummaryAccordionObject((obj) => obj.container.should('have.lengthOf', 25));

                    wvco.dailyButton.click();
                    wvco.DailyWeatherSummaryAccordionObject((obj) => obj.container.should('have.lengthOf', 7));
                });
            });
        });
    })
})
