import CypressPageObject from "@hammzj/cypress-page-object";
const { ComponentObject } = CypressPageObject;

export default class PrecipitationChanceObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`div#precipitation`));
    }

    get icon() {
        return this.container.find(`i`);
    }

    _assertValue(value) {
        this.container.should("have.text", value);
    }
}
