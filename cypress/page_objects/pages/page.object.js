import ElementCollection from '../element.collection';

export default class PageObject extends ElementCollection {
    constructor(path = '', baseUrl = Cypress.config().baseUrl) {
        super(() => cy.get(`body`));
        this._path = path;
        this._baseUrl = baseUrl;
    }

    url(path) {
        return this.#urlObject(path).toString();
    }

    #urlObject() {
        const path = `${Cypress.env().USE_HASH_ROUTER ? '#' : ''}${this._path}`;
        return new URL(path, this._baseUrl ?? Cypress.config().baseUrl);
    }
}
