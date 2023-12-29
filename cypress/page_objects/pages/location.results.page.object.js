import LocationSearchFormObject from "../components/location.search.form.object";
import LocationButtonsListObject from "../components/location.buttons.list.object";
import PageObject from "./page.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class LocationResultsPageObject extends PageObject {
    constructor() {
        super(`/results`);
    }

    LocationSearchFormObject(fn) {
        this.container.within(() => fn(new LocationSearchFormObject()));
    }

    TopNavBarObject(fn) {
        this.container.within(() => fn(new TopNavBarObject()));
    }

    BottomNavBarObject(fn) {
        this.container.within(() => fn(new BottomNavBarObject()));
    }

    LocationButtonsListObject(fn) {
        this.container.within(() => fn(new LocationButtonsListObject()));
    }

    //TODO: make this work
    _selectLocation(locationName) {
        this.LocationButtonsListObject(locationButtonsListObject => {
            locationButtonsListObject.LocationDataButtonObject(button => {
                button.container.click();
            }, locationName);
        });
    }
}

