import {ComponentObject} from "@hammzj/cypress-page-object";

export default class SavedLocationCheckboxObject extends ComponentObject {
    constructor(locationId = "") {
        super(() => cy.get(`[id^="saved-location-toggle-${locationId}"]`));
        this.addElements = {
            checkbox: () => this.container().find("input")
        }
    }
}
