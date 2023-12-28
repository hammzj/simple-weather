import LocationSearchFormObject from "../components/location.search.form.object";
import LocationButtonsListObject from "../components/location.buttons.list.object";
import PageObject from "./page.object";

export default class LocationResultsPageObject extends PageObject {
    constructor() {
        super(`/results`);
    }

    LocationSearchFormObject(fn) {
        this.container.within(() => fn(new LocationSearchFormObject()));
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

