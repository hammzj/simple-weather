import ElementCollection from "../element.collection";

export default class BottomNavBarObject extends ElementCollection {
    constructor() {
        super(() => cy.get(`#bottom-nav-bar`));
    }

    get homeLink() {
        return this.container.contains('a', 'Home');
    }

    get aboutLink() {
        return this.container.contains('a', 'About');
    }

   get gitHubAuthorLink() {
        return this.container.find('svg[data-testid="GitHubIcon"]').parents('a');
    }

}

