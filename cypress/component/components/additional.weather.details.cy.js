import DetailedViewContainer from '../../../src/components/additional.weather.details';

describe('DetailedViewContainer', function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({fetchWeatherResponseFixture: 'fetch.all.weather.for.location.200.json'});
    });
    context('Hourly', function () {

        specify('can display details for a set of hourly data', function () {
            cy.get(`@weatherData`).then(weatherData => {
                const firstHour = weatherData.hourly_weather[0];

                cy.mount(<DetailedViewContainer
                    type='hourly'
                    mappedWeatherData={firstHour.mapped}
                />)

                /*
                Precipitation:	0 inch
                Precipitation probability:	28 %
                Humidity:	91 %
                Cloud cover:	80 %
                Wind:	N/A
                Wind gusts:	14.8 mp/h
                 */
                cy.contains(`td`, 'Temperature').parent().find(`td`).eq(1)
                    .should('have.text', '49 °F');
                cy.contains(`td`, 'Conditions:').parent().find(`td`).eq(1)
                    .should('have.text', 'partly cloudy');
                cy.contains(`td`, 'Precipitation:').parent().find(`td`).eq(1)
                    .should('have.text', '0.010 inch');
                cy.contains(`td`, 'Precipitation probability:').parent().find(`td`).eq(1)
                    .should('have.text', '28 %');
                cy.contains(`td`, 'Humidity:').parent().find(`td`).eq(1)
                    .should('have.text', '91 %');
                cy.contains(`td`, 'Cloud cover:').parent().find(`td`).eq(1)
                    .should('have.text', '80 %');
                cy.contains(`td`, 'Wind:').parent().find(`td`).eq(1)
                    .should('have.text', '7 mp/h W');
                cy.contains(`td`, 'Wind gusts:').parent().find(`td`).eq(1)
                    .should('have.text', '15 mp/h');
            })
        })
    })
    context('Daily', function () {})
})
