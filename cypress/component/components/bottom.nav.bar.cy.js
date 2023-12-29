import BottomNavBar from '../../../src/components/bottom.nav.bar';
import BottomNavBarObject from '../../page_objects/components/bottom.nav.bar.object';
import {GITHUB_AUTHOR_LINK} from "../../../src/components/constants";

describe(BottomNavBar.name, function () {
    it('renders correctly', function () {
        const bottomNavBarObject = new BottomNavBarObject();

        //No weather code
        cy.mount(<BottomNavBar/>);
        bottomNavBarObject.aboutLink.should('exist');
        bottomNavBarObject.aboutLink.should('have.attr', 'href', '/about');
        bottomNavBarObject.gitHubAuthorLink.should('exist');
        bottomNavBarObject.gitHubAuthorLink.should('have.attr', 'href', GITHUB_AUTHOR_LINK);
    });
});
