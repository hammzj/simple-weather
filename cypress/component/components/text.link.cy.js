import TextLink from '../../../src/components/text.link';


describe(TextLink.name, function () {
    it('renders correctly with provided values', function () {
        cy.mount(<TextLink href='/about'>About</TextLink>);
        cy.contains('a', 'About').should('exist').and('have.attr', 'href', '/about');
    });
});
