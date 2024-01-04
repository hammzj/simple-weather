import PageObject from "./page.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import SettingsMenuObject from "../components/settings.menu.object";

export default class SettingsPageObject extends PageObject {
    constructor() {
        super('/settings');
    }

    TopNavBarObject(fn) {
        this.container.within(() => fn(new TopNavBarObject()));
    }

    SettingsMenuObject(fn) {
        this.container.within(() => fn(new SettingsMenuObject()));
    }

    BottomNavBarObject(fn) {
        this.container.within(() => fn(new BottomNavBarObject()));
    }

}

