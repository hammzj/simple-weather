import CypressPageObject from "@hammzj/cypress-page-object";
const { ComponentObject } = CypressPageObject;

export default class PrecipitationChanceObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`div#precipitation`));
    }

    get svg() {
        return this.container.find(`svg`);
    }

    _assertValue(value) {
        this.container.should("have.text", value);
    }
}
