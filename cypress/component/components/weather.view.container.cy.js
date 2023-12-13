import {DateTime} from "luxon";
import {NOT_AVAILABLE_TEXT} from "../../../src/components/constants";
import WeatherViewContainer from '../../../src/components/weather.view.container';
import WeatherViewContainerObject from '../../page_objects/components/weather.view.container.object';

describe(WeatherViewContainer.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
        cy.get(`@weatherData`).then(weatherData => {
            cy.mount(<WeatherViewContainer weatherData={weatherData}/>);
        });
    });

    it('defaults to "Hourly" data', function () {
        const wvco = new WeatherViewContainerObject();
        wvco.hourlyButton.should('have.attr', 'aria-selected', "true");
    });

    it('displays "Hourly" data when selected', function () {
        const wvco = new WeatherViewContainerObject();

        wvco.hourlyButton.click();

        wvco.HourlyWeatherSummaryAccordionObject((obj) => obj.container.should('have.lengthOf', 25));
        wvco.DailyWeatherSummaryAccordionObject((obj) => obj.container.should('not.exist'));
        cy.get(`@weatherData`).then(weatherData => {
            const {hourly_weather} = weatherData;
            for (const [i, {mapped}] of hourly_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATETIME_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.HourlyWeatherSummaryAccordionObject((obj) => {
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

        wvco.DailyWeatherSummaryAccordionObject((obj) => obj.container.should('have.lengthOf', 7));
        wvco.HourlyWeatherSummaryAccordionObject((obj) => obj.container.should('not.exist'));
        cy.get(`@weatherData`).then(weatherData => {
            const {daily_weather} = weatherData;
            for (const [i, {mapped}] of daily_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATE_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.DailyWeatherSummaryAccordionObject((obj) => {
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

        wvco.HourlyWeatherSummaryAccordionObject((obj) => {
            const firstAccordion = obj.__clone();
            firstAccordion._scopedIndex = 0;

            const secondAccordion = obj.__clone();
            secondAccordion._scopedIndex = 1;


            //Arrange: make sure that the first one is opened
            firstAccordion.container.click();
            firstAccordion.container.should('have.class', 'Mui-expanded');

            //Arrange: the second one is starting as closed
            secondAccordion.container.should('not.have.class', 'Mui-expanded');

            //Act: Open the second one
            secondAccordion.container.click();

            //Assertion: Only the second one should be opened
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
