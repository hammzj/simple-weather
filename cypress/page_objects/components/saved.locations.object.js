import CypressPageObject from "@hammzj/cypress-page-object";
import CurrentWeatherCardObject from "./current.weather.card.object";

const { ComponentObject } = CypressPageObject;

export default class SavedLocationsObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#saved-locations`));
    }

    get title() {
        return this.container.find(`.MuiTypography-root`);
    }

    CurrentWeatherCardObject(fn) {
        this._nestedObject(this.container, new CurrentWeatherCardObject(), fn);
    }
}
