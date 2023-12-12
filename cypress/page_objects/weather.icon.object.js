import ElementCollection from "./element.collection";

class WeatherIconObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`div#weather-icon-div`));
    }

    get svg() {
        return this.container.find(`svg`);
    }

    _assertTooltipText(text) {
        this.container.should('have.attr', 'aria-label', text);
    }

    _assertIcon(iconName) {
        this.svg.should('have.attr', 'data-testid', iconName);
    }
}

export default WeatherIconObject;
