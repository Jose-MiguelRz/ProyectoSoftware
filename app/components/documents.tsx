import { FileText, Download, ExternalLink, Calendar } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "./button";
import { Card } from "./card";
import { toast } from "sonner";
import { TOAST_MESSAGES, ACTIONS } from "../constants/design-tokens";

interface Document {
  name: string;
  description: string;
  type: string;
  size: string;
  lastUpdate: string;
  category: string;
}

export function Documents() {
  const documents: Document[] = [
    {
      name: "Formato de Registro de Prácticas",
      description: "Formulario oficial para registrar tu práctica profesional. Debe ser llenado completamente y firmado por el estudiante.",
      type: "PDF",
      size: "245 KB",
      lastUpdate: "Enero 2026",
      category: "Registro Inicial"
    },
    {
      name: "Carta de Presentación",
      description: "Carta institucional que te presenta ante la empresa. Debe ser solicitada y firmada por el coordinador.",
      type: "DOCX",
      size: "32 KB",
      lastUpdate: "Enero 2026",
      category: "Registro Inicial"
    },
    {
      name: "Formato de Aceptación de Empresa",
      description: "Documento que la empresa debe firmar confirmando tu aceptación en el programa de prácticas.",
      type: "PDF",
      size: "198 KB",
      lastUpdate: "Enero 2026",
      category: "Registro Inicial"
    },
    {
      name: "Plan de Trabajo",
      description: "Formato para detallar las actividades, objetivos y metas de tu práctica. Debe ser acordado con tu supervisor.",
      type: "DOCX",
      size: "45 KB",
      lastUpdate: "Enero 2026",
      category: "Planeación"
    },
    {
      name: "Reporte Mensual de Actividades",
      description: "Plantilla para reportes mensuales. Describe tus actividades, horas trabajadas y aprendizajes del periodo.",
      type: "DOCX",
      size: "38 KB",
      lastUpdate: "Enero 2026",
      category: "Seguimiento"
    },
    {
      name: "Control de Horas",
      description: "Hoja de registro semanal de horas. Debe ser firmada por tu supervisor en la empresa.",
      type: "XLSX",
      size: "52 KB",
      lastUpdate: "Enero 2026",
      category: "Seguimiento"
    },
    {
      name: "Evaluación del Supervisor",
      description: "Formato que tu supervisor en la empresa debe completar al finalizar tu práctica.",
      type: "PDF",
      size: "215 KB",
      lastUpdate: "Enero 2026",
      category: "Evaluación Final"
    },
    {
      name: "Reporte Final de Prácticas",
      description: "Plantilla para tu reporte final. Incluye secciones de introducción, desarrollo, conclusiones y anexos.",
      type: "DOCX",
      size: "58 KB",
      lastUpdate: "Enero 2026",
      category: "Evaluación Final"
    },
    {
      name: "Guía para Presentación Final",
      description: "Lineamientos y estructura recomendada para tu presentación de resultados ante el comité.",
      type: "PDF",
      size: "1.2 MB",
      lastUpdate: "Enero 2026",
      category: "Evaluación Final"
    },
    {
      name: "Manual del Estudiante",
      description: "Guía completa con todo el proceso, requisitos, plazos y políticas del programa de prácticas.",
      type: "PDF",
      size: "2.5 MB",
      lastUpdate: "Enero 2026",
      category: "Recursos"
    },
    {
      name: "Rúbrica de Evaluación",
      description: "Criterios detallados de evaluación de reportes, presentación y desempeño general.",
      type: "PDF",
      size: "180 KB",
      lastUpdate: "Enero 2026",
      category: "Recursos"
    },
    {
      name: "FAQ - Preguntas Frecuentes",
      description: "Documento descargable con todas las preguntas frecuentes y sus respuestas.",
      type: "PDF",
      size: "420 KB",
      lastUpdate: "Febrero 2026",
      category: "Recursos"
    }
  ];

  const categories = Array.from(new Set(documents.map((doc) => doc.category)));

  const handleDownload = async (docName: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const message = TOAST_MESSAGES.success.descargaCompletada(docName);
    toast.success(message.title, {
      description: message.description
    });
  };

  const handlePreview = async (docName: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.info("Abriendo vista previa", {
      description: `Cargando ${docName}...`
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Breadcrumbs />
      
      <div>
        <h1 className="text-3xl mb-2">Documentos y Formatos</h1>
        <p className="text-muted-foreground">
          Descarga todos los formatos necesarios para tu proceso de prácticas profesionales
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
        <h2 className="text-lg mb-2 text-primary">Importante</h2>
        <p className="text-muted-foreground">
          Asegúrate de descargar las versiones más recientes de cada documento. Todos los formatos
          deben ser completados con letra legible o de forma digital. Los documentos firmados deben
          ser escaneados en formato PDF antes de enviarlos.
        </p>
      </div>

      {/* Documents by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl">{category}</h2>
          <div className="grid gap-4">
            {documents
              .filter((doc) => doc.category === category)
              .map((doc, index) => (
                <Card key={index} hover>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-lg mb-1">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {doc.description}
                          </p>
                        </div>
                        <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full whitespace-nowrap">
                          {doc.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Download size={14} />
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Actualizado: {doc.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          onClick={() => handleDownload(doc.name)}
                          icon={<Download size={18} />}
                        >
                          {ACTIONS.descargar}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handlePreview(doc.name)}
                          icon={<ExternalLink size={18} />}
                        >
                          Vista Previa
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}

      {/* Help Section */}
      <Card>
        <h2 className="text-xl mb-4">¿Necesitas Ayuda con los Documentos?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="mb-2">Tutoriales en Video</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Consulta nuestros videos tutoriales sobre cómo llenar correctamente cada formato.
            </p>
            <Button
              variant="ghost"
              onClick={() => toast.info(TOAST_MESSAGES.info.proximamente.title, { 
                description: "Los tutoriales estarán disponibles pronto." 
              })}
              icon={<ExternalLink size={14} />}
            >
              Ver Tutoriales
            </Button>
          </div>
          <div>
            <h3 className="mb-2">Asesoría Personalizada</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Si tienes dudas sobre algún documento, agenda una cita con la coordinación.
            </p>
            <Button
              variant="ghost"
              onClick={() => toast.info("Ir a Contactos", { 
                description: "Ve a la sección de Contactos para agendar una cita." 
              })}
              icon={<ExternalLink size={14} />}
            >
              Contactar Coordinación
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
