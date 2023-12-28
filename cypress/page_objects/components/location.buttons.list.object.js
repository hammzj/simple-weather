import ElementCollection from "../element.collection";
import LocationDataButtonObject from "./location.data.button.object";
import {getLocationName} from "../../../src/services/open_meteo_api/utils";

export default class LocationButtonsListObject extends ElementCollection {
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
    LocationDataButtonObject(fn, buttonText) {
        this.container.within(() => fn(new LocationDataButtonObject(buttonText)))
    }

    _assertButtonText(...buttonTextContents) {
        buttonTextContents.forEach(buttonText => {
            this.LocationDataButtonObject(button => {
                button.name.should('have.text', buttonText);
            }, buttonText);
        });
    }

}

