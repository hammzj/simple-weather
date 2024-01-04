import ElementCollection from "../element.collection";

export default class SettingsMenuObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`#settings-menu`));
    }

    get darkModeToggle() {
        return cy.contains('.MuiFormControlLabel-root', 'Enable dark mode').find('input');
    }
}

