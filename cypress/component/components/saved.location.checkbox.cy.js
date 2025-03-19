import SavedLocationCheckbox from "../../../src/components/saved.location.checkbox";
import SavedLocationCheckboxObject from "../../page_objects/components/saved.location.checkbox.object";

describe(SavedLocationCheckbox.name, function () {
    beforeEach(function () {
        cy.clearAllLocalStorage();
    });

    it("renders correctly when not selected", function () {
        const savedLocationCheckboxObject = new SavedLocationCheckboxObject("1234");

        cy.mount(<SavedLocationCheckbox locationId={1234} />);
        savedLocationCheckboxObject.container().should("have.text", "Set as saved location");
    });

    it("saves the location ID to local storage when checked", function () {
        const savedLocationCheckboxObject = new SavedLocationCheckboxObject("1234");

        cy.mount(<SavedLocationCheckbox locationId={1234} />);

        savedLocationCheckboxObject.elements.checkbox().toggleCheckbox(true);
        savedLocationCheckboxObject.elements
            .container()
            .should("have.text", "Set as saved location");
        cy.getBaseUrlOrigin().then((baseUrl) => {
            cy.assertLocalStorageItem(baseUrl, "savedLocationId", "1234");
        });
    });

    it("saves the location ID to local storage when unchecked", function () {
        const savedLocationCheckboxObject = new SavedLocationCheckboxObject("1234");

        cy.mount(<SavedLocationCheckbox locationId={1234} />);

        savedLocationCheckboxObject.elements.checkbox().toggleCheckbox(true);
        savedLocationCheckboxObject.elements.checkbox().toggleCheckbox(false);
        cy.getBaseUrlOrigin().then((baseUrl) => {
            cy.getAllLocalStorage().then((result) => {
                cy.wrap(result[baseUrl]).should("be.undefined");
            });
        });
    });

    it("is disabled if another saved location already exists ", function () {
        const savedLocationCheckboxObject = new SavedLocationCheckboxObject("1234");
        const savedLocationCheckboxObject2 = new SavedLocationCheckboxObject("5678");

        cy.mount(<SavedLocationCheckbox locationId={1234} />);
        savedLocationCheckboxObject.elements.checkbox().toggleCheckbox(true);
        savedLocationCheckboxObject.elements.checkbox().should("be.enabled");

        cy.mount(<SavedLocationCheckbox locationId={5678} />);
        savedLocationCheckboxObject2.elements.checkbox().should("be.disabled");
        savedLocationCheckboxObject2
            .container()
            .should("have.text", "A saved location already exists");
    });
});
