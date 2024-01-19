import CypressPageObject from "@hammzj/cypress-page-object";
const { ComponentObject } = CypressPageObject;

export default class SavedLocationCheckboxObject extends ComponentObject {
    constructor(locationId = "") {
        super(() => cy.get(`[id^="saved-location-toggle-${locationId}"]`));
    }

    get checkbox() {
        return this.container.find("input");
    }
}
