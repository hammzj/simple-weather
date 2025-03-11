import { ComponentObject } from "@hammzj/cypress-page-object";

export default class BottomNavBarObject extends ComponentObject {
    constructor() {
        super(() => cy.get(`#bottom-nav-bar`));
        this.addElements = {
            homeLink: () => this.container().contains("a", "Home"),
            aboutLink: () => this.container().contains("a", "About"),
            apiAttributionLink: () =>
                this.container().contains("a", "Weather data by Open-Meteo.com"),
            gitHubAuthorLink: () =>
                this.container().find('svg[data-testid="GitHubIcon"]').parents("a"),
        };
    }
}
