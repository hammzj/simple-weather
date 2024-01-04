import SettingsPage from '../../../src/pages/settings.page';
import SettingsPageObject from '../../page_objects/pages/settings.page.object';

const settingsPageObject = new SettingsPageObject();

describe(SettingsPage.name, function () {
    beforeEach(function () {
        cy.visit(settingsPageObject.url());
    });

    it('renders correctly', function () {
        settingsPageObject.TopNavBarObject(navBar => navBar.container.should('exist'))
        settingsPageObject.BottomNavBarObject(navBar => navBar.container.should('exist'))
        settingsPageObject.SettingsMenuObject.then(smo => {
            smo.container.should('exist');
        });
    });

    context('Enabling dark mode', function () {
        it('changes the theme', function () {
            settingsPageObject.SettingsMenuObject.then(smo => {
                smo.darkModeToggle.click();
            });
            cy.get('body').should('have.color', '#121212')

            settingsPageObject.SettingsMenuObject.then(smo => {
                smo.darkModeToggle.click();
            });
            cy.get('body').should('have.color', '#fff');
        });

        it('persists on other pages', function () {
            settingsPageObject.SettingsMenuObject.then(smo => {
                smo.darkModeToggle.click();
            });
            settingsPageObject.BottomNavBarObject(navBar => {
                navBar.aboutLink.click()
                cy.url().then(url => {
                    expect(url).to.include('/about');
                });
            });
            cy.get('body').should('have.color', '#121212');
        });
    });
});
