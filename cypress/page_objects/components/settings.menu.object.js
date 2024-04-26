import {ComponentObject} from "@hammzj/cypress-page-object";
import {isNil} from "lodash";

export default class SettingsMenuObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#settings-menu`));
        this.addElements = {
            darkModeToggle: () => cy.contains(".MuiFormControlLabel-root", "Enable dark mode")
                .find("input"),
            temperatureUnitRadioGroup: () => cy
                .contains(".MuiFormControl-root", "Temperature unit")
                .find('div[role="radiogroup"]'),
            //Label and value are the same
            temperatureUnitOption: (value) => this.elements.temperatureUnitRadioGroup().find(`input[value="${value}"]`),
            windSpeedUnitRadioGroup: () => cy
                .contains(".MuiFormControl-root", "Wind speed unit")
                .find('div[role="radiogroup"]'),
            //Label and value are the same
            windSpeedUnitOption: (value) => this.elements.windSpeedUnitRadioGroup().find(`input[value="${value}"]`),
            precipitationUnitRadioGroup: () => cy
                .contains(".MuiFormControl-root", "Precipitation unit")
                .find('div[role="radiogroup"]'),
            //Label and value are the same
            precipitationUnitOption: (value) => this.elements.precipitationUnitRadioGroup().find(`input[value="${value}"]`)
        }
    }

    selectSettings({
                       darkModeToggle,
                       temperatureUnitOption,
                       windSpeedUnitOption,
                       precipitationUnitOption,
                   }) {
        if (!isNil(darkModeToggle)) {
            this.elements.darkModeToggle().toggleCheckbox(darkModeToggle);
        }
        if (!isNil(temperatureUnitOption)) {
            this.elements.temperatureUnitOption(temperatureUnitOption).click({force: true});
        }
        if (!isNil(windSpeedUnitOption)) {
            this.elements.windSpeedUnitOption(windSpeedUnitOption).click({force: true});
        }
        if (!isNil(precipitationUnitOption)) {
            this.elements.precipitationUnitOption(precipitationUnitOption).click({force: true});
        }
    }

    /**
     * @param expectation {boolean}
     */
    assertDarkModeIsSelected(expectation) {
        this.elements.darkModeToggle().should(expectation ? "be.checked" : "not.be.checked");
    }

    /**
     *
     * @param temperatureUnitOption {string=}
     * @param windSpeedUnitOption {string=}
     * @param precipitationUnitOption {string=}
     * @param expectation {boolean}
     */
    assertRadioButtonIsSelected(
        {temperatureUnitOption, windSpeedUnitOption, precipitationUnitOption},
        expectation
    ) {
        const matcher = expectation ? "be.checked" : "not.be.checked";
        if (temperatureUnitOption) {
            this.elements.temperatureUnitOption(temperatureUnitOption).should(matcher);
        }
        if (windSpeedUnitOption) {
            this.elements.windSpeedUnitOption(windSpeedUnitOption).should(matcher);
        }
        if (precipitationUnitOption) {
            this.elements.precipitationUnitOption(precipitationUnitOption).should(matcher);
        }
    }
}
