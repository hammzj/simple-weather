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

    it('is not able to be submitted when text field is not empty', function () {
        cy.mount(<LocationSearchForm/>);

        const lsfo = new LocationSearchFormObject();

        lsfo.inputField.then($inputField => {
            expect($inputField.text().length).to.eq(0);
        });
        lsfo.submitButton.should('be.disabled');

        lsfo.inputField.type('Berlin');
        lsfo.inputField.clear();
        lsfo.submitButton.should('be.disabled');
    });

    it('is able to be submitted when text field is not empty', function () {
        cy.mount(<LocationSearchForm/>);

        const lsfo = new LocationSearchFormObject();
        lsfo.submitButton.should('be.disabled');

        lsfo.inputField.type('Berlin');
        lsfo.submitButton.should('not.be.disabled');
    });
});
