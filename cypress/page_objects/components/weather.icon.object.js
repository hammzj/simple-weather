import CypressPageObject from "@hammzj/cypress-page-object";

const { ComponentObject } = CypressPageObject;
export default class WeatherIconObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`div#weather-icon-div`));
    }

    get icon() {
        return this.container.find(`i`);
    }

    _assertTooltipText(text) {
        this.container.should("have.attr", "aria-label", text);
    }

    _assertIcon(iconClass) {
        this.icon.should("have.class", iconClass);
    }
}
