import SettingsMenu from '../../../src/components/settings.menu';
import SettingsMenuObject from '../../page_objects/components/settings.menu.object';
import {OPEN_METEO_HOMEPAGE, GITHUB_AUTHOR_LINK} from "../../../src/constants";

describe(SettingsMenu.name, function () {
    it('renders correctly', function () {
        const SettingsMenuObject = new SettingsMenuObject();

        cy.mount(<SettingsMenu/>);
        bottomNavBarObject.darkModeToggle.parents('label').should('have.text', 'Enable dark mode');
    });
});
