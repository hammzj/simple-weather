import ElementCollection from "../element.collection";

export default class LocationSearchFormObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`div#weather-icon-div`));
    }

    get inputField(){

    }

    get submitButton() {
        return this.container.find(`button[type="submit"]`);
    }

}

