import PageObject from "./page.object";
import LocationSearchFormObject from "../components/location.search.form.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class IndexPageObject extends PageObject {
    constructor() {
        super();
    }

    LocationSearchFormObject(fn) {
        this._nestedObject(this.container, new LocationSearchFormObject(), fn);
    }

    BottomNavBarObject(fn) {
        this._nestedObject(this.container, new BottomNavBarObject(), fn);
    }
}
