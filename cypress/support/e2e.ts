/// <reference types="cypress" />

// Comando personalizado para login
Cypress.Commands.add('login', (studentId: string, password: string) => {
  cy.visit('/');
  cy.get('#studentId').type(studentId);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// Comando para logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-btn"]').click();
  cy.url().should('include', '/');
});

// Tipos de TypeScript para los comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      login(studentId: string, password: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}