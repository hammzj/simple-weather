import {ComponentObject} from "@hammzj/cypress-page-object";

export default class PrecipitationChanceObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`div#precipitation`));
        this.addElements = {
            icon: () => this.container().find(`i`),
        }
    }

    assertValue(value) {
        this.container().should("have.text", value);
    }
}
