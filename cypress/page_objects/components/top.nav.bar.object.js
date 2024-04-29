import {ComponentObject} from "@hammzj/cypress-page-object";
import LocationSearchFormObject from "./location.search.form.object";

export default class TopNavBarObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#top-nav-bar`));
        this.addComponents = {
            LocationSearchFormObject: (fn) => {
                this.performWithin(this.container(), new LocationSearchFormObject(), fn)
            }
        }
    }
}
