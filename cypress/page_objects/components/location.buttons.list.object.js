import ElementCollection from "../element.collection";
import LocationDataButtonObject from "./location.data.button.object";

export default class LocationButtonsListObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`div#weather-icon-div`));
    }

    /**
     * @param fn {function}
     * @param [buttonText=] {string} Allows scoping the list of buttons by their text
     */
    LocationDataButton(fn, buttonText) {
        this.container.within(() => fn(new LocationDataButtonObject(buttonText)))
    }

}

