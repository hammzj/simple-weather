import TopNavBar from "../../../src/components/top.nav.bar";
import TopNavBarObject from "../../page_objects/components/top.nav.bar.object";

describe(TopNavBar.name, function () {
    it("renders correctly", function () {
        const topNavBar = new TopNavBarObject();

        //No weather code
        cy.mount(<TopNavBar />);
        topNavBar.components.LocationSearchFormObject((locationSearchFormObject) => {
            locationSearchFormObject.container().should("exist");
        });
    });
});
