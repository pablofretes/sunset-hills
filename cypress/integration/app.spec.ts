describe('App', () => {
    it('Can access site', () => {
        cy.visit('http://localhost:3000');
    });

    it('Contains a container with a scroll and a button', () => {
        cy.get('[data-cy=scroll-container]');
        cy.get('[data-cy=scroll-input]');
        cy.get('[data-cy=scroll-submit]');
        cy.contains('Buildings');
    });

    it('Contains a sun', () => {
        cy.get('[data-cy=sun]');
    });

    it('Clicking go button creates and shuffles buildings', () => {
        cy.get('[data-cy=scroll-submit]').click();
        cy.get('[data-cy=0-button-decrease]');
        cy.get('[data-cy=1-button-decrease]');
        cy.get('[data-cy=2-button-decrease]');
        cy.get('[data-cy=0-button-increase]');
        cy.get('[data-cy=1-button-increase]');
        cy.get('[data-cy=2-button-increase]');
    });
})