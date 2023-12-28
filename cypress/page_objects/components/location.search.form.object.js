import ElementCollection from "../element.collection";

export default class LocationSearchFormObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`form#location-search-form`));
    }

    get inputField() {
        return this.container.find('input[id="location-input"][type="text"]')
    }

    get submitButton() {
        return this.container.find(`button[type="submit"]`);
    }

    _search(text, submit = true) {
        this.inputField.setValue(text);
        if (submit) {
            this.submitButton.click();
        }
    }
}

