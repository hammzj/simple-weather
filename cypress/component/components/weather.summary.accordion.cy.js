import {DateTime} from "luxon";
import WeatherSummaryAccordion from '../../../src/components/weather.summary.accordion';
import WeatherSummaryAccordionObject from '../../page_objects/components/weather.summary.accordion.object';

const formatDateTimeHourly = (isoString) => DateTime.fromISO(isoString).toLocaleString(DateTime.DATETIME_MED);
const formatDateTimeDaily = (isoString) => DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_MED);

describe(WeatherSummaryAccordion.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
    });

    context('Hourly', function () {
        it('displays a summary of the hourly data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHour = weatherData.hourly_weather[0];
                cy.mount(<WeatherSummaryAccordion
                    type='hourly'
                    mappedWeatherData={firstHour.mapped}
                />);

                const accordion = new WeatherSummaryAccordionObject('hourly');
                accordion.time.should('have.text', formatDateTimeHourly(firstHour.mapped.time));
                accordion.temperature.should('have.text', '51 °F');
                accordion.WeatherIconObject(wio => wio._assertTooltipText('Overcast'));
                accordion.PrecipitationChanceObject(pio => pio._assertValue('15 %'));
            });
        });

        it('displays the additional weather details when opened', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHour = weatherData.hourly_weather[0];

                cy.mount(<WeatherSummaryAccordion
                    type='hourly'
                    mappedWeatherData={firstHour.mapped}
                />)

                const accordion = new WeatherSummaryAccordionObject('hourly');
                accordion.summary.click();

                accordion.AdditionalWeatherDetailsObject(awdo => {
                    awdo._assertTitleAndValue('Temperature:', `51 °F`);
                    awdo._assertTitleAndValue('Precipitation:', `0 inch`);
                    awdo._assertTitleAndValue('Precipitation probability:', `15 %`);
                });
            });
        });
    });

    context('Daily', function () {
        it('displays a summary of the daily data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstDay = weatherData.daily_weather[0];

                cy.mount(<WeatherSummaryAccordion
                    type='daily'
                    mappedWeatherData={firstDay.mapped}
                />);

                const accordion = new WeatherSummaryAccordionObject('daily');
                accordion.time.should('have.text', formatDateTimeDaily(firstDay.mapped.time));
                accordion.temperature.should('have.text', '48 °F / 55 °F');
                accordion.WeatherIconObject(wio => wio._assertTooltipText('Slight rain showers'));
                accordion.PrecipitationChanceObject(pio => pio._assertValue('100 %'));
            });
        });

        it('displays the additional weather details when opened', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstDay = weatherData.daily_weather[0];

                cy.mount(<WeatherSummaryAccordion
                    type='daily'
                    mappedWeatherData={firstDay.mapped}
                />);

                const accordion = new WeatherSummaryAccordionObject('daily');
                accordion.summary.click();

                accordion.AdditionalWeatherDetailsObject(awdo => {
                    awdo._assertTitleAndValue('Temperature Low/High:', `48 °F / 55 °F`);
                    awdo._assertTitleAndValue('Precipitation:', `0.1 inch`);
                    awdo._assertTitleAndValue('Precipitation probability:', `100 %`);
                });
            });
        });
    });

});
