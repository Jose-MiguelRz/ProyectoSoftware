/// <reference types="cypress" />

describe('Guía Paso a Paso - Pruebas Completas', () => {
  beforeEach(() => {
    // Login antes de cada prueba
    cy.login('123456', 'udlap123');
    cy.visit('/guia');
    cy.url().should('include', '/guia');
  });

  describe('Vista de Guía Rápida (8 pasos)', () => {
    beforeEach(() => {
      cy.get('[data-testid="tab-quick-guide"]').click();
      cy.get('[data-testid="quick-guide-view"]').should('be.visible');
    });

    it('debe mostrar los 8 pasos correctamente', () => {
      cy.get('[data-testid="step-item"]').should('have.length', 8);
      
      // Verificar títulos de los pasos
      const expectedSteps = [
        'Verificar Requisitos',
        'Seleccionar Empresa',
        'Reunión con Coordinador',
        'Completar Documentación',
        'Recibir Aprobación Oficial',
        'Iniciar Práctica Profesional',
        'Entregas y Seguimiento',
        'Finalización y Presentación'
      ];
      
      expectedSteps.forEach((step, index) => {
        cy.get(`[data-testid="step-title-${index + 1}"]`).should('contain', step);
      });
    });

    it('debe mostrar la barra de progreso correctamente', () => {
      cy.get('[data-testid="progress-bar"]').should('be.visible');
      cy.get('[data-testid="progress-text"]').should('contain', '0 de 8 pasos completados');
      cy.get('[data-testid="progress-percentage"]').should('contain', '0%');
    });

    it('debe permitir navegar entre pasos', () => {
      // Click en paso 3 directamente
      cy.get('[data-testid="step-item-3"]').click();
      cy.get('[data-testid="active-step"]').should('contain', 'Paso 3');
      
      // Usar botones de navegación
      cy.get('[data-testid="next-step-btn"]').click();
      cy.get('[data-testid="active-step"]').should('contain', 'Paso 4');
      
      cy.get('[data-testid="prev-step-btn"]').click();
      cy.get('[data-testid="active-step"]').should('contain', 'Paso 3');
    });

    it('debe mostrar detalles del paso activo', () => {
      cy.get('[data-testid="step-item-1"]').click();
      cy.get('[data-testid="step-details"]').should('be.visible');
      cy.get('[data-testid="step-details"]').should('contain', 'Tener al menos el 70% de créditos completados');
      cy.get('[data-testid="step-details"]').should('contain', 'Promedio mínimo de 7.0');
    });

    it('debe mostrar advertencia si no cumple requisitos', () => {
      // Mock de requisitos no cumplidos
      cy.intercept('GET', '/api/student/requirements', {
        eligible: false,
        reasons: [
          'Necesitas al menos 70% de créditos completados',
          'El promedio mínimo requerido es 7.0'
        ]
      });
      
      cy.reload();
      cy.get('[data-testid="step-item-1"]').click();
      cy.get('[data-testid="next-step-btn"]').click();
      cy.get('[data-testid="requirements-warning"]').should('be.visible');
    });

    it('debe guardar el progreso en localStorage', () => {
      cy.get('[data-testid="step-item-2"]').click();
      cy.reload();
      
      // Verificar que el paso se guardó
      cy.get('[data-testid="active-step"]').should('contain', 'Paso 2');
      cy.get('[data-testid="step-completed-1"]').should('be.visible');
    });

    it('debe permitir reiniciar el progreso', () => {
      // Avanzar algunos pasos
      cy.get('[data-testid="step-item-3"]').click();
      cy.get('[data-testid="next-step-btn"]').click();
      cy.get('[data-testid="next-step-btn"]').click();
      
      // Reiniciar
      cy.get('[data-testid="reset-progress-btn"]').click();
      cy.get('[data-testid="confirm-reset"]').click();
      
      cy.get('[data-testid="active-step"]').should('contain', 'Paso 1');
      cy.get('[data-testid="progress-text"]').should('contain', '0 de 8 pasos completados');
    });

    it('debe mostrar mensaje de finalización al completar', () => {
      // Completar todos los pasos
      for (let i = 1; i <= 8; i++) {
        cy.get(`[data-testid="step-item-${i}"]`).click();
        if (i < 8) {
          cy.get('[data-testid="next-step-btn"]').click();
        }
      }
      
      cy.get('[data-testid="finish-btn"]').click();
      cy.get('[data-testid="completion-toast"]').should('be.visible');
      cy.get('[data-testid="completion-toast"]').should('contain', '¡Felicidades!');
    });

    it('debe mostrar duración estimada de cada paso', () => {
      const expectedDurations = ['1 día', '1-2 semanas', '1 semana', '1 semana', '3-5 días', '12 semanas', 'Durante toda la práctica', '1-2 semanas'];
      
      expectedDurations.forEach((duration, index) => {
        cy.get(`[data-testid="step-duration-${index + 1}"]`).should('contain', duration);
      });
    });
  });

  describe('Vista de Proceso UDLAP (9 etapas)', () => {
    beforeEach(() => {
      cy.get('[data-testid="tab-udlap-process"]').click();
      cy.get('[data-testid="udlap-process-view"]').should('be.visible');
    });

    it('debe mostrar las 9 etapas del proceso', () => {
      cy.get('[data-testid="stage-item"]').should('have.length', 9);
      
      const expectedStages = [
        'Acceso y requisitos',
        'Registro',
        'Curso de preparación',
        'Currículum (CV)',
        'Explorar proyectos y postularme',
        'Postulaciones, entrevista y resultado',
        'Inscripción de materia',
        'Seguimiento, formalización y documentos',
        'Práctica en curso y cierre'
      ];
      
      expectedStages.forEach((stage, index) => {
        cy.get(`[data-testid="stage-title-${index + 1}"]`).should('contain', stage);
      });
    });

    it('debe mostrar chips de estado para cada etapa', () => {
      cy.get('[data-testid="stage-status"]').each(($status) => {
        const statusText = $status.text();
        expect(['Bloqueado', 'Disponible', 'En revisión', 'Con observaciones', 'Aprobado', 'Completado']).to.include(statusText);
      });
    });

    it('debe mostrar panel de detalle al seleccionar etapa (Desktop)', () => {
      cy.viewport(1280, 720);
      cy.get('[data-testid="stage-item-1"]').click();
      cy.get('[data-testid="stage-detail-panel"]').should('be.visible');
      cy.get('[data-testid="stage-detail-title"]').should('contain', 'Acceso y requisitos');
    });

    it('debe mostrar acordeones en móvil', () => {
      cy.viewport(375, 667);
      cy.get('[data-testid="stage-accordion-1"]').click();
      cy.get('[data-testid="stage-detail-content-1"]').should('be.visible');
    });

    it('debe mostrar checklist de requisitos por etapa', () => {
      cy.get('[data-testid="stage-item-1"]').click();
      cy.get('[data-testid="stage-checklist"]').should('be.visible');
      cy.get('[data-testid="checklist-item"]').should('have.length.at.least', 5);
      
      // Verificar items específicos de etapa 1
      cy.get('[data-testid="checklist-item"]').should('contain', 'Contar con equipo de escritorio o laptop');
      cy.get('[data-testid="checklist-item"]').should('contain', 'Tener 120 unidades aprobadas');
    });

    it('debe mostrar acciones por etapa', () => {
      cy.get('[data-testid="stage-item-2"]').click();
      cy.get('[data-testid="stage-actions"]').should('be.visible');
      cy.get('[data-testid="primary-action"]').should('contain', 'Iniciar registro');
      cy.get('[data-testid="secondary-actions"]').should('have.length.at.least', 2);
    });

    it('debe mostrar contenido adicional en etapas específicas', () => {
      // Etapa 2 tiene registro extemporáneo
      cy.get('[data-testid="stage-item-2"]').click();
      cy.get('[data-testid="additional-content"]').should('be.visible');
      cy.get('[data-testid="additional-content"]').should('contain', 'Registro extemporáneo');
      
      // Etapa 4 tiene tabs de CV
      cy.get('[data-testid="stage-item-4"]').click();
      cy.get('[data-testid="cv-tabs"]').should('be.visible');
      cy.get('[data-testid="tab-cargar-cv"]').should('contain', 'Cargar un CV (PDF)');
      cy.get('[data-testid="tab-capturar-cv"]').should('contain', 'Capturar CV (en el sistema)');
    });

    it('debe mostrar documentos requeridos en etapa 8', () => {
      cy.get('[data-testid="stage-item-8"]').click();
      cy.get('[data-testid="documents-list"]').should('be.visible');
      cy.get('[data-testid="document-card"]').should('have.length.at.least', 4);
      
      const expectedDocs = ['Carta de inicio', 'Carta compromiso', 'Póliza de seguro', 'Carta de presentación'];
      expectedDocs.forEach(doc => {
        cy.get('[data-testid="document-card"]').should('contain', doc);
      });
    });

    it('debe mostrar botón para saltar a guía rápida relacionada', () => {
      const stagesWithQuickGuide = [1, 5, 6, 8, 9];
      
      stagesWithQuickGuide.forEach(stageId => {
        cy.get(`[data-testid="stage-item-${stageId}"]`).click();
        cy.get('[data-testid="jump-to-quick-guide"]').should('be.visible');
      });
    });

    it('debe cambiar a guía rápida y hacer scroll al paso correcto', () => {
      cy.get('[data-testid="stage-item-5"]').click();
      cy.get('[data-testid="jump-to-quick-guide"]').click();
      
      // Debe cambiar a la pestaña de guía rápida
      cy.get('[data-testid="tab-quick-guide"]').should('have.class', 'active');
      cy.get('[data-testid="quick-guide-view"]').should('be.visible');
      
      // Debe hacer scroll al paso 2 (mapeo: etapa 5 → paso 2)
      cy.get('[data-testid="step-item-2"]').should('be.visible');
    });

    it('debe mostrar tooltip en etapas bloqueadas', () => {
      cy.get('[data-testid="stage-item-3"]').click();
      cy.get('[data-testid="blocked-tooltip"]').trigger('mouseenter');
      cy.get('[data-testid="tooltip-content"]').should('be.visible');
      cy.get('[data-testid="tooltip-content"]').should('contain', 'Completa el Registro para habilitar');
    });
  });

  describe('Componentes compartidos', () => {
    it('debe mostrar el selector de tabs correctamente', () => {
      cy.get('[data-testid="tab-quick-guide"]').should('be.visible');
      cy.get('[data-testid="tab-udlap-process"]').should('be.visible');
      
      // Verificar que el valor predeterminado es "quick"
      cy.get('[data-testid="tab-quick-guide"]').should('have.class', 'active');
    });

    it('debe guardar la vista seleccionada en localStorage', () => {
      cy.get('[data-testid="tab-udlap-process"]').click();
      cy.reload();
      cy.get('[data-testid="tab-udlap-process"]').should('have.class', 'active');
    });

    it('debe mostrar el resumen de progreso en el header', () => {
      cy.get('[data-testid="progress-summary"]').should('be.visible');
      cy.get('[data-testid="progress-percentage"]').should('be.visible');
      cy.get('[data-testid="next-action"]').should('be.visible');
    });

    it('debe mostrar el botón flotante de soporte', () => {
      cy.get('[data-testid="support-fab"]').should('be.visible');
    });

    it('debe abrir modal de soporte al hacer click', () => {
      cy.get('[data-testid="support-fab"]').click();
      cy.get('[data-testid="support-modal"]').should('be.visible');
      cy.get('[data-testid="support-textarea"]').should('be.visible');
      cy.get('[data-testid="support-submit"]').should('be.disabled');
      
      cy.get('[data-testid="support-textarea"]').type('Tengo una duda sobre el proceso');
      cy.get('[data-testid="support-submit"]').should('be.enabled');
    });

    it('debe enviar duda correctamente', () => {
      cy.intercept('POST', '/api/support', { success: true }).as('sendSupport');
      
      cy.get('[data-testid="support-fab"]').click();
      cy.get('[data-testid="support-textarea"]').type('¿Cómo puedo cargar mi CV?');
      cy.get('[data-testid="support-submit"]').click();
      
      cy.wait('@sendSupport');
      cy.get('[data-testid="success-toast"]').should('be.visible');
      cy.get('[data-testid="success-toast"]').should('contain', 'Duda enviada');
    });
  });

  describe('Responsive Design', () => {
    it('debe mostrar stepper vertical en desktop', () => {
      cy.viewport(1280, 720);
      cy.get('[data-testid="tab-udlap-process"]').click();
      cy.get('[data-testid="desktop-stepper"]').should('be.visible');
      cy.get('[data-testid="mobile-accordions"]').should('not.be.visible');
    });

    it('debe mostrar acordeones en móvil', () => {
      cy.viewport(375, 667);
      cy.get('[data-testid="tab-udlap-process"]').click();
      cy.get('[data-testid="mobile-accordions"]').should('be.visible');
      cy.get('[data-testid="desktop-stepper"]').should('not.be.visible');
    });
  });
});