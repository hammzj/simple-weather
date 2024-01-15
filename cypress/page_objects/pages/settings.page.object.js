import PageObject from "./page.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import SettingsMenuObject from "../components/settings.menu.object";

export default class SettingsPageObject extends PageObject {
    constructor() {
        super("/settings");
    }

    TopNavBarObject(fn) {
        this._nestedObject(this.container, new TopNavBarObject(), fn);
    }

    SettingsMenuObject(fn) {
        this._nestedObject(this.container, new SettingsMenuObject(), fn);
    }

    BottomNavBarObject(fn) {
        this._nestedObject(this.container, new BottomNavBarObject(), fn);
    }
}
