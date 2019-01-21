/* eslint-disable */

describe('Sample tests', () => {
    it('Visits index page', () => {
      cy.visit('/');
      cy.contains('h1', 'flatfair');
    });
  
    it('Contains documentation button', () => {
      cy.visit('/');
      cy.contains('a', 'Documentation');
      // cy.get('a').click();
    });
  });