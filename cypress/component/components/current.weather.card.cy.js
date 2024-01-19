import CurrentWeatherCard from "../../../src/components/current.weather.card";
import CurrentWeatherCardObject from "../../page_objects/components/current.weather.card.object";
import { getLocationName } from "../../../src/services/open_meteo_api/utils";

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
                cwco.WeatherIconObject((wio) => wio.container.find(`svg`).should("exist"));
                cwco.time.should("have.text", "Last updated: Nov 14, 2023, 9:30 PM");
            });
        });
    });
});
