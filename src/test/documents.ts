/// <reference types="cypress" />

describe('Sección de Documentos - Pruebas Completas', () => {
  beforeEach(() => {
    cy.login('123456', 'udlap123');
    cy.visit('/documentos');
    cy.url().should('include', '/documentos');
  });

  describe('Listado de Documentos', () => {
    it('debe mostrar las categorías de documentos', () => {
      const categories = ['Registro Inicial', 'Planeación', 'Seguimiento', 'Evaluación Final', 'Recursos'];
      
      categories.forEach(category => {
        cy.get('[data-testid="category-section"]').should('contain', category);
      });
    });

    it('debe mostrar todos los documentos disponibles', () => {
      cy.get('[data-testid="document-card"]').should('have.length.at.least', 10);
    });

    it('debe mostrar metadatos de cada documento', () => {
      cy.get('[data-testid="document-card"]').first().within(() => {
        cy.get('[data-testid="document-name"]').should('be.visible');
        cy.get('[data-testid="document-description"]').should('be.visible');
        cy.get('[data-testid="document-type"]').should('be.visible');
        cy.get('[data-testid="document-size"]').should('be.visible');
        cy.get('[data-testid="document-date"]').should('be.visible');
      });
    });
  });

  describe('Descarga de Documentos', () => {
    it('debe descargar PDF al hacer click en descargar', () => {
      // Interceptar la solicitud de descarga
      cy.intercept('GET', '/documents/formats/formato-registro.pdf', {
        fixture: 'documents/sample-cv.pdf',
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="formato-registro.pdf"'
        }
      }).as('downloadPdf');
      
      cy.get('[data-testid="document-card"]').first()
        .find('[data-testid="download-btn"]')
        .click();
      
      cy.wait('@downloadPdf');
      cy.get('[data-testid="success-toast"]').should('be.visible');
      cy.get('[data-testid="success-toast"]').should('contain', 'Descarga completada');
    });

    it('debe mostrar preview del documento', () => {
      cy.get('[data-testid="document-card"]').first()
        .find('[data-testid="preview-btn"]')
        .click();
      
      cy.get('[data-testid="preview-modal"]').should('be.visible');
      cy.get('[data-testid="preview-iframe"]').should('be.visible');
      cy.get('[data-testid="close-preview"]').click();
      cy.get('[data-testid="preview-modal"]').should('not.exist');
    });

    it('debe manejar error de descarga', () => {
      cy.intercept('GET', '/documents/formats/*', { statusCode: 404 }).as('failedDownload');
      
      cy.get('[data-testid="document-card"]').first()
        .find('[data-testid="download-btn"]')
        .click();
      
      cy.wait('@failedDownload');
      cy.get('[data-testid="error-toast"]').should('be.visible');
      cy.get('[data-testid="error-toast"]').should('contain', 'Error al descargar');
    });
  });

  describe('Subida de Documentos', () => {
    beforeEach(() => {
      // Navegar a la sección de subida (ej: en perfil o etapa 4)
      cy.visit('/guia');
      cy.get('[data-testid="tab-udlap-process"]').click();
      cy.get('[data-testid="stage-item-4"]').click(); // Etapa de CV
    });

    it('debe permitir subir archivo PDF', () => {
      cy.get('[data-testid="upload-cv-tab"]').click();
      
      // Preparar archivo de prueba
      const fileName = 'mi-cv.pdf';
      cy.fixture('documents/sample-cv.pdf', 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
          cy.get('[data-testid="file-input"]').attachFile({
            fileContent,
            fileName,
            mimeType: 'application/pdf'
          });
        });
      
      cy.get('[data-testid="upload-btn"]').click();
      cy.get('[data-testid="success-toast"]').should('be.visible');
      cy.get('[data-testid="success-toast"]').should('contain', 'CV cargado exitosamente');
    });

    it('debe validar tamaño máximo de archivo (5MB)', () => {
      cy.get('[data-testid="upload-cv-tab"]').click();
      
      // Simular archivo > 5MB
      const largeFile = new ArrayBuffer(6 * 1024 * 1024);
      
      cy.get('[data-testid="file-input"]').attachFile({
        fileContent: Cypress.Blob.binaryStringToBlob(String(largeFile)),
        fileName: 'archivo-grande.pdf',
        mimeType: 'application/pdf'
      });
      
      cy.get('[data-testid="file-error"]').should('be.visible');
      cy.get('[data-testid="file-error"]').should('contain', 'El archivo no debe superar 5 MB');
    });

    it('debe validar formato de archivo', () => {
      cy.get('[data-testid="upload-cv-tab"]').click();
      
      // Intentar subir archivo no PDF
      cy.fixture('users.json').then(fileContent => {
        cy.get('[data-testid="file-input"]').attachFile({
          fileContent: JSON.stringify(fileContent),
          fileName: 'archivo-invalido.json',
          mimeType: 'application/json'
        });
      });
      
      cy.get('[data-testid="file-error"]').should('be.visible');
      cy.get('[data-testid="file-error"]').should('contain', 'Solo se permiten archivos PDF');
    });

    it('debe validar nombre del archivo sin caracteres especiales', () => {
      cy.get('[data-testid="upload-cv-tab"]').click();
      
      cy.fixture('documents/sample-cv.pdf', 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
          cy.get('[data-testid="file-input"]').attachFile({
            fileContent,
            fileName: 'mi-cv@#$.pdf',
            mimeType: 'application/pdf'
          });
        });
      
      cy.get('[data-testid="file-error"]').should('be.visible');
      cy.get('[data-testid="file-error"]').should('contain', 'El nombre no debe contener caracteres especiales');
    });
  });

  describe('Estados de Documentos', () => {
    beforeEach(() => {
      cy.visit('/guia');
      cy.get('[data-testid="tab-udlap-process"]').click();
      cy.get('[data-testid="stage-item-8"]').click(); // Etapa de documentos
    });

    it('debe mostrar diferentes estados de documentos', () => {
      const expectedStatuses = ['Completado', 'Pendiente', 'SIN INGRESAR', 'PÓLIZA VIGENTE', 'PÓLIZA VENCIDA'];
      
      cy.get('[data-testid="document-status"]').each(($status) => {
        const statusText = $status.text();
        expect(expectedStatuses).to.include(statusText);
      });
    });

    it('debe mostrar acciones según el estado del documento', () => {
      cy.get('[data-testid="document-card"]').first().within(() => {
        cy.get('[data-testid="document-actions"]').should('be.visible');
      });
    });

    it('debe permitir firmar electrónicamente', () => {
      cy.get('[data-testid="document-card"]')
        .contains('Carta compromiso')
        .parents('[data-testid="document-card"]')
        .find('[data-testid="sign-btn"]')
        .click();
      
      cy.get('[data-testid="sign-modal"]').should('be.visible');
      cy.get('[data-testid="student-id-input"]').type('123456');
      cy.get('[data-testid="password-input"]').type('udlap123');
      cy.get('[data-testid="confirm-sign-btn"]').click();
      
      cy.get('[data-testid="success-toast"]').should('be.visible');
      cy.get('[data-testid="success-toast"]').should('contain', 'Documento firmado exitosamente');
    });
  });

  describe('Filtros y Búsqueda', () => {
    it('debe filtrar documentos por categoría', () => {
      cy.get('[data-testid="category-filter"]').select('Registro Inicial');
      cy.get('[data-testid="document-card"]').each(($card) => {
        cy.wrap($card).find('[data-testid="document-category"]').should('contain', 'Registro Inicial');
      });
    });

    it('debe buscar documentos por nombre', () => {
      cy.get('[data-testid="search-input"]').type('Carta de presentación');
      cy.get('[data-testid="document-card"]').should('have.length', 1);
      cy.get('[data-testid="document-name"]').should('contain', 'Carta de Presentación');
    });

    it('debe mostrar mensaje cuando no hay resultados', () => {
      cy.get('[data-testid="search-input"]').type('Documento inexistente 12345');
      cy.get('[data-testid="no-results"]').should('be.visible');
      cy.get('[data-testid="no-results"]').should('contain', 'No se encontraron documentos');
    });

    it('debe limpiar filtros correctamente', () => {
      cy.get('[data-testid="category-filter"]').select('Registro Inicial');
      cy.get('[data-testid="clear-filters-btn"]').click();
      cy.get('[data-testid="category-filter"]').should('have.value', 'all');
      cy.get('[data-testid="document-card"]').should('have.length.at.least', 10);
    });
  });

  describe('Documentos de Usuario (Subidos)', () => {
    beforeEach(() => {
      cy.visit('/perfil');
    });

    it('debe mostrar documentos subidos por el usuario', () => {
      cy.get('[data-testid="my-documents-section"]').should('be.visible');
      cy.get('[data-testid="uploaded-document"]').should('have.length.at.least', 0);
    });

    it('debe permitir ver documento subido', () => {
      cy.get('[data-testid="uploaded-document"]').first()
        .find('[data-testid="view-document-btn"]')
        .click();
      
      cy.get('[data-testid="preview-modal"]').should('be.visible');
    });

    it('debe permitir eliminar documento subido', () => {
      cy.intercept('DELETE', '/api/documents/*', { success: true }).as('deleteDocument');
      
      cy.get('[data-testid="uploaded-document"]').first()
        .find('[data-testid="delete-document-btn"]')
        .click();
      
      cy.get('[data-testid="confirm-delete-modal"]').should('be.visible');
      cy.get('[data-testid="confirm-delete-btn"]').click();
      
      cy.wait('@deleteDocument');
      cy.get('[data-testid="success-toast"]').should('be.visible');
    });
  });

  describe('Aviso Importante', () => {
    it('debe mostrar el aviso importante', () => {
      cy.get('[data-testid="important-notice"]').should('be.visible');
      cy.get('[data-testid="important-notice"]').should('contain', 'Importante');
      cy.get('[data-testid="important-notice"]').should('contain', 'Asegúrate de descargar las versiones más recientes');
    });
  });

  describe('Sección de Ayuda', () => {
    it('debe mostrar la sección de ayuda', () => {
      cy.get('[data-testid="help-section"]').should('be.visible');
    });

    it('debe tener enlace a tutoriales', () => {
      cy.get('[data-testid="tutorials-link"]').click();
      cy.get('[data-testid="info-toast"]').should('be.visible');
    });

    it('debe tener enlace a contactos', () => {
      cy.get('[data-testid="contacts-link"]').click();
      cy.url().should('include', '/contactos');
    });
  });
});