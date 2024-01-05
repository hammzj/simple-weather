import SettingsMenu from '../../../src/components/settings.menu';
import SettingsMenuObject from '../../page_objects/components/settings.menu.object';
import {TemperatureUnit, WindSpeedUnit, PrecipitationUnit} from '../../../src/services/open_meteo_api/forecast_api';


const settingsMenuObject = new SettingsMenuObject();
const {baseUrl} = Cypress.config();
describe(SettingsMenu.name, function () {
    beforeEach(function () {
        cy.clearAllSessionStorage();
        cy.mount(<SettingsMenu/>);
    });

    it('renders correctly', function () {
        settingsMenuObject.darkModeToggle
            .parents('label')
            .should('have.text', 'Enable dark mode');
        settingsMenuObject.temperatureUnitRadioGroup
            .parents('.MuiFormControl-root')
            .find('.MuiFormLabel-root')
            .should('have.text', 'Temperature unit');
        settingsMenuObject.windSpeedUnitRadioGroup
            .parents('.MuiFormControl-root')
            .find('.MuiFormLabel-root')
            .should('have.text', 'Wind speed unit');
        settingsMenuObject.precipitationUnitRadioGroup
            .parents('.MuiFormControl-root')
            .find('.MuiFormLabel-root')
            .should('have.text', 'Precipitation unit');
    });

    context('Enable dark mode', function () {
        it(`can enable dark mode`, function () {
            //Act
            settingsMenuObject._selectSettings({darkModeToggle: true});

            //Assert
            settingsMenuObject._assertDarkModeIsSelected(true);
            cy.assertLocalStorageItem(baseUrl, 'colorMode', 'dark');
        });

        it(`can disable dark mode to re-enable light mode`, function () {
            //Arrange
            settingsMenuObject._selectSettings({darkModeToggle: true});
            settingsMenuObject._assertDarkModeIsSelected(true);

            //Act
            settingsMenuObject._selectSettings({darkModeToggle: false});

            //Assert
            settingsMenuObject._assertDarkModeIsSelected(false);
            cy.assertLocalStorageItem(baseUrl, 'colorMode', 'light');
        });


        it('defaults to the last saved selection', function () {
            //Arrange
            settingsMenuObject._assertDarkModeIsSelected(false);

            //Act
            settingsMenuObject._selectSettings({darkModeToggle: true});

            //Assert
            settingsMenuObject._assertDarkModeIsSelected(true);
        });
    });


    context('Temperature unit', function () {
        for (const unit of Object.keys(TemperatureUnit)) {
            it(`saves the selection to the local storage: "${unit}"`, function () {
                //Act
                settingsMenuObject._selectSettings({temperatureUnitOption: unit});

                //Assert
                settingsMenuObject._assertRadioButtonIsSelected({temperatureUnitOption: unit}, true);
                cy.assertLocalStorageItem(baseUrl, 'temperatureUnit', unit);
            });
        }

        it('defaults to the last saved selection', function () {
            //Arrange
            settingsMenuObject._assertRadioButtonIsSelected({temperatureUnitOption: TemperatureUnit.celsius}, false);
            settingsMenuObject._selectSettings({temperatureUnitOption: TemperatureUnit.celsius});

            //Act
            //Re-mount the component
            cy.mount(<SettingsMenu/>);

            //Assert
            settingsMenuObject._assertRadioButtonIsSelected({temperatureUnitOption: TemperatureUnit.celsius}, true);
            settingsMenuObject._assertRadioButtonIsSelected({temperatureUnitOption: TemperatureUnit.fahrenheit}, false);
        });
    });

    context('Wind speed unit', function () {
        for (const unit of Object.keys(WindSpeedUnit)) {
            it(`saves the selection to the local storage: "${unit}"`, function () {
                //Act
                settingsMenuObject._selectSettings({windSpeedUnitOption: unit});

                //Assert
                settingsMenuObject._assertRadioButtonIsSelected({windSpeedUnitOption: unit}, true);
                cy.assertLocalStorageItem(baseUrl, 'windSpeedUnit', unit);
            });
        }

        it('defaults to the last saved selection', function () {
            //Arrange
            settingsMenuObject._assertRadioButtonIsSelected({windSpeedUnitOption: WindSpeedUnit.kmh}, false);
            settingsMenuObject._selectSettings({windSpeedUnitOption: WindSpeedUnit.kmh});

            //Act
            //Re-mount the component
            cy.mount(<SettingsMenu/>);

            //Assert
            settingsMenuObject._assertRadioButtonIsSelected({windSpeedUnitOption: WindSpeedUnit.kmh}, true);
        });
    });

    context('Precipitation unit', function () {
        for (const unit of Object.keys(PrecipitationUnit)) {
            it(`saves the selection to the local storage: "${unit}"`, function () {
                //Act
                settingsMenuObject._selectSettings({precipitationUnitOption: unit});

                //Assert
                settingsMenuObject._assertRadioButtonIsSelected({precipitationUnitOption: unit}, true);
                cy.assertLocalStorageItem(baseUrl, 'precipitationUnit', unit);
            });
        }

        it('defaults to the last saved selection', function () {
            //Arrange
            settingsMenuObject._assertRadioButtonIsSelected({precipitationUnitOption: PrecipitationUnit.mm}, false);
            settingsMenuObject._selectSettings({precipitationUnitOption: PrecipitationUnit.mm});

            //Act
            //Re-mount the component
            cy.mount(<SettingsMenu/>);

            //Assert
            settingsMenuObject._assertRadioButtonIsSelected({precipitationUnitOption: PrecipitationUnit.mm}, true);
        });
    });
});
