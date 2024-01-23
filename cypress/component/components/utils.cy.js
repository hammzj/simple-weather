import * as utils from "../../../src/components/utils";
import { WeatherCode } from "../../../src/services/open_meteo_api/forecast_api";
import { weatherCodeToText } from "../../../src/components/utils";

describe("Utility functions", function () {
    context(utils.weatherCodeToClassName.name, function () {
        [
            [WeatherCode.CLEAR_SKY, "wi-day-sunny", "wi-night-clear"],
            [WeatherCode.MAINLY_CLEAR, "wi-day-cloudy", "wi-night-alt-cloudy"],
            [WeatherCode.PARTLY_CLOUDY, "wi-day-cloudy", "wi-night-alt-cloudy"],
            [WeatherCode.OVERCAST, "wi-day-cloudy-high", "wi-night-alt-cloudy-high"],
            [WeatherCode.FOG, "wi-day-fog", "wi-night-fog"],
            [WeatherCode.DEPOSITING_RIME_FOG, "wi-day-fog", "wi-night-fog"],
            [WeatherCode.LIGHT_DRIZZLE, "wi-day-sprinkle", "wi-night-alt-sprinkle"],
            [WeatherCode.MODERATE_DRIZZLE, "wi-day-sprinkle", "wi-night-alt-sprinkle"],
            [WeatherCode.DENSE_DRIZZLE, "wi-day-sprinkle", "wi-night-alt-sprinkle"],
            [WeatherCode.LIGHT_FREEZING_DRIZZLE, "wi-day-sprinkle", "wi-night-alt-sprinkle"],
            [WeatherCode.DENSE_FREEZING_DRIZZLE, "wi-day-sprinkle", "wi-night-alt-sprinkle"],
            [WeatherCode.SLIGHT_RAIN, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.MODERATE_RAIN, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.HEAVY_RAIN, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.LIGHT_FREEZING_RAIN, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.HEAVY_FREEZING_RAIN, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.SLIGHT_RAIN_SHOWERS, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.MODERATE_RAIN_SHOWERS, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.VIOLENT_RAIN_SHOWERS, "wi-day-rain", "wi-night-alt-rain"],
            [WeatherCode.SLIGHT_SNOWFALL, "wi-day-snow", "wi-night-alt-snow"],
            [WeatherCode.MODERATE_SNOWFALL, "wi-day-snow", "wi-night-alt-snow"],
            [WeatherCode.HEAVY_SNOWFALL, "wi-day-snow", "wi-night-alt-snow"],
            [WeatherCode.SNOW_GRAINS, "wi-day-snow", "wi-night-alt-snow"],
            [WeatherCode.LIGHT_SNOW_SHOWERS, "wi-day-snow", "wi-night-alt-snow"],
            [WeatherCode.HEAVY_SNOW_SHOWERS, "wi-day-snow", "wi-night-alt-snow"],
            [WeatherCode.THUNDERSTORM, "wi-day-thunderstorm", "wi-night-alt-thunderstorm"],
            [
                WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL,
                "wi-day-thunderstorm",
                "wi-night-alt-thunderstorm",
            ],
            [
                WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL,
                "wi-day-thunderstorm",
                "wi-night-alt-thunderstorm",
            ],
            [-1, "wi-na", "wi-na"],
        ].forEach((inputs) => {
            runTestsFor_weatherCodeToClassName(...inputs);
        });
    });

    context(utils.weatherCodeToText.name, function () {
        it("produces a readable name", () => {
            expect(weatherCodeToText(WeatherCode.MAINLY_CLEAR)).to.eq("Mainly clear");
            expect(weatherCodeToText(WeatherCode.THUNDERSTORM)).to.eq("Thunderstorm");
            expect(weatherCodeToText(WeatherCode.DEPOSITING_RIME_FOG)).to.eq("Depositing rime fog");
            expect(weatherCodeToText(-1)).to.eq("N/A");
        });
    });
});

function runTestsFor_weatherCodeToClassName(weatherCode, className, classNameNightVariant) {
    context(`Weather code for ${WeatherCode[weatherCode]} (${weatherCode})`, () => {
        it("has the correct class", () => {
            expect(utils.weatherCodeToClassName(weatherCode)).to.eq(`wi ${className}`);
        });

        it("converts to the nighttime variant when specified", () => {
            expect(utils.weatherCodeToClassName(weatherCode, [], false)).to.eq(
                `wi ${classNameNightVariant}`
            );
        });

        it("allows modifiers to be added", () => {
            const modifiers = ["wi-flip-horizontal", "wi-rotate-90", "wi-fw"];
            expect(utils.weatherCodeToClassName(weatherCode, modifiers)).to.eq(
                `wi ${className} wi-flip-horizontal wi-rotate-90 wi-fw`
            );

            expect(utils.weatherCodeToClassName(weatherCode, modifiers, false)).to.eq(
                `wi ${classNameNightVariant} ${modifiers.join(" ")}`
            );
        });
    });
}
