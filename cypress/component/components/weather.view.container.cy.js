import {DateTime} from "luxon";
import {NOT_AVAILABLE_TEXT} from "../../../src/constants";
import WeatherViewContainer from "../../../src/components/weather.view.container";
import WeatherViewContainerObject from "../../page_objects/components/weather.view.container.object";

describe(WeatherViewContainer.name, function () {
    beforeEach(function () {
        cy.stubAndAliasWeatherData({
            fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
        });
        cy.get(`@weatherData`).then((weatherData) => {
            cy.mount(<WeatherViewContainer totalWeatherData={weatherData}/>);
        });
    });

    it('defaults to "Hourly" data', function () {
        const wvco = new WeatherViewContainerObject();
        wvco.elements.hourlyButton().should("have.attr", "aria-selected", "true");
    });

    it('displays "Hourly" data when selected', function () {
        const wvco = new WeatherViewContainerObject();

        wvco.elements.hourlyButton().click();

        wvco.components.HourlyWeatherAccordionObject((obj) =>
            obj.getAllContainers().should("have.lengthOf", 25)
        );
        wvco.components.DailyWeatherAccordionObject((obj) => obj.getAllContainers().should("not.exist"));
        cy.get(`@weatherData`).then((weatherData) => {
            const {hourly_weather} = weatherData;
            for (const [i, {mapped}] of hourly_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATETIME_MED);
                const precipitationProbability =
                    mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.components.HourlyWeatherAccordionObject((obj) => {
                    obj.scopedIndex = i;
                    obj.elements.time().should("have.text", time);
                    obj.elements.temperature().should("have.text", mapped.temperature);
                    obj.components.WeatherIconObject((wio) => wio.elements.icon().should("exist"));
                    obj.components.PrecipitationChanceObject((pio) =>
                        pio.assertValue(precipitationProbability)
                    );
                });
                cy.wait(50);
            }
        });
    });

    it('displays "Daily" data when selected', function () {
        const wvco = new WeatherViewContainerObject();

        wvco.elements.dailyButton().click();

        wvco.components.DailyWeatherAccordionObject((obj) =>
            obj.getAllContainers().should("have.lengthOf", 7)
        );
        wvco.components.HourlyWeatherAccordionObject((obj) => obj.getAllContainers().should("not.exist"));
        cy.get(`@weatherData`).then((weatherData) => {
            const {daily_weather} = weatherData;
            for (const [i, {mapped}] of daily_weather.entries()) {
                const time = DateTime.fromISO(mapped.time).toLocaleString(DateTime.DATE_MED);
                const precipitationProbability =
                    mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                wvco.components.DailyWeatherAccordionObject((obj) => {
                    obj.scopedIndex = i;
                    obj.elements.time().should("have.text", time);
                    obj.elements.temperature().should("have.text", mapped.temperature_range);
                    obj.components.WeatherIconObject((wio) => wio.elements.icon().should("exist"));
                    obj.components.PrecipitationChanceObject((pio) =>
                        pio.assertValue(precipitationProbability)
                    );
                });
                cy.wait(50);
            }
        });
    });

    specify("Opening the details for one accordion should close any other open ones", function () {
        const wvco = new WeatherViewContainerObject();

        wvco.elements.hourlyButton().click();

        wvco.components.HourlyWeatherAccordionObject((firstAccordion) => {
            //Arrange: make sure that the first accordion is expanded
            //Set the scope to the first-found accordion
            firstAccordion.scopedIndex = 0;
            firstAccordion.container().click();
            firstAccordion.container().should("have.class", "Mui-expanded");
        });
        wvco.components.HourlyWeatherAccordionObject((secondAccordion) => {
            //Set the scope to the second-found accordion
            secondAccordion.scopedIndex = 1;

            //Arrange: the second one is starting as collapsed
            secondAccordion.container().should("not.have.class", "Mui-expanded");

            //Act: Click the second one to expand it
            secondAccordion.container().click();

            //Assertion: Only the second one should be expanded
            secondAccordion.container().should("have.class", "Mui-expanded");
        });
        wvco.components.HourlyWeatherAccordionObject((firstAccordion) => {
            //Assertion pt 2: Only the second one should be expanded
            firstAccordion.scopedIndex = 0;
            firstAccordion.container().should("have.not.class", "Mui-expanded");
        });
    });

    it(`will display a warning message when no data has been returned for Hourly weather`, function () {
        //Replace original mounted component
        cy.mount(<WeatherViewContainer totalWeatherData={{}}/>);

        const wvco = new WeatherViewContainerObject();

        wvco.elements.hourlyButton().click();
        wvco.elements.weatherTabPanelHourly().should(
            "have.text",
            "No data could be returned for the location."
        );

        wvco.elements.dailyButton().click();
        wvco.elements.weatherTabPanelDaily().should(
            "have.text",
            "No data could be returned for the location."
        );
    });
});
