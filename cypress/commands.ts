/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      uploadFile(selector: string, fileName: string): Chainable<void>;
      downloadDocument(documentName: string): Chainable<void>;
      waitForToast(message: string): Chainable<void>;
    }
  }
}

// Comando de login
Cypress.Commands.add('login', (studentId: string, password: string) => {
  cy.session([studentId, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="student-id-input"]').type(studentId);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-submit"]').click();
    cy.url().should('not.include', '/login');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });
});

// Comando de logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-btn"]').click();
  cy.url().should('include', '/login');
});

// Comando para subir archivo
Cypress.Commands.add('uploadFile', (selector: string, fileName: string) => {
  cy.fixture(`documents/${fileName}`, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
      cy.get(selector).attachFile({
        fileContent,
        fileName,
        mimeType: 'application/pdf'
      });
    });
});

// Comando para esperar toast
Cypress.Commands.add('waitForToast', (message: string) => {
  cy.get('[data-testid="toast-message"]', { timeout: 5000 })
    .should('be.visible')
    .and('contain', message);
});