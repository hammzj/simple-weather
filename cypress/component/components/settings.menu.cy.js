import SettingsMenu from '../../../src/components/settings.menu';
import SettingsMenuObject from '../../page_objects/components/settings.menu.object';

describe(SettingsMenu.name, function () {
    it('renders correctly', function () {
        const settingsMenuObject = new SettingsMenuObject();

        cy.mount(<SettingsMenu/>);
        settingsMenuObject.darkModeToggle.parents('label').should('have.text', 'Enable dark mode');
    });
});
