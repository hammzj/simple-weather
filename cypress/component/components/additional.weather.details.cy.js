import AdditionalWeatherDetails from "../../../src/components/additional.weather.details";
import AdditionalWeatherDetailsObject from "../../page_objects/components/additional.weather.details.object";
import {DateTime} from "luxon";

const formatDateTimeAsTime = (isoString) => DateTime.fromISO(isoString).toLocaleString(DateTime.TIME_SIMPLE)

describe(AdditionalWeatherDetails.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
    });

    context('Hourly', function () {
        specify('the row order is correct', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHour = weatherData.hourly_weather[0];

                cy.mount(<AdditionalWeatherDetails type='hourly' mappedWeatherData={firstHour.mapped}/>)

                const awdo = new AdditionalWeatherDetailsObject();
                awdo._assertRowTitlesInOrder([
                    'Temperature:',
                    'Conditions:',
                    'Precipitation:',
                    'Precipitation probability:',
                    'Wind:',
                    'Wind gusts:',
                    'Humidity:',
                    'Cloud cover:'
                ]);
            });
        });

        it('can display details for a set of hourly data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHour = weatherData.hourly_weather[0];

                cy.mount(<AdditionalWeatherDetails type='hourly' mappedWeatherData={firstHour.mapped}/>)

                const awdo = new AdditionalWeatherDetailsObject();
                awdo._assertTitleAndValue('Temperature:', '51 °F');
                awdo._assertTitleAndValue('Conditions:', 'Overcast');
                awdo._assertTitleAndValue('Precipitation:', '0 inch');
                awdo._assertTitleAndValue('Precipitation probability:', '15 %');
                awdo._assertTitleAndValue('Wind:', '8 mp/h SW');
                awdo._assertTitleAndValue('Wind gusts:', '20 mp/h');
                awdo._assertTitleAndValue('Humidity:', '78 %');
                awdo._assertTitleAndValue('Cloud cover:', '100 %');
            });
        });

        specify('rows have default text when the data has a missing value', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHourWithMissingData = weatherData.hourly_weather[0];
                delete firstHourWithMissingData.mapped.precipitation;
                delete firstHourWithMissingData.mapped.precipitation_probability;

                cy.mount(<AdditionalWeatherDetails type='hourly' mappedWeatherData={firstHourWithMissingData.mapped}/>)

                const awdo = new AdditionalWeatherDetailsObject();
                awdo._assertTitleAndValue('Temperature:', '51 °F'); //Spot check that nothing else is affected
                awdo._assertTitleAndValue('Precipitation:', 'N/A');
                awdo._assertTitleAndValue('Precipitation probability:', 'N/A');
            });
        });
    });

    context('Daily', function () {
        specify('the row order is correct', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstDay = weatherData.daily_weather[0];

                cy.mount(<AdditionalWeatherDetails type='daily' mappedWeatherData={firstDay.mapped}/>)

                const awdo = new AdditionalWeatherDetailsObject();
                awdo._assertRowTitlesInOrder([
                    'Temperature Low/High:',
                    'Conditions:',
                    'Precipitation:',
                    'Precipitation probability:',
                    'Wind (with dominant direction):',
                    'Wind gusts:',
                    'Sunrise:',
                    'Sunset:'
                ]);
            });
        });

        it('can display details for a set of hourly data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstDay = weatherData.daily_weather[0];

                cy.mount(<AdditionalWeatherDetails type='daily' mappedWeatherData={firstDay.mapped}/>)

                const awdo = new AdditionalWeatherDetailsObject();
                awdo._assertTitleAndValue('Temperature Low/High:', '48 °F / 55 °F');
                awdo._assertTitleAndValue('Conditions:', 'Slight rain showers');
                awdo._assertTitleAndValue('Precipitation:', '0.1 inch');
                awdo._assertTitleAndValue('Precipitation probability:', '100 %');
                awdo._assertTitleAndValue('Wind (with dominant direction):', '15 mp/h SW');
                awdo._assertTitleAndValue('Wind gusts:', '41 mp/h');
                awdo._assertTitleAndValue('Sunrise:', formatDateTimeAsTime(firstDay.mapped.sunrise));
                awdo._assertTitleAndValue('Sunset:', formatDateTimeAsTime(firstDay.mapped.sunset));
            });
        });

        specify('rows have default text when the data has a missing value', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstDayWithMissingData = weatherData.daily_weather[0];
                delete firstDayWithMissingData.mapped.precipitation;
                delete firstDayWithMissingData.mapped.precipitation_probability;

                cy.mount(<AdditionalWeatherDetails type='daily' mappedWeatherData={firstDayWithMissingData.mapped}/>)

                const awdo = new AdditionalWeatherDetailsObject();
                awdo._assertTitleAndValue('Temperature Low/High:', '48 °F / 55 °F'); //Spot check that nothing else is affected
                awdo._assertTitleAndValue('Precipitation:', 'N/A');
                awdo._assertTitleAndValue('Precipitation probability:', 'N/A');
            });
        });
    });
})
