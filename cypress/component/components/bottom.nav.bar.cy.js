import BottomNavBar from '../../../src/components/bottom.nav.bar';
import BottomNavBarObject from '../../page_objects/components/bottom.nav.bar.object';
import {OPEN_METEO_HOMEPAGE, GITHUB_AUTHOR_LINK} from "../../../src/constants";

describe(BottomNavBar.name, function () {
    it('renders correctly', function () {
        const bottomNavBarObject = new BottomNavBarObject();

        //No weather code
        cy.mount(<BottomNavBar/>);
        bottomNavBarObject.homeLink.should('exist').and('have.attr', 'href', '/');
        bottomNavBarObject.aboutLink.should('exist').and('have.attr', 'href', '/about');
        bottomNavBarObject.gitHubAuthorLink.should('exist').and('have.attr', 'href', GITHUB_AUTHOR_LINK);
        bottomNavBarObject.apiAttributionLink.should('exist').and('have.attr', 'href', OPEN_METEO_HOMEPAGE);
    });

    context('mobile view', function () {
        beforeEach(function () {
            cy.viewport('iphone-5');
        })

        it('renders correctly and all elements are visible', function () {
            const bottomNavBarObject = new BottomNavBarObject();

            //No weather code
            cy.mount(<BottomNavBar/>);
            //bottomNavBarObject.container.should('have.class', '.Mui-row')
            bottomNavBarObject.homeLink.should('exist').and('be.visible');
            bottomNavBarObject.aboutLink.should('exist').and('be.visible');
            bottomNavBarObject.gitHubAuthorLink.should('exist').and('be.visible');
            bottomNavBarObject.apiAttributionLink.should('exist').and('be.visible');
        });
    });
});
