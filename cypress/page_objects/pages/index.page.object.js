import LocationSearchFormObject from "../components/location.search.form.object";
import PageObject from "./page.object";

export default class IndexPageObject extends PageObject {
    constructor() {
        super();
    }

    LocationSearchFormObject(fn) {
        this.container.within(() => fn(new LocationSearchFormObject()));
    }
}

