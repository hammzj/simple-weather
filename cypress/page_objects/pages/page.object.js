import { PageObject as PageObjectBaseClass } from "@hammzj/cypress-page-object";

export default class PageObject extends PageObjectBaseClass {
    constructor(metadata) {
        super(metadata);
    }

    url(path) {
        return this.#urlObject(path).toString();
    }

    // Due to deployment on a "github-pages.com" host, we need to use hash routing to construct URLs.
    // This is the only reason why this class is being implemented as an extension of the package's PageObject
    #urlObject() {
        const path = `${Cypress.env().USE_HASH_ROUTER ? "#" : ""}${this.metadata.path}`;
        return new URL(path, this.metadata.baseUrl ?? Cypress.config().baseUrl);
    }
}
