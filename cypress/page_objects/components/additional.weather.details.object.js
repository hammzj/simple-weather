import { ComponentObject } from "@hammzj/cypress-page-object";

export default class AdditionalWeatherDetailsObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#additional-weather-details`));
        this.addElements = {
            trs: () => this.container().find(`tr`),
            tr: (title) => this.container().contains(`td`, title).parents(`tr`),
        };
    }

    assertRowTitlesInOrder(expectedTitles) {
        cy.wrap([]).as("additionalWeatherDetailsRowTitles");
        this.elements.trs().each(($tr) => {
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

    assertTitleAndValue(title, value) {
        this.elements.tr(title).find(`td`).eq(0).should("have.text", title);
        this.elements.tr(title).find(`td`).eq(1).should("have.text", value);
    }
}
