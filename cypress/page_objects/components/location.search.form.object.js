import { ComponentObject } from "@hammzj/cypress-page-object";

export default class LocationSearchFormObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`form#location-search-form`));
        this.addElements = {
            inputField: () => this.container().find(`input[id="location-input"][type="text"]`),
            submitButton: () => this.container().find(`button[type="submit"]`),
        };
    }

    search(text, submit = true) {
        this.elements.inputField().setValue(text);
        if (submit) {
            this.elements.submitButton().click();
        }
    }
}
