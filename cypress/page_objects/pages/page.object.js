import CypressPageObject from "@hammzj/cypress-page-object";

const PageObjectBaseClass = CypressPageObject.PageObject;

export default class PageObject extends PageObjectBaseClass {
    constructor(path = "", baseUrl = Cypress.config().baseUrl) {
        super(() => cy.get(`body`));
        this._path = path;
        this._baseUrl = baseUrl;
    }

    url(path) {
        return this.#urlObject(path).toString();
    }

    // Due to deployment on a "github-pages.com" host, we need to use hash routing to construct URLs.
    // This is the only reason why this class is being implemented as an extension of the package's PageObject
    #urlObject() {
        const path = `${Cypress.env().USE_HASH_ROUTER ? "#" : ""}${this._path}`;
        return new URL(path, this._baseUrl ?? Cypress.config().baseUrl);
    }
}
