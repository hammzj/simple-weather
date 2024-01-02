import {DateTime} from "luxon";
import {NOT_AVAILABLE_TEXT} from "../../../src/constants";
import WeatherViewContainer from '../../../src/components/weather.view.container';
import WeatherViewContainerObject from '../../page_objects/components/weather.view.container.object';

describe(WeatherViewContainer.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
        cy.get(`@weatherData`).then(weatherData => {
            cy.mount(<WeatherViewContainer weatherData={weatherData}/>);
        });
    });

    it.only('defaults to "Hourly" data', function () {
        const wvco = new WeatherViewContainerObject();
        wvco.hourlyButton.should('have.attr', 'aria-selected', "true");
    });

    it('displays "Hourly" data when selected', function () {
        const wvco = new WeatherViewContainerObject();

        wvco.hourlyButton.click();

        wvco.HourlyWeatherAccordionObject((obj) => obj.container.should('have.lengthOf', 25));
        wvco.DailyWeatherAccordionObject((obj) => obj.container.should('not.exist'));
        cy.get(`@weatherData`).then(weatherData => {
            const {hourly_weather} = weatherData;
            for (const [i, {mapped}] of hourly_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATETIME_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.HourlyWeatherAccordionObject((obj) => {
                    obj.scopedIndex = i;
                    obj.time.should('have.text', time);
                    obj.temperature.should('have.text', mapped.temperature);
                    obj.WeatherIconObject((wio) => wio.svg.should('exist'));
                    obj.PrecipitationChanceObject((pio) => pio._assertValue(precipitationProbability));
                });
                cy.wait(50);
            }
        });
    });

    it('displays "Daily" data when selected', function () {
        const wvco = new WeatherViewContainerObject();

        wvco.dailyButton.click();

        wvco.DailyWeatherAccordionObject((obj) => obj.container.should('have.lengthOf', 7));
        wvco.HourlyWeatherAccordionObject((obj) => obj.container.should('not.exist'));
        cy.get(`@weatherData`).then(weatherData => {
            const {daily_weather} = weatherData;
            for (const [i, {mapped}] of daily_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATE_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.DailyWeatherAccordionObject((obj) => {
                    obj.scopedIndex = i;
                    obj.time.should('have.text', time);
                    obj.temperature.should('have.text', mapped.temperature_range);
                    obj.WeatherIconObject((wio) => wio.svg.should('exist'));
                    obj.PrecipitationChanceObject((pio) => pio._assertValue(precipitationProbability));
                });
                cy.wait(50);
            }
        });
    });

    specify("Opening the details for one accordion should close any other open ones", function () {
        const wvco = new WeatherViewContainerObject();

        wvco.hourlyButton.click();

        wvco.HourlyWeatherAccordionObject((obj) => {
            //Arrange: make sure that the first accordion is expanded
            //Set the scope to the first-found accordion
            const firstAccordion = obj.__clone();
            firstAccordion._scopedIndex = 0;

            //Set the scope to the second-found accordion
            const secondAccordion = obj.__clone();
            secondAccordion._scopedIndex = 1;

            firstAccordion.container.click();
            firstAccordion.container.should('have.class', 'Mui-expanded');

            //Arrange: the second one is starting as collapsed
            secondAccordion.container.should('not.have.class', 'Mui-expanded');

            //Act: Click the second one to expand it
            secondAccordion.container.click();

            //Assertion: Only the second one should be expanded
            firstAccordion.container.should('not.have.class', 'Mui-expanded');
            secondAccordion.container.should('have.class', 'Mui-expanded');
        });
    });

    it(`will display a warning message when no data has been returned for Hourly weather`, function () {
        //Replace original mounted component
        cy.mount(<WeatherViewContainer weatherData={{}}/>);

        const wvco = new WeatherViewContainerObject();

        wvco.hourlyButton.click();
        wvco.weatherTabPanelHourly.should('have.text', 'No data could be returned for the location.');

        wvco.dailyButton.click();
        wvco.weatherTabPanelDaily.should('have.text', 'No data could be returned for the location.');
    });
});
