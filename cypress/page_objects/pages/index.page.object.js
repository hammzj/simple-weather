import PageObject from "./page.object";
import LocationSearchFormObject from "../components/location.search.form.object";
import SavedLocationsObject from "../components/saved.locations.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class IndexPageObject extends PageObject {
    constructor() {
        super();
        this.addComponents = {
            LocationSearchFormObject: (fn) => {
                this.performWithin(this.container(), new LocationSearchFormObject(), fn);
            },
            SavedLocationsObject: (fn) => {
                this.performWithin(this.container(), new SavedLocationsObject(), fn);
            },
            BottomNavBarObject: (fn) => {
                this.performWithin(this.container(), new BottomNavBarObject(), fn);
            },
        };
    }
}
