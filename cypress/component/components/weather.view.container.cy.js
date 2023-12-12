import {DateTime} from "luxon";
import WeatherViewContainer from '../../../src/components/weather.view.container';
import {NOT_AVAILABLE_TEXT} from "../../../src/components/constants";
import WeatherViewContainerObject from '../../page_objects/weather.view.container.object';

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

        wvco.HourlyWeatherSummaryAccordion((hwsa) => {
            hwsa.container.should('have.lengthOf', 25);
        });
        wvco.DailyWeatherSummaryAccordion((dwsa) => {
            dwsa.container.should('not.exist');
        });
        cy.get(`@weatherData`).then(weatherData => {
            const {hourly_weather} = weatherData;
            for (const [i, {mapped}] of hourly_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATETIME_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.HourlyWeatherSummaryAccordion((hwsa) => {
                    hwsa.scopedIndex = i;
                    hwsa.time.should('have.text', time);
                    hwsa.temperature.should('have.text', mapped.temperature);
                    hwsa.WeatherIconObject(function (wio) {
                        wio.svg.should('exist');
                    });
                    hwsa.PrecipitationItemObject((pio) => {
                        pio._assertValue(precipitationProbability);
                    });
                });
                cy.wait(50);
            }
        });
    });

    it('displays "Daily" data when selected', function () {
        const wvco = new WeatherViewContainerObject();

        wvco.dailyButton.click();

        wvco.DailyWeatherSummaryAccordion((dwsa) => {
            dwsa.container.should('have.lengthOf', 7);
        });
        wvco.HourlyWeatherSummaryAccordion((hwsa) => {
            hwsa.container.should('not.exist');
        });
        cy.get(`@weatherData`).then(weatherData => {
            const {daily_weather} = weatherData;
            for (const [i, {mapped}] of daily_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATE_MED);
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.DailyWeatherSummaryAccordion((dwsa) => {
                    dwsa.scopedIndex = i;
                    dwsa.time.should('have.text', time);
                    dwsa.temperature.should('have.text', mapped.temperature);
                    dwsa.WeatherIconObject(function (wio) {
                        wio.svg.should('exist');
                    });
                    dwsa.PrecipitationItemObject((pio) => {
                        pio._assertValue(precipitationProbability);
                    });
                });
                cy.wait(50);
            }
        });

        // cy.contains(`[role="tab"]`, 'Daily').click();
        //
        // cy.get(`[id="daily-weather-summary-accordion"]`).should('have.lengthOf', 7);
        // cy.get(`[id="hourly-weather-summary-accordion"`).should('not.exist');
        //
        // cy.get(`@weatherData`).then(weatherData => {
        //     const {daily_weather} = weatherData;
        //     for (const [i, {mapped}] of daily_weather.entries()) {
        //         const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATE_MED);
        //         const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;
        //
        //         cy.get(`[id="daily-weather-summary-accordion"]`).eq(i).as('accordion');
        //         cy.get(`@accordion`).find('#time').should('have.text', time);
        //         cy.get(`@accordion`).find('#temperature').should('have.text', mapped.temperature);
        //         cy.get(`@accordion`).find('#weather-icon-div').find('svg').should('exist');
        //         cy.get(`@accordion`).find('#precipitation').should('have.text', precipitationProbability);
        //     }
        // });
    });

    //TODO
    specify.skip("Opening the details for one accordion should close any other open ones", function () {
        cy.get(`@weatherData`).then(weatherData => {
            const {hourly_weather} = weatherData;
            const firstHourWeather = hourly_weather[0];
            const secondHourWeather = hourly_weather[1];

            cy.contains(`[role="tab"]`, 'Hourly').click();


            cy.get(`[id="hourly-weather-summary-accordion"]`).eq(1).click();


        });
    });
});
