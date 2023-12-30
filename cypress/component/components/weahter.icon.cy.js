import WeatherIcon from '../../../src/components/weather.icon';
import WeatherIconObject from '../../page_objects/components/weather.icon.object';
import {weatherCodeToText} from "../../../src/components/utils";
import {WeatherCode} from "../../../src/services/open_meteo_api/forecast_api";

//Enums are weird
const stringKeys = Object
    .keys(WeatherCode)
    .filter((v) => isNaN(Number(v)));

describe(WeatherIcon.name, function () {
    for (const key of stringKeys) {
        context(`Details per weather code: ${key}`, function () {
            const value = WeatherCode[key]
            beforeEach(function () {
                cy.mount(<WeatherIcon weatherCode={value}/>)
            });

            it('displays a unique icon per each weather code', function () {
                //TODO: make this more robust and check the data-testid
                const wio = new WeatherIconObject();

                cy.log(weatherCodeToText(value))
                wio.container.find('svg').should('exist');
            });

            it('has hover text to describe the icon', function () {
                const wio = new WeatherIconObject();

                wio.container.trigger('mouseover');

                cy.get(`.MuiTooltip-tooltip`).should('contain.text', weatherCodeToText(value));
            });
        });
    }

    it('does not return anything it cannot match the weather code', function () {
        const wio = new WeatherIconObject();

        //No weather code
        cy.mount(<WeatherIcon/>)
        wio.container.find(`svg`).should('not.exist');

        //With a fake weather code
        cy.mount(<WeatherIcon weatherCode={-1}/>);
        wio.container.find(`svg`).should('not.exist');
    });
});
