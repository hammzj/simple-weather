import SimpleWeatherAPI from "../../../src/services/api";
import {gte} from "lodash";
import {DateTime} from "luxon";

/**
 *
 * @param keyValuePairs
 * @param aliasOfWeatherDataToTest {string} "@hourlyWeather" or "@dailyWeather"
 * @param index
 */
const bulkAssertMappedValues = (keyValuePairs, aliasOfWeatherDataToTest, index) => {
    for (const {key, value} of keyValuePairs) {
        specify(key, () => {
            cy.get(aliasOfWeatherDataToTest).then(actualWeatherData => {
                cy.log('Validating key', key, 'value', value);
                expect(actualWeatherData[index].mapped[key]).to.eq(value);
            });
        });
    }
}

describe(SimpleWeatherAPI.name, function () {
    beforeEach(function () {
        //Stubs the open meteo api call
        //the SimpleWeather.getWeather call uses the alias "weatherData"
        cy.fixture('/open_meteo_api/forecast_api/fetch.all.weather.for.location.200.json').as('inputData');
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
    });

    context('current weather data', function () {
        beforeEach(function () {
            cy.get(`@weatherData`).its('current_weather').as('currentWeather');
        });

        it('contains the input values', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.values).to.contain(inputData.current);
                });
            });
        });

        it('contains the input units', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.units).to.contain(inputData.current_units);
                });
            });
        });

        context('mappings', function () {
            specify('has all correct mapped keys', function () {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped).to.have.keys([
                        'time',
                        'weather_code',
                        'temperature',
                        'temperature_range',
                        'precipitation',
                        'is_day',
                    ]);
                });
            })

            specify('time', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.time).to.eq('2023-11-14T21:30');
                });
            });

            specify('weather_code', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.weather_code).to.eq(3);
                });
            });

            specify('weather_code', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.is_day).to.eq(0);
                });
            });

            specify('temperature', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.temperature).to.eq(`51 °F`);
                });
            });

            specify('temperature_range', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.temperature_range).to.eq(`48 °F / 55 °F`);
                });
            });

            specify('precipitation', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.precipitation).to.eq(`0.1 inch`);
                });
            });
        });
    });

    context('hourly weather data', function () {
        beforeEach(function () {
            cy.get(`@weatherData`).its('current_weather').as('currentWeather');
            cy.get(`@weatherData`).its('hourly_weather').as('hourlyWeather');

            //There's no easy way to mock this so I'm pretty much lifting the code.
            //Find index of first hour greater than the start of the hour at the current time
            cy.get(`@inputData`).then(inputData => {
                const currentTime = inputData.current.time;
                const indexOfCurrentHour = inputData
                    .hourly
                    .time
                    .findIndex(t => gte(DateTime.fromISO(t).toMillis(), DateTime.fromISO(currentTime).startOf('hour').toMillis()));
                cy.wrap(currentTime).as(`currentTime`);
                cy.wrap(indexOfCurrentHour).as(`indexOfCurrentHour`);
            });
        });

        it('contains only the first 25 entries after the current hour', function () {
            //Current hour is from the input's "current" object or the output "current_weather.mapped.time"
            cy.get(`@hourlyWeather`).its('length').should('eq', 25);
            cy.get(`@currentTime`).then(currentTime => {
                cy.get(`@inputData`).then(({hourly}) => {
                    cy.get(`@indexOfCurrentHour`).then(indexOfCurrentHour => {
                        //Make sure the current hour is in the range, and then all hours after that
                        //will be the next 24 hours from the current
                        const filteredHourlyTimes = hourly.time.slice(indexOfCurrentHour, indexOfCurrentHour + 25);

                        expect(new Date(currentTime))
                            .to.be.above(new Date(filteredHourlyTimes[0]))
                            .and.below(new Date(filteredHourlyTimes[1]))
                        cy.get(`@hourlyWeather`).then(hourlyWeather => {
                            hourlyWeather.forEach((actualHour, i) => {
                                expect(actualHour.values.time).to.eq(filteredHourlyTimes[i])
                            });
                        });
                    });
                });
            });
        });

        it('contains the input units organized for each hour', function () {
            cy.get(`@hourlyWeather`).then(hourlyWeather => {
                cy.get(`@inputData`).then(({hourly_units}) => {
                    hourlyWeather.forEach(actualHour => {
                        expect(actualHour.units).to.have.keys(Object.keys(hourly_units));
                        Object.keys(hourly_units).forEach(k => {
                            expect(actualHour.units[k]).to.eq(hourly_units[k]);
                        });
                    });
                });
            });
        });

        it('contains the input values organized for each hour', function () {
            cy.get(`@hourlyWeather`).then(hourlyWeather => {
                cy.get(`@inputData`).then(({hourly}) => {
                    cy.get(`@indexOfCurrentHour`).then(indexOfCurrentHour => {
                        hourlyWeather.forEach((actualHour, i) => {
                            const inputDataHourlyMappedIndex = indexOfCurrentHour + i;
                            expect(actualHour.values).to.have.keys(Object.keys(hourly));
                            Object.keys(hourly).forEach(k => {
                                expect(actualHour.values[k]).to.eq(hourly[k][inputDataHourlyMappedIndex]);
                            });
                        });
                    });
                });
            });
        });

        context('mappings', function () {
            specify('has all correct mapped keys', function () {
                cy.get(`@hourlyWeather`).then(hourlyWeather => {
                    expect(hourlyWeather[0].mapped).to.have.keys([
                        'time',
                        'weather_code',
                        'is_day',
                        'temperature',
                        'precipitation',
                        'precipitation_probability',
                        'humidity',
                        'cloud_cover',
                        'visibility',
                        'wind',
                        'wind_gusts',
                    ]);
                });
            });

            //Only testing the first hour (after the current hour)
            bulkAssertMappedValues([
                {key: 'time', value: '2023-11-14T21:00'},
                {key: 'weather_code', value: 3},
                {key: 'temperature', value: `51 °F`},
                {key: 'precipitation', value: `0 inch`},
                {key: 'precipitation_probability', value: `15 %`},
                {key: 'humidity', value: `78 %`},
                {key: 'cloud_cover', value: `100 %`},
                {key: 'visibility', value: `79199.477 ft`},
                {key: 'wind', value: `8 mp/h SW`},
                {key: 'wind_gusts', value: `20 mp/h`},
            ], `@hourlyWeather`, 0);
        });
    });

    context('daily weather data', function () {
        beforeEach(function () {
            cy.get(`@weatherData`).its('daily_weather').as('dailyWeather');
        });

        it('contains only the first 7 entries which begin from the current day', function () {
            //The first day will begin at the current day
            cy.get(`@inputData`).then(inputData => {
                const currentDay = DateTime.fromISO(inputData.current.time).startOf('day').toISODate();
                const actualDays = inputData.daily.time.slice(0, 7);

                expect(actualDays[0]).to.eq(currentDay);
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    expect(dailyWeather).to.have.lengthOf(7);
                    dailyWeather.forEach((day, i) => {
                        expect(day.values.time).to.eq(actualDays[i])
                    });
                });
            });
        });

        it('contains the input units organized for each day', function () {
            cy.get(`@dailyWeather`).then(dailyWeather => {
                cy.get(`@inputData`).then(({daily_units}) => {
                    dailyWeather.forEach((day) => {
                        expect(day.units).to.have.keys(Object.keys(daily_units));
                        Object.keys(daily_units).forEach(k => {
                            expect(day.units[k]).to.eq(daily_units[k]);
                        });
                    });
                });
            });
        });

        it('contains the input values organized for each day', function () {
            cy.get(`@dailyWeather`).then(dailyWeather => {
                cy.get(`@inputData`).then(({daily}) => {
                    dailyWeather.forEach((actualDay, i) => {
                        expect(actualDay.values).to.have.keys(Object.keys(daily));
                        Object.keys(daily).forEach(k => {
                            expect(actualDay.values[k]).to.eq(daily[k][i]);
                        });
                    });
                });
            });
        });

        context('mappings', function () {
            specify('has all correct mapped keys', function () {
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    dailyWeather.forEach(actualDay => {
                        expect(actualDay.mapped).to.have.keys([
                            'time',
                            'temperature_range',
                            'precipitation',
                            'precipitation_probability',
                            'weather_code',
                            'sunrise',
                            'sunset',
                            'wind',
                            'wind_gusts',
                        ]);
                    })
                });
            });

            //Only validating the first day
            bulkAssertMappedValues([
                {key: 'time', value: '2023-11-14'},
                {key: 'weather_code', value: 80},
                {key: 'temperature_range', value: `48 °F / 55 °F`},
                {key: 'precipitation', value: `0.1 inch`},
                {key: 'precipitation_probability', value: `100 %`},
                {key: 'wind', value: `15 mp/h SW`},
                {key: 'wind_gusts', value: `41 mp/h`},
            ], `@dailyWeather`, 0);

            specify('sunrise', () => {
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    expect(dailyWeather[0].mapped.sunrise.toISO()).to.eq(`2023-11-14T07:26:00.000-05:00`);
                });
            });

            specify('sunset', () => {
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    expect(dailyWeather[0].mapped.sunset.toISO()).to.eq(`2023-11-14T16:15:00.000-05:00`);
                });
            });
        });
    });
});
