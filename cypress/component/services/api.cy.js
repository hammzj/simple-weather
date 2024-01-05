import SimpleWeatherAPI from "../../../src/services/api";

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

            specify('precipitation', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.precipitation).to.eq(`0.1 inch`);
                });
            });

            specify('temperature_range', () => {
                cy.get(`@currentWeather`).then(currentWeather => {
                    expect(currentWeather.mapped.temperature_range).to.eq(`48 °F / 55 °F`);
                });
            });
        });
    });

    context('hourly weather data', function () {
        beforeEach(function () {
            cy.get(`@weatherData`).its('hourly_weather').as('hourlyWeather');
        });

        //TODO: make sure we align the current hour. Might need to use clock
        it('contains only the first 25 entries after the current hour', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@hourlyWeather`).its('length').should('eq', 25);

                //fix this here
                const actualHours = inputData.hourly.time.slice(0, 25);
                cy.get(`@hourlyWeather`).then(hourlyWeather => {
                    hourlyWeather.forEach((hour, i) => {
                        expect(hour.values.time).to.eq(actualHours[i])
                    });
                });
            });
        });

        //TODO
        it('contains the input values organized for each hour', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@hourlyWeather`).then(hourlyWeather => {
                    expect(hourlyWeather.values).to.contain(inputData.hourly);
                });
            });
        });

        //TODO
        it('contains the input units organized for each hour', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@hourlyWeather`).then(hourlyWeather => {
                    expect(hourlyWeather.units).to.contain(inputData.hourly_units);
                });
            });
        });

        //TODO
        context('mappings', function () {

        });
    });

    context('daily weather data', function () {
        beforeEach(function () {
            cy.get(`@weatherData`).its('daily_weather').as('dailyWeather');
        });

        it.only('contains only the first 7 entries', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@dailyWeather`).its('length').should('eq', 7);

                //fix this here
                const actualDays = inputData.daily.time.slice(0, 7);
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    dailyWeather.forEach((day, i) => {
                        expect(day.values.time).to.eq(actualDays[i])
                    });
                });
            });
        });


        //TODO
        it('contains the input values organized for each day', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    expect(dailyWeather.values).to.contain(inputData.daily);
                });
            });
        });

        //TODO
        it('contains the input units organized for each day', function () {
            cy.get(`@inputData`).then(inputData => {
                cy.get(`@dailyWeather`).then(dailyWeather => {
                    expect(dailyWeather.units).to.contain(inputData.daily_units);
                });
            });
        });

        //TODO
        context('mappings', function () {

        });
    });
});
