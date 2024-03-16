/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

Cypress.Commands.add('registerUser', (email, password, firstName, lastName) => {
    // Place your registration steps here
    cy.get('#register-dialog').click();
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.contains('Save').click();
});

Cypress.Commands.add('loginUser', (email, password) => {
     //click the login button 
     cy.get('#login-dialog').click();
     // Enter login credentials
     cy.get('#email').type(email);
     cy.get('#password').type(password);
     cy.get('#login').click();
});

Cypress.Commands.add('logoutUser', () => {
  cy.get('#logout-dialog').click();
  cy.get('#submit').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to register a user.
       * @example cy.registerUser('email@example.com', 'password123', 'John', 'Doe')
       */
      registerUser(email: string, password: string, firstName: string, lastName: string): Chainable<void>

      /**
       * Custom command to log in a user.
       * @example cy.loginUser('email@example.com', 'password123')
       */
      loginUser(email: string, password: string): Chainable<void>

      /**
       * Custom command to logout any user.
       * @example cy.loginUser()
       */
      logoutUser(): Chainable<void>
    }
  }
}

// cypress/support/commands.js

