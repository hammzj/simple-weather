import LocationSearchForm from '../../../src/components/location.search.form';
import LocationSearchFormObject from '../../page_objects/components/location.search.form.object';

describe(LocationSearchForm.name, function () {
    specify('TEST', function () {
        cy.mount(<LocationSearchForm/>);
    });
})
