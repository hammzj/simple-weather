import WeatherIcon from "../../../src/components/weather.icon";
import WeatherIconObject from "../../page_objects/components/weather.icon.object";
import { weatherCodeToText } from "../../../src/components/utils";
import { WeatherCode } from "../../../src/services/open_meteo_api/forecast_api";

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

    [
        {
            weatherCode: WeatherCode.CLEAR_SKY,
            className: "wi-day-sunny",
            classNameNightVariant: "wi-night-clear",
        },
        {
            weatherCode: WeatherCode.MAINLY_CLEAR,
            className: "wi-day-sunny",
            classNameNightVariant: "wi-night-clear",
        },
        {
            weatherCode: WeatherCode.PARTLY_CLOUDY,
            className: "wi-day-cloudy",
            classNameNightVariant: "wi-night-alt-partly-cloudy",
        },
        {
            weatherCode: WeatherCode.OVERCAST,
            className: "wi-day-sunny-overcast",
            classNameNightVariant: "wi-night-alt-cloudy",
        },
        {
            weatherCode: WeatherCode.FOG,
            className: "wi-day-fog",
            classNameNightVariant: "wi-night-fog",
        },
        {
            weatherCode: WeatherCode.DEPOSITING_RIME_FOG,
            className: "wi-day-fog",
            classNameNightVariant: "wi-night-fog",
        },
        {
            weatherCode: WeatherCode.LIGHT_DRIZZLE,
            className: "wi-day-sprinkle",
            classNameNightVariant: "wi-night-alt-sprinkle",
        },
        {
            weatherCode: WeatherCode.MODERATE_DRIZZLE,
            className: "wi-day-sprinkle",
            classNameNightVariant: "wi-night-alt-sprinkle",
        },
        {
            weatherCode: WeatherCode.DENSE_DRIZZLE,
            className: "wi-day-sprinkle",
            classNameNightVariant: "wi-night-alt-sprinkle",
        },
        {
            weatherCode: WeatherCode.LIGHT_FREEZING_DRIZZLE,
            className: "wi-day-sprinkle",
            classNameNightVariant: "wi-night-alt-sprinkle",
        },
        {
            weatherCode: WeatherCode.DENSE_FREEZING_DRIZZLE,
            className: "wi-day-sprinkle",
            classNameNightVariant: "wi-night-alt-sprinkle",
        },
        {
            weatherCode: WeatherCode.SLIGHT_RAIN,
            className: "wi-day-rain",
            classNameNightVariant: "wi-night-alt-rain",
        },
        {
            weatherCode: WeatherCode.MODERATE_RAIN,
            className: "wi-day-rain",
            classNameNightVariant: "wi-night-alt-rain",
        },
        {
            weatherCode: WeatherCode.HEAVY_RAIN,
            className: "wi-day-rain",
            classNameNightVariant: "wi-night-alt-rain",
        },
        {
            weatherCode: WeatherCode.LIGHT_FREEZING_RAIN,
            className: "wi-day-rain",
            classNameNightVariant: "wi-night-alt-rain",
        },
        {
            weatherCode: WeatherCode.HEAVY_FREEZING_RAIN,
            className: "wi-day-rain",
            classNameNightVariant: "wi-night-alt-rain",
        },
        {
            weatherCode: WeatherCode.SLIGHT_RAIN_SHOWERS,
            className: "wi-day-showers",
            classNameNightVariant: "wi-night-alt-showers",
        },
        {
            weatherCode: WeatherCode.MODERATE_RAIN_SHOWERS,
            className: "wi-day-showers",
            classNameNightVariant: "wi-night-alt-showers",
        },
        {
            weatherCode: WeatherCode.VIOLENT_RAIN_SHOWERS,
            className: "wi-day-showers",
            classNameNightVariant: "wi-night-alt-showers",
        },
        {
            weatherCode: WeatherCode.SLIGHT_SNOWFALL,
            className: "wi-day-snow",
            classNameNightVariant: "wi-night-alt-snow",
        },
        {
            weatherCode: WeatherCode.MODERATE_SNOWFALL,
            className: "wi-day-snow",
            classNameNightVariant: "wi-night-alt-snow",
        },
        {
            weatherCode: WeatherCode.HEAVY_SNOWFALL,
            className: "wi-day-snow",
            classNameNightVariant: "wi-night-alt-snow",
        },
        {
            weatherCode: WeatherCode.SNOW_GRAINS,
            className: "wi-day-snow",
            classNameNightVariant: "wi-night-alt-snow",
        },
        {
            weatherCode: WeatherCode.LIGHT_SNOW_SHOWERS,
            className: "wi-day-sleet",
            classNameNightVariant: "wi-night-alt-sleet",
        },
        {
            weatherCode: WeatherCode.HEAVY_SNOW_SHOWERS,
            className: "wi-day-sleet",
            classNameNightVariant: "wi-night-alt-sleet",
        },
        {
            weatherCode: WeatherCode.THUNDERSTORM,
            className: "wi-day-thunderstorm",
            classNameNightVariant: "wi-night-alt-thunderstorm",
        },
        {
            weatherCode: WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL,
            className: "wi-day-thunderstorm",
            classNameNightVariant: "wi-night-alt-thunderstorm",
        },
        {
            weatherCode: WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL,
            className: "wi-day-thunderstorm",
            classNameNightVariant: "wi-night-alt-thunderstorm",
        },
        { weatherCode: -1, className: "wi-na", classNameNightVariant: "wi-na" },
    ].forEach(({ weatherCode, className, classNameNightVariant }) => {
        context(`Weather icon for ${WeatherCode[weatherCode]} (${weatherCode})`, () => {
            it("displays a unique icon per each weather code", function () {
                const wio = new WeatherIconObject();

                cy.mount(<WeatherIcon weatherCode={weatherCode} />);

                wio.icon.should("exist");
                wio.__assertIcon(`wi ${className}`);
            });

            it("has a nighttime icon variant", function () {
                const wio = new WeatherIconObject();

                cy.mount(<WeatherIcon weatherCode={weatherCode} isDay={0} />);

                wio.__assertIcon(`wi ${classNameNightVariant}`);
            });

            it("allows modifiers to be added", function () {
                const modifiers = ["wi-flip-horizontal", "wi-rotate-90", "wi-fw"];
                const wio = new WeatherIconObject();

                cy.mount(<WeatherIcon weatherCode={weatherCode} modifiers={modifiers} />);
                wio.__assertIcon(`wi ${className} wi-flip-horizontal wi-rotate-90 wi-fw`);

                cy.mount(<WeatherIcon weatherCode={weatherCode} modifiers={modifiers} isDay={0} />);
                wio.__assertIcon(
                    `wi ${classNameNightVariant} wi-flip-horizontal wi-rotate-90 wi-fw`
                );
            });

            it("has hover text to describe the icon", function () {
                const wio = new WeatherIconObject();

                cy.mount(<WeatherIcon weatherCode={weatherCode} />);

                wio.container.trigger("mouseover");

                cy.get(`.MuiTooltip-tooltip`)
                    .should("contain.text", weatherCodeToText(weatherCode))
                    .and("not.be.empty");
            });
        });
    });
});
