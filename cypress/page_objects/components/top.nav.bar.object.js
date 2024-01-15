import CypressPageObject from "@hammzj/cypress-page-object";
import LocationSearchFormObject from "./location.search.form.object";

const { ComponentObject } = CypressPageObject;

export default class TopNavBarObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#top-nav-bar`));
    }

    LocationSearchFormObject(fn) {
        this._nestedObject(this.container, new LocationSearchFormObject(), fn);
    }
}
