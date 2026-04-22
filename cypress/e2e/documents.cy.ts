/// <reference types="cypress" />

describe('Documentos', () => {
  it('debe permitir acceder a la aplicación', () => {
    cy.visit('/')
    cy.contains('Iniciar Sesión').should('be.visible')
  })
})


  describe('Visualización de Documentos', () => {
    it('debe cargar la guía del estudiante P1', () => {
      cy.fixture('documents/guiaEstudianteP1.pdf').should('exist');
    });

    it('debe cargar la guía del estudiante P2', () => {
      cy.fixture('documents/guiaEstudianteP2.pdf').should('exist');
    });

    it('debe cargar el documento de entrega del proyecto', () => {
      cy.fixture('documents/entregaProyectoLiveTextEstudiantes.pdf').should('exist');
    });

    it('debe cargar la rúbrica de autoevaluación', () => {
      cy.fixture('documents/rubricaAutoevaluacion.pdf').should('exist');
    });

    it('debe cargar la rúbrica de desarrollo de soluciones', () => {
      cy.fixture('documents/rubricaDesarrollodeSoluciones.pdf').should('exist');
    });
  });

  describe('Descarga de Documentos', () => {
    it('debe descargar la guía P1', () => {
      cy.intercept('GET', '/api/documents/download/guiaP1', {
        fixture: 'documents/guiaEstudianteP1.pdf',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="guiaEstudianteP1.pdf"'
        }
      }).as('downloadGuiaP1');
      
      cy.get('button').contains('Descargar Guía P1').click();
      cy.wait('@downloadGuiaP1');
    });

    it('debe descargar la guía P2', () => {
      cy.intercept('GET', '/api/documents/download/guiaP2', {
        fixture: 'documents/guiaEstudianteP2.pdf',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="guiaEstudianteP2.pdf"'
        }
      }).as('downloadGuiaP2');
      
      cy.get('button').contains('Descargar Guía P2').click();
      cy.wait('@downloadGuiaP2');
    });

    it('debe descargar documento de entrega', () => {
      cy.intercept('GET', '/api/documents/download/entrega', {
        fixture: 'documents/entregaProyectoLiveTextEstudiantes.pdf',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="entregaProyectoLiveTextEstudiantes.pdf"'
        }
      }).as('downloadEntrega');
      
      cy.get('button').contains('Descargar Entrega').click();
      cy.wait('@downloadEntrega');
    });

    it('debe descargar rúbrica de autoevaluación', () => {
      cy.intercept('GET', '/api/documents/download/rubricaAuto', {
        fixture: 'documents/rubricaAutoevaluacion.pdf',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="rubricaAutoevaluacion.pdf"'
        }
      }).as('downloadRubricaAuto');
      
      cy.get('button').contains('Descargar Rúbrica').click();
      cy.wait('@downloadRubricaAuto');
    });

    it('debe descargar rúbrica de desarrollo de soluciones', () => {
      cy.intercept('GET', '/api/documents/download/rubricaDev', {
        fixture: 'documents/rubricaDesarrollodeSoluciones.pdf',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="rubricaDesarrollodeSoluciones.pdf"'
        }
      }).as('downloadRubricaDev');
      
      cy.get('button').contains('Descargar Rúbrica Desarrollo').click();
      cy.wait('@downloadRubricaDev');
    });
  });

  describe('Subida de Documentos', () => {
    it('debe permitir subir entrega del proyecto', () => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/documents/entregaProyectoLiveTextEstudiantes.pdf');
      cy.get('button').contains('Subir').click();
    });

    it('debe permitir subir guía estudiante P1', () => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/documents/guiaEstudianteP1.pdf');
      cy.get('button').contains('Subir').click();
    });

    it('debe permitir subir guía estudiante P2', () => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/documents/guiaEstudianteP2.pdf');
      cy.get('button').contains('Subir').click();
    });

    it('debe permitir subir rúbrica de autoevaluación', () => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/documents/rubricaAutoevaluacion.pdf');
      cy.get('button').contains('Subir').click();
    });

    it('debe permitir subir rúbrica de desarrollo', () => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/documents/rubricaDesarrollodeSoluciones.pdf');
      cy.get('button').contains('Subir').click();
    });
  });

  describe('Visualización en Modal', () => {
    it('debe mostrar guía P1 en modal', () => {
      cy.get('button').contains('Ver Guía P1').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('iframe').should('be.visible');
    });

    it('debe mostrar guía P2 en modal', () => {
      cy.get('button').contains('Ver Guía P2').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('iframe').should('be.visible');
    });

    it('debe mostrar entrega en modal', () => {
      cy.get('button').contains('Ver Entrega').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('iframe').should('be.visible');
    });

    it('debe mostrar rúbrica autoevaluación en modal', () => {
      cy.get('button').contains('Ver Rúbrica').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('iframe').should('be.visible');
    });

    it('debe mostrar rúbrica desarrollo en modal', () => {
      cy.get('button').contains('Ver Rúbrica Desarrollo').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('iframe').should('be.visible');
    });

    it('debe cerrar modal al hacer clic en botón cerrar', () => {
      cy.get('button').contains('Ver Guía P1').click();
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('button').contains('Cerrar').click();
      cy.get('[role="dialog"]').should('not.exist');
    });
  });

  describe('Listado de Documentos', () => {
    it('debe mostrar todos los documentos disponibles', () => {
      cy.get('a').should('have.length.at.least', 5);
    });

    it('debe tener enlaces funcionales para cada documento', () => {
      cy.get('a').each(($link) => {
        cy.wrap($link).should('have.attr', 'href');
      });
    });
  });
});