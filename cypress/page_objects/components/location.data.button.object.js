import ElementCollection from "../element.collection";

export default class LocationDataButtonObject extends ElementCollection {
    #BASE_CONTAINER_ID = '#location-data-button';

    constructor(buttonText = undefined) {
        super(() => cy.get('div[id="location-data-button"]'));

        //Select only the button(s) with the specified buttonText
        if (buttonText) {
            this._buttonText = buttonText;
            this.updateBaseContainerFunction = (origFn) => {
                return origFn()
                    .contains('span', this._buttonText)
                    .parents(this.#BASE_CONTAINER_ID);
            }
        }
    }

    get link() {
        return this.container.find(`a`);
    }

    get name() {
        return this.container.contains(`span`, this._buttonText);
    }
}

