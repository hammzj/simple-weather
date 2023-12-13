import ElementCollection from '../element.collection';

export default class PageObject extends ElementCollection {
    constructor(path = '', baseUrl = Cypress.config().baseUrl) {
        super(() => cy.get(`body`));
        this._path = path;
        this._baseUrl = baseUrl;
    }

    _visit(path) {
        return cy.visit(this.#url(path));
    }

    #url(path) {
        return this.#urlObject(path).toString();
    }

    #urlObject() {
        return new URL(this._path, this._baseUrl ?? Cypress.config().baseUrl);
    }
}
