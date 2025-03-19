import IndexPageObject from "../page_objects/pages/index.page.object";
import { isNumber } from "lodash";

/**
 *
 * @param locationName {string}
 * @param locationToSelect {string|number} use the name of location/index of button
 */
export const getThroughAppToWeatherPage = (locationName, locationToSelect) => {
    const indexPageObject = new IndexPageObject();

    cy.visit(Cypress.config().baseUrl);
    indexPageObject.components.LocationSearchFormObject((locationSearchFormObject) => {
        locationSearchFormObject.search(locationName);
        if (isNumber(locationToSelect)) {
            cy.get(`[id="location-data-button"]`).eq(locationToSelect).click();
        } else {
            cy.contains(`[id="location-data-button"]`, locationToSelect).first().click();
        }
    });
};
