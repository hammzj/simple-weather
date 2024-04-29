import PageObject from "./page.object";
import LocationButtonsListObject from "../components/location.buttons.list.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";

export default class LocationResultsPageObject extends PageObject {
    constructor() {
        super({ path: `/results` });
        this.addComponents = {
            TopNavBarObject: (fn) => {
                this.performWithin(this.container(), new TopNavBarObject(), fn);
            },
            BottomNavBarObject: (fn) => {
                this.performWithin(this.container(), new BottomNavBarObject(), fn);
            },

            LocationButtonsListObject: (fn) => {
                this.performWithin(this.container(), new LocationButtonsListObject(), fn);
            },
        };
    }


    //TODO: make this work
    selectLocation(locationName) {
        this.components.LocationButtonsListObject((locationButtonsListObject) => {
            locationButtonsListObject.components.LocationDataButtonObject((button) => {
                button.container().click();
            }, locationName);
        });
    }
}
