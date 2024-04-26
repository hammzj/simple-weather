import { ComponentObject } from "@hammzj/cypress-page-object";
import CurrentWeatherCardObject from "./current.weather.card.object";


export default class SavedLocationsObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#saved-locations`));
        this.addElements = {
            title: () => this.container().find(`.MuiTypography-root`),
        };
        this.addComponents = {
            CurrentWeatherCardObject: (fn) => {
                this.performWithin(this.container(), new CurrentWeatherCardObject(), fn);
            },
        };
    }
}
