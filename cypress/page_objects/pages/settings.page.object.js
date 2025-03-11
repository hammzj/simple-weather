import PageObject from "./page.object";
import BottomNavBarObject from "../components/bottom.nav.bar.object";
import TopNavBarObject from "../components/top.nav.bar.object";
import SettingsMenuObject from "../components/settings.menu.object";

export default class SettingsPageObject extends PageObject {
    constructor() {
        super({ path: "/settings" });
        this.addComponents = {
            TopNavBarObject: (fn) => {
                this.performWithin(this.container(), new TopNavBarObject(), fn);
            },
            SettingsMenuObject: (fn) => {
                this.performWithin(this.container(), new SettingsMenuObject(), fn);
            },

            BottomNavBarObject: (fn) => {
                this.performWithin(this.container(), new BottomNavBarObject(), fn);
            },
        };
    }
}
