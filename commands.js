// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getElementByHtml', (element, text) => {
   return cy.get(element).first().should("be.visible").should('have.html', text);
})


Cypress.Commands.add('checkUrlContains', (url) => {
   cy.url().should('include', url)
})


Cypress.Commands.add('checkforPageLoad', () => {
   cy.intercept({
      method: 'GET',
      url: 'https://api.shopist.io/*',
   }).as('productDataJson');
   cy.wait('@productDataJson').its('response.statusCode').should('equal', 200)
})

Cypress.Commands.add('assertElementText', (element, text) => {
   cy.get(element).should('have.text', text)
})


Cypress.Commands.add('assertElementContainsText', (element, text) => {
   cy.get(element).should('include.text', text)
})