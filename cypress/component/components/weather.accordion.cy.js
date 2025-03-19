import { DateTime } from "luxon";
import WeatherAccordion, {
    AdditionalWeatherDetails,
} from "../../../src/components/weather.accordion";
import WeatherAccordionObject from "../../page_objects/components/weather.accordion.object";
import AdditionalWeatherDetailsObject from "../../page_objects/components/additional.weather.details.object";
import { IsDay } from "../../../src/services/api";

const formatDateTimeHourly = (isoString) =>
    DateTime.fromISO(isoString).toLocaleString(DateTime.DATETIME_MED);
const formatDateTimeDaily = (isoString) =>
    DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
const formatDateTimeToday = (isoString) =>
    `${DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_MED)} (Today)`;
const formatDateTimeAsTime = (isoString) =>
    DateTime.fromISO(isoString).toLocaleString(DateTime.TIME_SIMPLE);

describe("Components", function () {
    describe(WeatherAccordion.name, function () {
        beforeEach(function () {
            cy.stubAndAliasWeatherData({
                fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
            });
        });

        context("Hourly", function () {
            context("Summary", function () {
                it("displays a summary of the hourly data", function () {
                    cy.get(`@weatherData`).then((weatherData) => {
                        const firstHour = weatherData.hourly_weather[0];
                        cy.mount(
                            <WeatherAccordion type='hourly' mappedWeatherData={firstHour.mapped} />
                        );

                        const accordion = new WeatherAccordionObject("hourly");
                        accordion.elements
                            .time()
                            .should("have.text", formatDateTimeHourly(firstHour.mapped.time));
                        accordion.elements.temperature().should("have.text", "51 °F");
                        accordion.components.WeatherIconObject((wio) => {
                            wio.assertTooltipText("Overcast");
                        });
                        accordion.components.PrecipitationChanceObject((pio) =>
                            pio.assertValue("15 %")
                        );
                    });
                });

                [
                    { key: IsDay.DAY, expectedClassName: "wi wi-day-sunny-overcast" },
                    { key: IsDay.NIGHT, expectedClassName: "wi wi-night-alt-cloudy" },
                ].forEach(({ key, expectedClassName }) => {
                    it(`displays the weather icon variant when at ${IsDay[key]}`, function () {
                        cy.get(`@weatherData`).then((weatherData) => {
                            //Force the mapped data to set at night, regardless of what the time is
                            const firstHour = weatherData.hourly_weather[0];
                            firstHour.mapped.is_day = key;

                            cy.mount(
                                <WeatherAccordion
                                    type='hourly'
                                    mappedWeatherData={firstHour.mapped}
                                />
                            );

                            const accordion = new WeatherAccordionObject("hourly");
                            accordion.components.WeatherIconObject((wio) => {
                                wio.assertTooltipText("Overcast");
                                wio.assertIcon(expectedClassName);
                            });
                        });
                    });
                });
            });

            it("displays the additional weather details when opened", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstHour = weatherData.hourly_weather[0];

                    cy.mount(
                        <WeatherAccordion type='hourly' mappedWeatherData={firstHour.mapped} />
                    );

                    const accordion = new WeatherAccordionObject("hourly");
                    accordion.elements.summary().click();

                    accordion.components.AdditionalWeatherDetailsObject((awdo) => {
                        awdo.assertTitleAndValue("Temperature:", `51 °F`);
                        awdo.assertTitleAndValue("Precipitation:", `0 inch`);
                        awdo.assertTitleAndValue("Precipitation probability:", `15 %`);
                    });
                });
            });
        });

        context("Daily", function () {
            context("Summary", function () {
                it("displays a summary of the daily data", function () {
                    cy.get(`@weatherData`).then((weatherData) => {
                        const firstDay = weatherData.daily_weather[0];

                        cy.mount(
                            <WeatherAccordion type='daily' mappedWeatherData={firstDay.mapped} />
                        );

                        const accordion = new WeatherAccordionObject("daily");
                        accordion.elements
                            .time()
                            .should("have.text", formatDateTimeDaily(firstDay.mapped.time));
                        accordion.elements.temperature().should("have.text", "48 °F / 55 °F");
                        accordion.components.WeatherIconObject((wio) => {
                            wio.assertTooltipText("Slight rain showers");
                            //Daytime variant
                            wio.assertIcon("wi wi-day-showers");
                        });
                        accordion.components.PrecipitationChanceObject((pio) =>
                            pio.assertValue("100 %")
                        );
                    });
                });

                it("lets the user know when the summary is for the current day", function () {
                    cy.get(`@weatherData`).then((weatherData) => {
                        const firstDay = weatherData.daily_weather[0];
                        const secondDay = weatherData.daily_weather[1];
                        const accordion = new WeatherAccordionObject("daily");
                        cy.clock(DateTime.fromISO(firstDay.mapped.time).toMillis());

                        cy.mount(
                            <WeatherAccordion type='daily' mappedWeatherData={firstDay.mapped} />
                        );
                        accordion.elements
                            .time()
                            .should("have.text", formatDateTimeToday(firstDay.mapped.time));

                        cy.mount(
                            <WeatherAccordion type='daily' mappedWeatherData={secondDay.mapped} />
                        );
                        accordion.elements
                            .time()
                            .should("have.text", formatDateTimeDaily(secondDay.mapped.time));
                    });
                });
            });

            it("displays the additional weather details when opened", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstDay = weatherData.daily_weather[0];

                    cy.mount(<WeatherAccordion type='daily' mappedWeatherData={firstDay.mapped} />);

                    const accordion = new WeatherAccordionObject("daily");
                    accordion.elements.summary().click();

                    accordion.components.AdditionalWeatherDetailsObject((awdo) => {
                        awdo.assertTitleAndValue("Temperature Low/High:", `48 °F / 55 °F`);
                        awdo.assertTitleAndValue("Precipitation:", `0.1 inch`);
                        awdo.assertTitleAndValue("Precipitation probability:", `100 %`);
                    });
                });
            });
        });
    });

    describe(AdditionalWeatherDetails.name, function () {
        beforeEach(function () {
            cy.stubAndAliasWeatherData({
                fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
            });
        });

        context("Hourly", function () {
            specify("the row order is correct", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstHour = weatherData.hourly_weather[0];

                    cy.mount(
                        <AdditionalWeatherDetails
                            type='hourly'
                            mappedWeatherData={firstHour.mapped}
                        />
                    );

                    const awdo = new AdditionalWeatherDetailsObject();
                    awdo.assertRowTitlesInOrder([
                        "Temperature:",
                        "Conditions:",
                        "Precipitation:",
                        "Precipitation probability:",
                        "Wind:",
                        "Wind gusts:",
                        "Humidity:",
                        "Cloud cover:",
                    ]);
                });
            });

            it("can display details for a set of hourly data", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstHour = weatherData.hourly_weather[0];

                    cy.mount(
                        <AdditionalWeatherDetails
                            type='hourly'
                            mappedWeatherData={firstHour.mapped}
                        />
                    );

                    const awdo = new AdditionalWeatherDetailsObject();
                    awdo.assertTitleAndValue("Temperature:", "51 °F");
                    awdo.assertTitleAndValue("Conditions:", "Overcast");
                    awdo.assertTitleAndValue("Precipitation:", "0 inch");
                    awdo.assertTitleAndValue("Precipitation probability:", "15 %");
                    awdo.assertTitleAndValue("Wind:", "8 mp/h SW");
                    awdo.assertTitleAndValue("Wind gusts:", "20 mp/h");
                    awdo.assertTitleAndValue("Humidity:", "78 %");
                    awdo.assertTitleAndValue("Cloud cover:", "100 %");
                });
            });

            specify("rows have default text when the data has a missing value", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstHourWithMissingData = weatherData.hourly_weather[0];
                    delete firstHourWithMissingData.mapped.precipitation;
                    delete firstHourWithMissingData.mapped.precipitation_probability;

                    cy.mount(
                        <AdditionalWeatherDetails
                            type='hourly'
                            mappedWeatherData={firstHourWithMissingData.mapped}
                        />
                    );

                    const awdo = new AdditionalWeatherDetailsObject();
                    awdo.assertTitleAndValue("Temperature:", "51 °F"); //Spot check that nothing else is affected
                    awdo.assertTitleAndValue("Precipitation:", "N/A");
                    awdo.assertTitleAndValue("Precipitation probability:", "N/A");
                });
            });
        });

        context("Daily", function () {
            specify("the row order is correct", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstDay = weatherData.daily_weather[0];

                    cy.mount(
                        <AdditionalWeatherDetails
                            type='daily'
                            mappedWeatherData={firstDay.mapped}
                        />
                    );

                    const awdo = new AdditionalWeatherDetailsObject();
                    awdo.assertRowTitlesInOrder([
                        "Temperature Low/High:",
                        "Conditions:",
                        "Precipitation:",
                        "Precipitation probability:",
                        "Wind (with dominant direction):",
                        "Wind gusts:",
                        "Sunrise:",
                        "Sunset:",
                    ]);
                });
            });

            it("can display details for a set of hourly data", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstDay = weatherData.daily_weather[0];

                    cy.mount(
                        <AdditionalWeatherDetails
                            type='daily'
                            mappedWeatherData={firstDay.mapped}
                        />
                    );

                    const awdo = new AdditionalWeatherDetailsObject();
                    awdo.assertTitleAndValue("Temperature Low/High:", "48 °F / 55 °F");
                    awdo.assertTitleAndValue("Conditions:", "Slight rain showers");
                    awdo.assertTitleAndValue("Precipitation:", "0.1 inch");
                    awdo.assertTitleAndValue("Precipitation probability:", "100 %");
                    awdo.assertTitleAndValue("Wind (with dominant direction):", "15 mp/h SW");
                    awdo.assertTitleAndValue("Wind gusts:", "41 mp/h");
                    awdo.assertTitleAndValue(
                        "Sunrise:",
                        formatDateTimeAsTime(firstDay.mapped.sunrise)
                    );
                    awdo.assertTitleAndValue(
                        "Sunset:",
                        formatDateTimeAsTime(firstDay.mapped.sunset)
                    );
                });
            });

            specify("rows have default text when the data has a missing value", function () {
                cy.get(`@weatherData`).then((weatherData) => {
                    const firstDayWithMissingData = weatherData.daily_weather[0];
                    delete firstDayWithMissingData.mapped.precipitation;
                    delete firstDayWithMissingData.mapped.precipitation_probability;

                    cy.mount(
                        <AdditionalWeatherDetails
                            type='daily'
                            mappedWeatherData={firstDayWithMissingData.mapped}
                        />
                    );

                    const awdo = new AdditionalWeatherDetailsObject();
                    awdo.assertTitleAndValue("Temperature Low/High:", "48 °F / 55 °F"); //Spot check that nothing else is affected
                    awdo.assertTitleAndValue("Precipitation:", "N/A");
                    awdo.assertTitleAndValue("Precipitation probability:", "N/A");
                });
            });
        });
    });
});
