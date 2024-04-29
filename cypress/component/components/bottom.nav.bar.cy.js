import BottomNavBar from '../../../src/components/bottom.nav.bar';
import BottomNavBarObject from '../../page_objects/components/bottom.nav.bar.object';
import {OPEN_METEO_HOMEPAGE, GITHUB_REPOSITORY_LINK} from "../../../src/constants";

describe(BottomNavBar.name, function () {
    it('renders correctly', function () {
        const bottomNavBarObject = new BottomNavBarObject();

        //No weather code
        cy.mount(<BottomNavBar/>);
        bottomNavBarObject.elements.homeLink().should('exist').and('have.attr', 'href', '/');
        bottomNavBarObject.elements.aboutLink().should('exist').and('have.attr', 'href', '/about');
        bottomNavBarObject.elements.gitHubAuthorLink().should('exist').and('have.attr', 'href', GITHUB_REPOSITORY_LINK);
        bottomNavBarObject.elements.apiAttributionLink().should('exist').and('have.attr', 'href', OPEN_METEO_HOMEPAGE);
    });

    context('mobile view', function () {
        beforeEach(function () {
            cy.viewport('iphone-5');
        })

        it('renders correctly and all elements are visible', function () {
            const bottomNavBarObject = new BottomNavBarObject();

            //No weather code
            cy.mount(<BottomNavBar/>);
            bottomNavBarObject.elements.homeLink().should('exist').and('be.visible');
            bottomNavBarObject.elements.aboutLink().should('exist').and('be.visible');
            bottomNavBarObject.elements.gitHubAuthorLink().should('exist').and('be.visible');
            bottomNavBarObject.elements.apiAttributionLink().should('exist').and('be.visible');
        });
    });
});
