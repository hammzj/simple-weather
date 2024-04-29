import { ComponentObject } from "@hammzj/cypress-page-object";

export default class LocationDataButtonObject extends ComponentObject {
    static BASE_CONTAINER_ID = `div[id="location-data-button"]`;

    constructor(buttonText) {
        super(() => buttonText ?
            cy.get(LocationDataButtonObject.BASE_CONTAINER_ID)
                .contains("span", buttonText)
                .parents(LocationDataButtonObject.BASE_CONTAINER_ID) :
            cy.get(LocationDataButtonObject.BASE_CONTAINER_ID),
        );
        this.addElements = {
            link: () => this.container().find(`a`),
            name: () => this.container().find(`span`).eq(0),
        };
    }
}
