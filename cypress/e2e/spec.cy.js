describe('My First Test', () => {
  it('Visits the app and shows login page', () => {
    cy.visit('/')
    cy.contains('Iniciar Sesión').should('be.visible')
  })

  it('displays login form elements', () => {
    cy.visit('/')
    cy.get('#studentId').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('shows error for empty fields', () => {
    cy.visit('/')
    cy.get('button[type="submit"]').click()
    cy.contains('Por favor, completa todos los campos')
  })
})