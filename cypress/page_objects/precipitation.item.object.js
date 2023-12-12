import ElementCollection from "./element.collection";

class PrecipitationItemObject extends ElementCollection {
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

export default PrecipitationItemObject;
