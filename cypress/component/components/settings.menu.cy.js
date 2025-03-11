import SettingsMenu from "../../../src/components/settings.menu";
import SettingsMenuObject from "../../page_objects/components/settings.menu.object";
import {
    TemperatureUnit,
    WindSpeedUnit,
    PrecipitationUnit,
} from "../../../src/services/open_meteo_api/forecast_api";

const settingsMenuObject = new SettingsMenuObject();
const { baseUrl } = Cypress.config();
describe(SettingsMenu.name, function () {
    beforeEach(function () {
        cy.clearAllSessionStorage();
        cy.mount(<SettingsMenu />);
    });

    it("renders correctly", function () {
        settingsMenuObject.elements
            .darkModeToggle()
            .parents("label")
            .should("have.text", "Enable dark mode");
        settingsMenuObject.elements
            .temperatureUnitRadioGroup()
            .parents(".MuiFormControl-root")
            .find(".MuiFormLabel-root")
            .should("have.text", "Temperature unit");
        settingsMenuObject.elements
            .windSpeedUnitRadioGroup()
            .parents(".MuiFormControl-root")
            .find(".MuiFormLabel-root")
            .should("have.text", "Wind speed unit");
        settingsMenuObject.elements
            .precipitationUnitRadioGroup()
            .parents(".MuiFormControl-root")
            .find(".MuiFormLabel-root")
            .should("have.text", "Precipitation unit");
    });

    context("Enable dark mode", function () {
        it(`can enable dark mode`, function () {
            settingsMenuObject.selectSettings({ darkModeToggle: true });

            settingsMenuObject.assertDarkModeIsSelected(true);
            cy.assertLocalStorageItem(baseUrl, "colorMode", "dark");
        });

        it(`can disable dark mode to re-enable light mode`, function () {
            settingsMenuObject.selectSettings({ darkModeToggle: true });
            settingsMenuObject.assertDarkModeIsSelected(true);

            settingsMenuObject.selectSettings({ darkModeToggle: false });

            settingsMenuObject.assertDarkModeIsSelected(false);
            cy.assertLocalStorageItem(baseUrl, "colorMode", "light");
        });

        it("defaults to the last saved selection", function () {
            settingsMenuObject.assertDarkModeIsSelected(false);

            settingsMenuObject.selectSettings({ darkModeToggle: true });

            settingsMenuObject.assertDarkModeIsSelected(true);
        });
    });

    context("Temperature unit", function () {
        for (const unit of Object.keys(TemperatureUnit)) {
            it(`saves the selection to the local storage: "${unit}"`, function () {
                settingsMenuObject.selectSettings({ temperatureUnitOption: unit });

                settingsMenuObject.assertRadioButtonIsSelected(
                    { temperatureUnitOption: unit },
                    true
                );
                cy.assertLocalStorageItem(baseUrl, "temperatureUnit", unit);
            });
        }

        it("defaults to the last saved selection", function () {
            settingsMenuObject.assertRadioButtonIsSelected(
                { temperatureUnitOption: TemperatureUnit.celsius },
                false
            );
            settingsMenuObject.selectSettings({ temperatureUnitOption: TemperatureUnit.celsius });

            //Re-mount the component
            cy.mount(<SettingsMenu />);

            settingsMenuObject.assertRadioButtonIsSelected(
                { temperatureUnitOption: TemperatureUnit.celsius },
                true
            );
            settingsMenuObject.assertRadioButtonIsSelected(
                { temperatureUnitOption: TemperatureUnit.fahrenheit },
                false
            );
        });
    });

    context("Wind speed unit", function () {
        for (const unit of Object.keys(WindSpeedUnit)) {
            it(`saves the selection to the local storage: "${unit}"`, function () {
                settingsMenuObject.selectSettings({ windSpeedUnitOption: unit });

                settingsMenuObject.assertRadioButtonIsSelected({ windSpeedUnitOption: unit }, true);
                cy.assertLocalStorageItem(baseUrl, "windSpeedUnit", unit);
            });
        }

        it("defaults to the last saved selection", function () {
            settingsMenuObject.assertRadioButtonIsSelected(
                { windSpeedUnitOption: WindSpeedUnit.kmh },
                false
            );
            settingsMenuObject.selectSettings({ windSpeedUnitOption: WindSpeedUnit.kmh });

            //Re-mount the component
            cy.mount(<SettingsMenu />);

            settingsMenuObject.assertRadioButtonIsSelected(
                { windSpeedUnitOption: WindSpeedUnit.kmh },
                true
            );
        });
    });

    context("Precipitation unit", function () {
        for (const unit of Object.keys(PrecipitationUnit)) {
            it(`saves the selection to the local storage: "${unit}"`, function () {
                settingsMenuObject.selectSettings({ precipitationUnitOption: unit });

                settingsMenuObject.assertRadioButtonIsSelected(
                    { precipitationUnitOption: unit },
                    true
                );
                cy.assertLocalStorageItem(baseUrl, "precipitationUnit", unit);
            });
        }

        it("defaults to the last saved selection", function () {
            settingsMenuObject.assertRadioButtonIsSelected(
                { precipitationUnitOption: PrecipitationUnit.mm },
                false
            );
            settingsMenuObject.selectSettings({ precipitationUnitOption: PrecipitationUnit.mm });

            //Re-mount the component
            cy.mount(<SettingsMenu />);

            settingsMenuObject.assertRadioButtonIsSelected(
                { precipitationUnitOption: PrecipitationUnit.mm },
                true
            );
        });
    });
});
