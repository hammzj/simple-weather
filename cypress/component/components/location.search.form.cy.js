import LocationSearchForm from '../../../src/components/location.search.form';
import LocationSearchFormObject from '../../page_objects/components/location.search.form.object';

/*
 * Not testing page redirection on submission here -- that will be under e2e tests
 */
describe(LocationSearchForm.name, function () {
    it('is a submission form', function () {
        cy.mount(<LocationSearchForm/>);

        const lsfo = new LocationSearchFormObject();

        lsfo.inputField.should('exist').and('have.attr', 'type', 'text');
        lsfo.submitButton.should('exist').and('have.attr', 'type', 'submit');
    });
});
