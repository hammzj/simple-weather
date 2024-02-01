import CurrentWeatherCard from "../../../src/components/current.weather.card";
import CurrentWeatherCardObject from "../../page_objects/components/current.weather.card.object";
import { getLocationName } from "../../../src/services/open_meteo_api/utils";
import { IsDay } from "../../../src/services/api";

describe(CurrentWeatherCard.name, function () {
    beforeEach(function () {
        cy.fixture("/open_meteo_api/geocoding_api/individual.location.berlin").as("locationData");
        cy.stubAndAliasWeatherData({
            fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
        });
    });

    specify("can display current weather details for a given location", function () {
        cy.get(`@locationData`).then((locationData) => {
            cy.get(`@weatherData`).then((weatherData) => {
                cy.mount(
                    <CurrentWeatherCard
                        locationName={getLocationName(locationData)}
                        currentWeatherData={weatherData.current_weather}
                    />
                );

                const cwco = new CurrentWeatherCardObject();

                cwco.location.should("have.text", "Berlin, Land Berlin, Germany");
                cwco.temperature.should("have.text", "51 °F");
                cwco.temperatureRange.should("have.text", "48 °F / 55 °F");
                cwco.PrecipitationChanceObject((pco) => pco._assertValue("0.1 inch"));
                cwco.WeatherIconObject((wio) => wio.__assertTooltipText("Overcast"));
                cwco.time.should("have.text", "Last updated: Nov 14, 2023, 9:30 PM");
            });
        });
    });

    [
        { key: IsDay.DAY, expectedClassName: "wi wi-day-sunny-overcast" },
        { key: IsDay.NIGHT, expectedClassName: "wi wi-night-alt-cloudy" },
    ].forEach(({ key, expectedClassName }) => {
        specify(`displays the variant for the weather icon at ${IsDay[key]}`, function () {
            cy.get(`@locationData`).then((locationData) => {
                cy.get(`@weatherData`).then((weatherData) => {
                    weatherData.current_weather.mapped.is_day = key;
                    cy.mount(
                        <CurrentWeatherCard
                            locationName={getLocationName(locationData)}
                            currentWeatherData={weatherData.current_weather}
                        />
                    );

                    const cwco = new CurrentWeatherCardObject();

                    cwco.WeatherIconObject((wio) => {
                        wio.__assertTooltipText("Overcast");
                        wio.__assertIcon(expectedClassName);
                    });
                });
            });
        });
    });

    /*
     * Issue 39: https://github.com/hammzj/simple-weather/issues/39
     * This is a specific case as I wasn't accounting for JavaScript recognizing "0" as false. Thanks JavaScript
     */
    specify("displays an icon for the weather code of 0", function () {
        cy.get(`@locationData`).then((locationData) => {
            cy.get(`@weatherData`).then((weatherData) => {
                weatherData.current_weather.mapped.weather_code = 0;
                weatherData.current_weather.mapped.is_day = 0;
                cy.mount(
                    <CurrentWeatherCard
                        locationName={getLocationName(locationData)}
                        currentWeatherData={weatherData.current_weather}
                    />
                );

                const cwco = new CurrentWeatherCardObject();

                cwco.WeatherIconObject((wio) => {
                    wio.__assertTooltipText("Clear sky");
                    wio.__assertIcon("wi wi-day-sunny");
                });
            });
        });
    });
});
