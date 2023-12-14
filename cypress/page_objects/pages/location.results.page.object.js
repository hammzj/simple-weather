import LocationSearchFormObject from "../components/location.search.form.object";
import LocationButtonsListObject from "../components/location.buttons.list.object";
import PageObject from "./page.object";

export default class LocationResultsPageObject extends PageObject {
    constructor() {
        super();
    }

    LocationSearchFormObject(fn) {
        this.container.within(() => fn(new LocationSearchFormObject()));
    }

    LocationButtonsList(fn) {
        this.container.within(() => fn(new LocationButtonsListObject()));
    }

}

