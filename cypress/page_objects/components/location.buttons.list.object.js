import { ComponentObject } from "@hammzj/cypress-page-object";
import LocationDataButtonObject from "./location.data.button.object";

export default class LocationButtonsListObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`form#location-data-form`));
        this.components = {
            /**
             * @param fn {function}
             * @param [buttonText=] {string} Allows scoping the list of buttons by their text
             * @example LocationButtonsListObject.LocationDataButtonObject(function(button){
             *     //...
             * }, buttonText);
             */
            LocationDataButtonObject: (fn, buttonText) => {
                this.performWithin(this.container(), new LocationDataButtonObject(buttonText), fn);
            },
        };
    }


    assertButtonText(...buttonTextContents) {
        cy.log("button text contents to validate", buttonTextContents);
        buttonTextContents.forEach((buttonText) => {
            cy.log("current button text", buttonText);
            this.components.LocationDataButtonObject(function(button) {
                button.elements.name().should("have.text", buttonText);
            }, buttonText)
        });
    }
}
