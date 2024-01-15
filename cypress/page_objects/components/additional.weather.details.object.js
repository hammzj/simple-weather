import CypressPageObject from "@hammzj/cypress-page-object";

const { ComponentObject } = CypressPageObject;

export default class AdditionalWeatherDetailsObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#additional-weather-details`));
    }

    tr(title) {
        return this.container.contains(`td`, title).parents(`tr`);
    }

    _assertRowTitlesInOrder(expectedTitles) {
        cy.wrap([]).as("additionalWeatherDetailsRowTitles");
        this.container.find(`tr`).each(($tr) => {
            cy.wrap($tr)
                .find(`td`)
                .eq(0)
                .then(($td) => {
                    cy.get(`@additionalWeatherDetailsRowTitles`).then((actual) =>
                        actual.push($td.text())
                    );
                });
        });
        cy.get(`@additionalWeatherDetailsRowTitles`).then((actual) => {
            expectedTitles.forEach((expected, i) => {
                expect(actual[i]).to.eq(expected);
            });
        });
    }

    _assertTitleAndValue(title, value) {
        this.tr(title).find(`td`).eq(0).should("have.text", title);
        this.tr(title).find(`td`).eq(1).should("have.text", value);
    }
}
