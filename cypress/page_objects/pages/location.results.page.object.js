import PageObject from "./page.object";
import LocationButtonsListObject from "../components/location.buttons.list.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class LocationResultsPageObject extends PageObject {
    constructor() {
        super(`/results`);
    }

    TopNavBarObject(fn) {
        this._nestedObject(this.container, new TopNavBarObject(), fn);
    }

    BottomNavBarObject(fn) {
        this._nestedObject(this.container, new BottomNavBarObject(), fn);
    }

    LocationButtonsListObject(fn) {
        this._nestedObject(this.container, new LocationButtonsListObject(), fn);
    }

    //TODO: make this work
    _selectLocation(locationName) {
        this.LocationButtonsListObject((locationButtonsListObject) => {
            locationButtonsListObject.LocationDataButtonObject(locationName, (button) => {
                button.container.click();
            });
        });
    }
}
