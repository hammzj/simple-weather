import CypressPageObject from "@hammzj/cypress-page-object";
import LocationDataButtonObject from "./location.data.button.object";

const { ComponentObject } = CypressPageObject;

export default class LocationButtonsListObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`form#location-data-form`));
    }

    /**
     * @param fn {function}
     * @param [buttonText=] {string} Allows scoping the list of buttons by their text
     * @example LocationButtonsListObject.LocationDataButtonObject(function(button){
     *     //...
     * }, buttonText);
     */
    LocationDataButtonObject(buttonText, fn) {
        this._nestedObject(this.container, new LocationDataButtonObject(buttonText), fn);
    }

    _assertButtonText(...buttonTextContents) {
        buttonTextContents.forEach((buttonText) => {
            this.LocationDataButtonObject(buttonText, (button) => {
                button.name.should("have.text", buttonText);
            });
        });
    }
}
