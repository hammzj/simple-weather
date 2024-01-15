import { isNil } from "lodash";
import CypressPageObject from "@hammzj/cypress-page-object";
const { ComponentObject } = CypressPageObject;

export default class SettingsMenuObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#settings-menu`));
    }

    get darkModeToggle() {
        return cy.contains(".MuiFormControlLabel-root", "Enable dark mode").find("input");
    }

    get temperatureUnitRadioGroup() {
        return cy
            .contains(".MuiFormControl-root", "Temperature unit")
            .find('div[role="radiogroup"]');
    }

    //Label and value are the same
    temperatureUnitOption(value) {
        return this.temperatureUnitRadioGroup.find(`input[value="${value}"]`);
    }

    get windSpeedUnitRadioGroup() {
        return cy
            .contains(".MuiFormControl-root", "Wind speed unit")
            .find('div[role="radiogroup"]');
    }

    //Label and value are the same
    windSpeedUnitOption(value) {
        return this.windSpeedUnitRadioGroup.find(`input[value="${value}"]`);
    }

    get precipitationUnitRadioGroup() {
        return cy
            .contains(".MuiFormControl-root", "Precipitation unit")
            .find('div[role="radiogroup"]');
    }

    //Label and value are the same
    precipitationUnitOption(value) {
        return this.precipitationUnitRadioGroup.find(`input[value="${value}"]`);
    }

    _selectSettings({
        darkModeToggle,
        temperatureUnitOption,
        windSpeedUnitOption,
        precipitationUnitOption,
    }) {
        if (!isNil(darkModeToggle)) {
            this.darkModeToggle.toggleCheckbox(darkModeToggle);
        }
        if (!isNil(temperatureUnitOption)) {
            this.temperatureUnitOption(temperatureUnitOption).click({ force: true });
        }
        if (!isNil(windSpeedUnitOption)) {
            this.windSpeedUnitOption(windSpeedUnitOption).click({ force: true });
        }
        if (!isNil(precipitationUnitOption)) {
            this.precipitationUnitOption(precipitationUnitOption).click({ force: true });
        }
    }

    /**
     * @param expectation {boolean}
     */
    _assertDarkModeIsSelected(expectation) {
        this.darkModeToggle.should(expectation ? "be.checked" : "not.be.checked");
    }

    /**
     *
     * @param temperatureUnitOption {string=}
     * @param windSpeedUnitOption {string=}
     * @param precipitationUnitOption {string=}
     * @param expectation {boolean}
     */
    _assertRadioButtonIsSelected(
        { temperatureUnitOption, windSpeedUnitOption, precipitationUnitOption },
        expectation
    ) {
        const matcher = expectation ? "be.checked" : "not.be.checked";
        if (temperatureUnitOption)
            this.temperatureUnitOption(temperatureUnitOption).should(matcher);
        if (windSpeedUnitOption) this.windSpeedUnitOption(windSpeedUnitOption).should(matcher);
        if (precipitationUnitOption)
            this.precipitationUnitOption(precipitationUnitOption).should(matcher);
    }
}
