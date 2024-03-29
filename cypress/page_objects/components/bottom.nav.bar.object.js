import CypressPageObject from "@hammzj/cypress-page-object";
const { ComponentObject } = CypressPageObject;

export default class BottomNavBarObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#bottom-nav-bar`));
    }

    get homeLink() {
        return this.container.contains("a", "Home");
    }

    get aboutLink() {
        return this.container.contains("a", "About");
    }

    get apiAttributionLink() {
        return this.container.contains("a", "Weather data by Open-Meteo.com");
    }

    get gitHubAuthorLink() {
        return this.container.find('svg[data-testid="GitHubIcon"]').parents("a");
    }
}
