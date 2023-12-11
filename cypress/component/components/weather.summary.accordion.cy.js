import WeatherSummaryAccordion from '../../../src/components/weather.summary.accordion';

describe('WeatherSummaryAccordion', function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
    });
    context('Hourly', function () {
        it.only('displays a summary of the hourly data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHour = weatherData.hourly_weather[0];

                cy.mount(<WeatherSummaryAccordion
                    type='hourly'
                    mappedWeatherData={firstHour.mapped}
                />)

                cy.get('#time').should('have.text', 'Nov 14, 2023, 12:00 AM');
                cy.get('#temperature').should('have.text', '49 °F');
                cy.get('#weather-icon').find('svg').should('exist');
                cy.get('#precipitation-item').should('have.text', '28 %');
            })
        })

    })
    context('Daily', function () {
        it.only('displays a summary of the daily data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstDay = weatherData.daily_weather[0];

                cy.mount(<WeatherSummaryAccordion
                    type='daily'
                    mappedWeatherData={firstDay.mapped}
                />)

                cy.get('#time').should('have.text', 'Nov 14, 2023');
                cy.get('#temperature').should('have.text', '48 °F / 55 °F');
                cy.get('#weather-icon').find('svg').should('exist');
                cy.get('#precipitation-item').should('have.text', '100 %');
            })
        })

    })
})
