import IndexPage from '../../../src/pages/index.page';
import IndexPageObject from '../../page_objects/pages/index.page.object';

const indexPage = new IndexPageObject();

describe(IndexPage.name, function () {
    it('renders correctly', function () {
        cy.visit(Cypress.config().baseUrl);

        indexPage.LocationSearchFormObject(lsfo => {
            lsfo.container.should('exist');
        });
        //TODO: check link to about page
        //TODO: check settings exist
    });

});
