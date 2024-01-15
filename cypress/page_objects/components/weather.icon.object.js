import CypressPageObject from "@hammzj/cypress-page-object";

const { ComponentObject } = CypressPageObject;
export default class WeatherIconObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`div#weather-icon-div`));
    }

    get svg() {
        return this.container.find(`svg`);
    }

    _assertTooltipText(text) {
        this.container.should("have.attr", "aria-label", text);
    }

    _assertIcon(iconName) {
        this.svg.should("have.attr", "data-testid", iconName);
    }
}
