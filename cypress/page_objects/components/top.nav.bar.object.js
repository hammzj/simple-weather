import ElementCollection from "../element.collection";
import LocationSearchFormObject from "./location.search.form.object";

export default class TopNavBarObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`#top-nav-bar`));
    }

    LocationSearchFormObject(fn) {
        this.container.within(() => fn(new LocationSearchFormObject()));
    }
}

