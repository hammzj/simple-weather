import WeatherIcon from "../../../src/components/weather.icon";
import WeatherIconObject from "../../page_objects/components/weather.icon.object";
import { weatherCodeToText, weatherCodeToClassName } from "../../../src/components/utils";
import { WeatherCode } from "../../../src/services/open_meteo_api/forecast_api";

//Enums are weird
const stringKeys = Object.keys(WeatherCode).filter((v) => isNaN(Number(v)));

describe(WeatherIcon.name, function () {
    it('returns "not available" if the weather code does not exist', function () {
        const wio = new WeatherIconObject();

        //No weather code
        cy.mount(<WeatherIcon />);
        wio.__assertIcon("wi wi-na");

        //With a fake weather code
        cy.mount(<WeatherIcon weatherCode={-1} />);
        wio.__assertIcon("wi wi-na");
    });

    for (const key of stringKeys) {
        context(`Details per weather code: ${key}`, function () {
            const value = WeatherCode[key];
            beforeEach(function () {
                cy.mount(<WeatherIcon weatherCode={value} />);
            });

            it("displays a unique icon per each weather code", function () {
                const wio = new WeatherIconObject();

                wio.icon.should("exist");
                //Lol so redundant but I'll test "weatherCodeToClassName" in the utils spec
                wio.__assertIcon(weatherCodeToClassName(value));
            });

            it("has hover text to describe the icon", function () {
                const wio = new WeatherIconObject();

                wio.container.trigger("mouseover");

                cy.get(`.MuiTooltip-tooltip`).should("contain.text", weatherCodeToText(value));
            });
        });
    }
});
