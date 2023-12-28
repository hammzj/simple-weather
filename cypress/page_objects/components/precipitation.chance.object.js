import ElementCollection from "../element.collection";

export default class PrecipitationChanceObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`div#precipitation`));
    }

    get svg() {
        return this.container.find(`svg`);
    }

    _assertValue(value) {
        this.container.should('have.text', value);
    }
}
