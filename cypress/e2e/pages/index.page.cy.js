import IndexPage from '../../../src/pages/index.page';
import IndexPageObject from '../../page_objects/pages/index.page.object';

const indexPage = new IndexPageObject();

describe(IndexPage.name, function () {
    beforeEach(function () {
        cy.visit(Cypress.config().baseUrl);
    });

    it('renders correctly', function () {
        indexPage.LocationSearchFormObject(locationSearchFormObject => {
            locationSearchFormObject.container.should('exist');
        });
        indexPage.BottomNavBarObject(bottomNavBarObject => {
            bottomNavBarObject.container.should('exist');
        });
        //TODO: check settings exist
    });

    context('Bottom nav bar', function () {

        //TODO: make this more robust
        it('can go to the about page', function () {
            indexPage.BottomNavBarObject(bottomNavBarObject => {
                bottomNavBarObject.aboutLink.click();
                cy.url().then(url => {
                    expect(url).to.include('/about');
                });
            });
        });
    });
});
