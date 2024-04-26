import { ComponentObject } from "@hammzj/cypress-page-object";

export default class WeatherIconObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`div#weather-icon-div`));
        this.addElements = {
            icon: () => this.container().find("i"),
        };
    }

    assertTooltipText(text) {
        this.container().should("have.attr", "aria-label", text);
    }

    assertIcon(iconClass) {
        this.elements.icon().should("have.class", iconClass);
    }
}
