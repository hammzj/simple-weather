import SavedLocations from "../../../src/components/saved.locations";
import SavedLocationsObject from "../../page_objects/components/saved.locations.object";

describe(SavedLocations.name, function () {
    beforeEach(function () {
        //Avoid Initial call at all times
        cy.intercept(`*open-meteo*`).as("openMeteo");
        //Stub location data
        cy.fixture("/open_meteo_api/geocoding_api/search.for.locations.200.berlin").as(
            "locationDataResults"
        );
        cy.get(`@locationDataResults`).then((locationDataResults) => {
            cy.intercept(`*/search*`, locationDataResults).as("searchForLocations");
            cy.wrap(locationDataResults.results[0]).as("individualLocation");
        });
        //Stub weather data
        //This will not match the actual options supplied
        //We need to just ensure the request was sent with the wanted options
        cy.stubAndAliasWeatherData({
            fetchWeatherResponseFixture: "fetch.all.weather.for.location.200.berlin.json",
        });
    });

    it("can display current weather details for a saved location", function () {
        cy.get(`@individualLocation`).then((individualLocation) => {
            cy.mount(<SavedLocations locationId={individualLocation.id} />);

            const slo = new SavedLocationsObject();
            slo.components.CurrentWeatherCardObject((cwco) => {
                cwco.scopedIndex = 0;
                cwco.elements.location().should("have.text", "Berlin, Land Berlin, Germany");
                cwco.elements.temperature().should("have.text", "51 °F");
                cwco.elements.temperatureRange().should("have.text", "48 °F / 55 °F");
                cwco.components.PrecipitationChanceObject((pco) => pco.assertValue("0.1 inch"));
                cwco.components.WeatherIconObject((wio) => wio.elements.icon().should("exist"));
                cwco.elements.time().should("have.text", "Last updated: Nov 14, 2023, 9:30 PM");
            });
        });
    });

    it("has a link to the weather page for the saved location", function () {
        cy.get(`@individualLocation`).then((individualLocation) => {
            cy.mount(<SavedLocations locationId={individualLocation.id} />);

            const slo = new SavedLocationsObject();
            slo.components.CurrentWeatherCardObject((cwco) => {
                cwco.scopedIndex = 0;
                cwco.container().parents("a").should("have.attr", "href", "/weather?id=2950159");
            });
        });
    });

    it('has a fallback message when the component or data fails to load', function () {
        cy.intercept(`*/forecast*`, {forceNetworkError: true})
        cy.intercept('https://geocoding-api.open-meteo.com/v1/*', {forceNetworkError: true})
        cy.get(`@individualLocation`).then((individualLocation) => {
            cy.mount(<SavedLocations locationId={individualLocation.id}/>);
            const slo = new SavedLocationsObject();
            slo.container().should('contain.text', 'Data could not be loaded.')
        })
    })
});
