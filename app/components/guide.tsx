import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Info, RotateCcw, AlertTriangle, MessageCircle, Lock, AlertCircle, ChevronRight, ChevronDown } from "lucide-react";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "./button";
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";
import { useStudentProfile } from "./student-profile-provider";
import { toast } from "sonner";

interface Step {
  id: number;
  title: string;
  description: string;
  details: string[];
  duration: string;
  tooltip?: string;
  requiresEligibility?: boolean;
}

type StageStatus = "Bloqueado" | "Disponible" | "En revisión" | "Con observaciones" | "Aprobado" | "Completado";
type GuideView = "quick" | "udlap";

interface Stage {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: StageStatus;
  duration?: string;
  blockReason?: string;
  summary: string;
  checklist: string[];
  actions: {
    primary?: { label: string; action: string };
    secondary?: { label: string; action: string }[];
  };
  additionalContent?: React.ReactNode;
}

export function Guide() {
  const { meetsInternshipRequirements } = useStudentProfile();
  const { language } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("guide-current-step");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [showRequirementsWarning, setShowRequirementsWarning] = useState(false);
  const [activeView, setActiveView] = useState<GuideView>(() => {
    const saved = localStorage.getItem("guideView");
    return (saved as GuideView) || "quick";
  });
  const [selectedStage, setSelectedStage] = useState(1);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState(() => {
    const saved = localStorage.getItem("guide-support-message");
    return saved || "";
  });
  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([1]);

  // Guardar progreso y vista en localStorage
  useEffect(() => {
    localStorage.setItem("guide-current-step", currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("guideView", activeView);
  }, [activeView]);

  // Guardar mensaje de soporte automáticamente
  useEffect(() => {
    if (supportMessage) {
      localStorage.setItem("guide-support-message", supportMessage);
    }
  }, [supportMessage]);

  const steps: Step[] = language === "en" ? [
    {
      id: 1,
      title: "Verify Requirements",
      description: "Make sure you meet all academic requirements",
      duration: "1 day",
      tooltip: "It is important to verify these requirements before continuing with the process",
      requiresEligibility: true,
      details: [
        "Have at least 70% of degree credits completed",
        "Minimum GPA of 7.0",
        "Be enrolled in the current semester",
        "Have completed required prerequisite courses",
        "Have active school insurance"
      ]
    },
    {
      id: 2,
      title: "Choose a Company",
      description: "Pick from available companies or propose an external one",
      duration: "1-2 weeks",
      tooltip: "Take your time choosing a company that matches your career goals",
      details: [
        "Review affiliated companies in the 'Available Companies' section",
        "Consider location, schedule, and whether the position is paid",
        "If you prefer an external company, prepare a proposal",
        "Contact the company directly to confirm availability",
        "Make sure the activities are related to your degree"
      ]
    },
    {
      id: 3,
      title: "Meet with the Coordinator",
      description: "Schedule an appointment with the internship coordinator",
      duration: "1 week",
      details: [
        "Request an appointment with the internship office",
        "Present your company proposal and work plan",
        "Discuss your learning objectives",
        "Get feedback on your choice",
        "Receive preliminary authorization"
      ]
    },
    {
      id: 4,
      title: "Complete Documentation",
      description: "Fill out and submit all required forms",
      duration: "1 week",
      details: [
        "Download the forms from the 'Documents' section",
        "Complete the Internship Registration Form",
        "Request a signed cover letter from the coordinator",
        "Obtain the company acceptance letter",
        "Complete the work plan with your supervisor",
        "Submit all documents to the coordinator"
      ]
    },
    {
      id: 5,
      title: "Receive Official Approval",
      description: "Wait for final approval from the coordination team",
      duration: "3-5 days",
      details: [
        "The coordinator will review your full documentation",
        "You will receive a confirmation email",
        "An academic advisor will be assigned to you",
        "You will receive civil liability insurance",
        "Your internship will be officially registered in the system"
      ]
    },
    {
      id: 6,
      title: "Start the Internship",
      description: "Begin your experience at the company",
      duration: "12 weeks",
      details: [
        "Present your documentation to the company supervisor",
        "Attend the initial onboarding and training",
        "Set a weekly work plan",
        "Maintain regular communication with your academic advisor",
        "Track your activities and worked hours"
      ]
    },
    {
      id: 7,
      title: "Reports and Follow-up",
      description: "Complete monthly reports and evaluations",
      duration: "Throughout the internship",
      details: [
        "Submit Report 1 after 4 weeks (160 hours)",
        "Submit Report 2 after 8 weeks (320 hours)",
        "Keep track of your hours and activities",
        "Request feedback from your supervisor",
        "Attend follow-up meetings with your advisor"
      ]
    },
    {
      id: 8,
      title: "Completion and Presentation",
      description: "Finish your internship and present your results",
      duration: "1-2 weeks",
      details: [
        "Complete the required 480 hours",
        "Request the final evaluation from your supervisor",
        "Prepare your final internship report",
        "Create a presentation of your accomplishments and learning",
        "Present your results to the evaluation committee",
        "Receive your final grade"
      ]
    }
  ] : [
    {
      id: 1,
      title: "Verificar Requisitos",
      description: "Asegúrate de cumplir con todos los requisitos académicos",
      duration: "1 día",
      tooltip: "Es importante verificar estos requisitos antes de continuar con el proceso",
      requiresEligibility: true,
      details: [
        "Tener al menos el 70% de créditos completados",
        "Promedio mínimo de 7.0",
        "Estar inscrito en el semestre actual",
        "Haber completado los cursos obligatorios previos",
        "Tener tu seguro escolar activo"
      ]
    },
    {
      id: 2,
      title: "Seleccionar Empresa",
      description: "Elige entre las empresas disponibles o propón una externa",
      duration: "1-2 semanas",
      tooltip: "Toma tu tiempo para elegir una empresa que se alinee con tus objetivos profesionales",
      details: [
        "Revisa las empresas afiliadas en la sección 'Empresas Disponibles'",
        "Considera la ubicación, el horario y si es remunerado",
        "Si prefieres una empresa externa, prepara una propuesta",
        "Contacta directamente con la empresa para verificar disponibilidad",
        "Asegúrate de que las actividades estén relacionadas con tu carrera"
      ]
    },
    {
      id: 3,
      title: "Reunión con Coordinador",
      description: "Agenda una cita con el coordinador de prácticas",
      duration: "1 semana",
      details: [
        "Solicita una cita en la oficina de prácticas profesionales",
        "Presenta tu propuesta de empresa y plan de trabajo",
        "Discute tus objetivos de aprendizaje",
        "Obtén retroalimentación sobre tu elección",
        "Recibe la autorización preliminar"
      ]
    },
    {
      id: 4,
      title: "Completar Documentación",
      description: "Llena y entrega todos los formatos requeridos",
      duration: "1 semana",
      details: [
        "Descarga los formatos de la sección 'Documentos'",
        "Llena el Formato de Registro de Prácticas",
        "Solicita la Carta de Presentación firmada por el coordinador",
        "Obtén la Carta de Aceptación firmada por la empresa",
        "Completa el Plan de Trabajo con tu supervisor",
        "Entrega todos los documentos a la coordinación"
      ]
    },
    {
      id: 5,
      title: "Recibir Aprobación Oficial",
      description: "Espera la aprobación final de la coordinación",
      duration: "3-5 días",
      details: [
        "La coordinación revisará tu documentación completa",
        "Recibirás un correo de confirmación",
        "Se te asignará un asesor académico",
        "Recibirás el seguro de responsabilidad civil",
        "Se registrará oficialmente tu práctica en el sistema"
      ]
    },
    {
      id: 6,
      title: "Iniciar Práctica Profesional",
      description: "Comienza tu experiencia en la empresa",
      duration: "12 semanas",
      details: [
        "Presenta tu documentación al supervisor en la empresa",
        "Asiste a la inducción y capacitación inicial",
        "Establece un plan de trabajo semanal",
        "Mantén comunicación regular con tu asesor académico",
        "Registra tus actividades y horas trabajadas"
      ]
    },
    {
      id: 7,
      title: "Entregas y Seguimiento",
      description: "Cumple con los reportes mensuales y evaluaciones",
      duration: "Durante toda la práctica",
      details: [
        "Entrega Reporte 1 al cumplir 4 semanas (160 horas)",
        "Entrega Reporte 2 al cumplir 8 semanas (320 horas)",
        "Mantén registro de tus horas y actividades",
        "Solicita retroalimentación de tu supervisor",
        "Participa en reuniones de seguimiento con tu asesor"
      ]
    },
    {
      id: 8,
      title: "Finalización y Presentación",
      description: "Completa tu práctica y presenta resultados",
      duration: "1-2 semanas",
      details: [
        "Completa las 480 horas requeridas",
        "Solicita la Evaluación Final de tu supervisor",
        "Elabora tu Reporte Final de prácticas",
        "Prepara una presentación de tus logros y aprendizajes",
        "Presenta tus resultados ante el comité evaluador",
        "Recibe tu calificación final"
      ]
    }
  ];

  const englishStages: Stage[] = [
    {
      id: 1,
      title: "Access and Requirements",
      description: "Verify you meet the requirements to log in to the system and start your internship.",
      icon: "🔐",
      status: "Completado",
      summary: "Verify you meet the requirements to log in to the system and start your internship.",
      checklist: [
        "Have a desktop or laptop.",
        "Use a compatible browser: Google Chrome, Firefox, Microsoft Edge, or Safari.",
        "Log in with your institutional ID and password (and additional factor if required).",
        "Be an active undergraduate student.",
        "Have 120 approved units.",
        "If you have more than one degree, select which one you will use for your internship."
      ],
      actions: {
        primary: { label: "Go to login", action: "login" },
        secondary: [
          { label: "View requirements", action: "requirements" },
          { label: "Send question", action: "support" }
        ]
      }
    },
    {
      id: 2,
      title: "Registration",
      description: "Complete your registration to open the process.",
      icon: "📝",
      status: "Disponible",
      summary: "Complete your registration to open the process.",
      checklist: [
        "Register within the allowed registration period."
      ],
      actions: {
        primary: { label: "Start registration", action: "register" },
        secondary: [
          { label: "Update registration", action: "update-register" },
          { label: "View registration status", action: "view-status" }
        ]
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Update registration:</strong> you can modify some personal data and your emergency contact; you can only cancel or activate your registration if you have not progressed beyond the process.
            </p>
            <div className="bg-card rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Late registration</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If you did not complete registration within the period, you can request late registration only during permitted dates. The request is sent for review by the department.
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Provide a justification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Wait for a decision (approved or rejected) by email.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Only if the status is 'Under review', you can cancel the request; if you cancel, you cannot submit it again in the same period.</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Request late registration</Button>
                <Button variant="outline" size="sm">Cancel request</Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Preparation Course",
      description: "Complete the preparation course to enable your CV.",
      icon: "📚",
      status: "Bloqueado",
      blockReason: "Complete registration to enable this stage.",
      summary: "Complete the preparation course to enable your CV.",
      checklist: [
        "Have completed registration.",
        "Be within the dates indicated by email."
      ],
      actions: {
        primary: { label: "View course result", action: "view-results" },
        secondary: [
          { label: "Send question", action: "support" }
        ]
      },
      additionalContent: (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
          <p className="text-sm text-blue-900">
            When entering this option, a modal appears with the result, course completion date, and module score (if you have completed it and the department has uploaded the results).
          </p>
          <p className="text-sm text-blue-900 mt-2">
            <strong>Next stage:</strong> Curriculum (CV).
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "Curriculum (CV)",
      description: "Create or upload your CV and send it for review to apply.",
      icon: "📄",
      status: "Bloqueado",
      blockReason: "Complete the preparation course.",
      summary: "Create or upload your CV and send it for review to apply.",
      checklist: [
        "Overall preparation course result: Approved.",
        "Be within the dates to create or modify the CV."
      ],
      actions: {
        primary: { label: "Upload CV", action: "upload-cv" },
        secondary: [
          { label: "Capture CV in system", action: "create-cv" }
        ]
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Upload a CV (PDF)</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Select a .PDF file.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Name your CV with your ID and full name.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>The PDF must not exceed 5 MB.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>The file name should not include dots or special characters.</span>
                </li>
              </ul>
              <Button variant="primary" size="sm" className="w-full">Upload and submit for review</Button>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Capture CV in the system</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Enter the required information in every tab.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Upload a photo in .JPG, .JPEG, or .PNG format (≤ 5 MB).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>The file name should not include dots or special characters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Save progress (status: Draft).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Submit your CV for review.</span>
                </li>
              </ul>
              <Button variant="primary" size="sm" className="w-full">Capture CV</Button>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border">
            <h4 className="font-medium mb-2">CV Statuses</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-muted text-foreground rounded text-xs">Draft</span>
                <span className="text-muted-foreground">you can continue editing.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Under review</span>
                <span className="text-muted-foreground">wait for department review.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">With observations</span>
                <span className="text-muted-foreground">see comments and correct.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Cancelled</span>
                <span className="text-muted-foreground">CV cancelled.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Approved</span>
                <span className="text-muted-foreground">you can continue to apply.</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Explore projects and apply",
      description: "Browse organizations and available projects, then apply.",
      icon: "🔍",
      status: "Bloqueado",
      blockReason: "Aprueba el Curso y el CV",
      summary: "Browse organizations and available projects, then apply.",
      checklist: [
        "Preparation course: Approved.",
        "CV: Approved.",
        "Have not reached the application limit (1).",
        "Be within the application submission dates."
      ],
      actions: {
        primary: { label: "View projects and apply", action: "view-projects" },
        secondary: [
          { label: "Filter organizations", action: "filter" },
          { label: "Send question", action: "support" }
        ]
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              View available organizations and projects.
            </p>
            <p className="text-sm text-muted-foreground">
              If your degree/course allows it, you may also apply for Self-Directed or Representative Team internships.
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-medium mb-2">Propose an organization</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You can propose an unlisted organization. When you propose one, you cannot apply to another project; you must wait for the organization to register details, submit the project, and receive committee approval.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Enter the organization and contact details.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Confirm to send an email to the contact.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Proposal status: 'Submitted by student'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Wait for approval; if it is not registered or approved, wait until the department cancels the proposal before applying to another organization.</span>
              </li>
            </ul>
            <Button variant="outline" size="sm">Propose organization</Button>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Applications, Interview, and Result",
      description: "Track your applications, interviews, and final outcome.",
      icon: "📋",
      status: "Bloqueado",
      blockReason: "Submit an application first.",
      summary: "Track your applications, interviews, and final outcome.",
      checklist: [
        "Have submitted an application."
      ],
      actions: {
        primary: { label: "View my applications", action: "view-applications" },
        secondary: [
          { label: "Send question", action: "support" }
        ]
      },
      additionalContent: (
        <div className="space-y-3 mt-4">
          <StageContentModule title="View progress and details">
            <p className="text-sm text-muted-foreground">
              Open the progress page and click 'View application' for details.
            </p>
          </StageContentModule>

          <StageContentModule title="Cancel application">
            <p className="text-sm text-muted-foreground mb-2">
              You can only cancel if the status is: 'Applied', 'Interview scheduled', or 'Interviewed'.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Enter a comment explaining the reason.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>If you cancel, you cannot apply to that project again.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>An email is sent to the organization informing them of the cancellation.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Cover letter for application (optional)">
            <p className="text-sm text-muted-foreground mb-2">Considerations:</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>It cannot be issued 'To whom it may concern'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>The process continues in Academic Services once sent by the coordinator; the student receives a copy of the email.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Later changes may incur issuance costs.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>The document is kept for six months.</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mb-2">Steps:</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Request it (fill out the modal data).</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Sign electronically with your institutional ID and password.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>When you receive the letter, upload it as a PDF (≤5 MB and file name without dots or special characters).</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Once uploaded, the organization can view it.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Interview">
            <p className="text-sm text-muted-foreground mb-2">
              The organization proposes a date and modality. You will receive an email with the date/time, modality, location/phone/link, interviewer, and comments.
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="primary" size="sm">Confirm interview</Button>
              <Button variant="outline" size="sm">Propose another date</Button>
            </div>
          </StageContentModule>

          <StageContentModule title="Application result">
            <p className="text-sm text-muted-foreground mb-3">
              The organization may accept you, reject you, or request another interview.
            </p>
            <p className="text-sm text-muted-foreground mb-2">If you are accepted:</p>
            <div className="flex gap-2 mb-3">
              <Button variant="primary" size="sm">Accept collaboration</Button>
              <Button variant="outline" size="sm">Do not accept</Button>
            </div>
            <p className="text-sm text-blue-900 bg-blue-50 p-3 rounded border border-blue-200">
              <strong>Note:</strong> If the Commitment Letter is required, you should go to Follow-up in My Internships to sign it.
            </p>
          </StageContentModule>
        </div>
      )
    },
    {
      id: 7,
      title: "Register internship course",
      description: "Enroll in your internship course when the period opens.",
      icon: "🎓",
      status: "Bloqueado",
      blockReason: "Complete the previous stages.",
      summary: "Enroll in your internship course when the period opens.",
      checklist: [
        "Be within the internship course registration dates."
      ],
      actions: {
        primary: { label: "View enrollment information", action: "view-enrollment" }
      },
      additionalContent: (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
          <p className="text-sm text-blue-900">
            Entering this option shows an informational message.
          </p>
        </div>
      )
    },
    {
      id: 8,
      title: "Follow-up, formalization, and documents",
      description: "Manage your active internship, fulfill formalization requirements, and avoid cancellations for noncompliance.",
      icon: "📑",
      status: "Bloqueado",
      blockReason: "The organization must accept you first.",
      summary: "Manage your active internship, fulfill formalization requirements, and avoid cancellations for noncompliance.",
      checklist: [
        "Have an internship accepted by the organization."
      ],
      actions: {
        primary: { label: "View follow-up", action: "view-tracking" }
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-900">
                <strong>Important:</strong> You must meet the deadlines; otherwise, the Office of Professional Internships may cancel your internship.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Internship in progress and closure",
      description: "During your internship, manage evaluations, control courses (if applicable), self-management documents, and finish properly.",
      icon: "✅",
      status: "Bloqueado",
      blockReason: "Complete formalization first.",
      summary: "During your internship, manage evaluations, control courses (if applicable), self-management documents, and finish properly.",
      checklist: [],
      actions: {
        primary: { label: "View internship in progress", action: "view-practice" }
      },
      additionalContent: (
        <div className="space-y-3 mt-4">
          <StageContentModule title="Control course (if applicable)">
            <p className="text-sm text-muted-foreground mb-2">
              If your internship extends another period, contact your Coordinator to assign a control course.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>If assigned, an informational email will arrive.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Status and extended period are displayed; clicking the period shows details.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Evaluations">
            <p className="text-sm text-muted-foreground mb-3">
              During the internship, you must complete the midterm evaluation and the experience evaluation (for some internship types) within the defined dates.
            </p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">Answer</Button>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </StageContentModule>

          <StageContentModule title="Performance evaluation">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Case 1:</strong> If the organization completed it and authorized viewing, you will be able to see it.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Case 2 (Self-directed + Internship 2):</strong>
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Download the form.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>The organization fills out data and signs it.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Scan and upload the PDF (≤5 MB, without dots/special characters in the name).</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Once uploaded, it can be viewed.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="In-progress internship requirements (self-directed only)">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-sm mb-2">Internship 1:</h5>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium mb-1">1) Self-directed project presentation form</p>
                    <p className="text-muted-foreground">Complete it before the deadline (enter the requested information). Once signed, it can be viewed.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">2) Digital copy of the self-directed project to present</p>
                    <p className="text-muted-foreground">Upload it before the deadline. PDF ≤5 MB; file name without dots/special characters. After uploading, it can be downloaded.</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">Internship 2:</h5>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium mb-1">1) Acceptance letter for the self-directed project</p>
                    <p className="text-muted-foreground">Enter the data and save. Print it for the organization's signature. Scan and upload the PDF (≤5 MB; name without dots/special characters). After uploading, it can be downloaded.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">2) Self-directed commitment copy</p>
                    <p className="text-muted-foreground">Print it, fill in the data, and have the organization sign it. Scan and upload the PDF (≤5 MB; name without dots/special characters). After uploading, it can be downloaded.</p>
                  </div>
                </div>
              </div>
            </div>
          </StageContentModule>

          <StageContentModule title="Internship released (when applicable)">
            <p className="text-sm text-muted-foreground mb-3">
              Released means the organization has finished your internship, but you have pending evaluations and/or documents. Once you complete them, you can finish your internship.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Pending evaluations:</p>
                <p className="text-sm text-muted-foreground">Answer pending evaluations.</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Completion letter for self-directed internship (self-directed only + Internship 2):</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Print the letter with the requested data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Obtain the organization's signature.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Scan and upload the PDF (≤5 MB; without dots/special characters).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>After uploading, it can be downloaded.</span>
                  </li>
                </ul>
              </div>
              <Button variant="primary" size="sm" disabled>Finish internship (complete pending items)</Button>
            </div>
          </StageContentModule>

          <StageContentModule title="Finalized internship">
            <p className="text-sm text-muted-foreground">
              When the status is Finalized, it means you have finished your internship. You can view evaluations and closing documents (if applicable).
            </p>
          </StageContentModule>

          <StageContentModule title="Options for a second internship">
            <p className="text-sm text-muted-foreground mb-3">
              Only if: Internship completed + Internship 1 course + 'Internship in organization' type
            </p>
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-medium mb-1">Option 1: Do internship at another organization</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Start registration when the period opens.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Apply when the application period opens.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-medium mb-1">Option 2: Continue in the same project or another project at the same organization</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Start registration when the period opens.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Apply to the same organization when the period opens.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-medium mb-1">Option 3: Request credit for excess hours</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Fill out the request form.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>The internship office reviews and resolves the request.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Wait for the result.</span>
                  </li>
                </ul>
              </div>
            </div>
          </StageContentModule>

          <StageContentModule title="Request hour credit (if applicable)">
            <p className="text-sm text-muted-foreground mb-3">
              Process flow:
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Open the modal; enter a comment; confirm the request.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>The request can be viewed from the same button or from 'General internship data'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>It can only be canceled if the status is 'Under validation'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>It is also visible from the home screen with the link 'Hour credit request'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>You will receive an email with the resolution; if approved, Internship 2 appears with status 'Hour credit'.</span>
              </li>
            </ul>
            <Button variant="outline" size="sm">Hour credit request</Button>
          </StageContentModule>
        </div>
      )
    }
  ];

  const stages: Stage[] = language === "en" ? englishStages : [
    {
      id: 1,
      title: "Acceso y requisitos",
      description: "Verifica que cumples los requisitos para ingresar al sistema y comenzar tus prácticas.",
      icon: "🔐",
      status: "Completado",
      summary: "Verifica que cumples los requisitos para ingresar al sistema y comenzar tus prácticas.",
      checklist: [
        "Contar con equipo de escritorio o laptop.",
        "Contar con navegador compatible: Google Chrome, Firefox, Microsoft Edge o Safari.",
        "Ingresar al sistema con tu ID y contraseña institucional (y adicional si aplica).",
        "Ser estudiante activo de grado Licenciatura o Bachelor.",
        "Tener 120 unidades aprobadas.",
        "Si tienes más de una licenciatura, seleccionar con cuál realizarás tus prácticas."
      ],
      actions: {
        primary: { label: "Ir a iniciar sesión", action: "login" },
        secondary: [
          { label: "Ver requisitos", action: "requirements" },
          { label: "Enviar duda", action: "support" }
        ]
      }
    },
    {
      id: 2,
      title: "Registro",
      description: "Realiza tu registro para abrir el proceso.",
      icon: "📝",
      status: "Disponible",
      summary: "Realiza tu registro para abrir el proceso.",
      checklist: [
        "Estar dentro de las fechas de registro."
      ],
      actions: {
        primary: { label: "Iniciar registro", action: "register" },
        secondary: [
          { label: "Actualizar registro", action: "update-register" },
          { label: "Ver estado de registro", action: "view-status" }
        ]
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Actualizar registro:</strong> podrás modificar algunos datos personales y el contacto de emergencia; también podrás cancelar o activar tu registro solo si no has avanzado más allá del proceso.
            </p>
            <div className="bg-card rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Registro extemporáneo</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Si no realizaste el registro dentro del periodo, puedes solicitar registro extemporáneo solo dentro de fechas permitidas. La solicitud se envía a valoración del área.
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Ingresar una justificación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Esperar resolución (aprobada o rechazada) por correo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Solo si está 'En revisión', puedes cancelar la solicitud; si cancelas, no podrás volver a realizarla en el mismo periodo.</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Solicitar registro extemporáneo</Button>
                <Button variant="outline" size="sm">Cancelar solicitud</Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Curso de preparación",
      description: "Completa el curso de preparación para habilitar tu CV.",
      icon: "📚",
      status: "Bloqueado",
      blockReason: "Completa el Registro para habilitar",
      summary: "Completa el curso de preparación para habilitar tu CV.",
      checklist: [
        "Haber realizado el Registro.",
        "Estar dentro de las fechas indicadas por correo electrónico."
      ],
      actions: {
        primary: { label: "Ver resultado del curso", action: "view-results" },
        secondary: [
          { label: "Enviar duda", action: "support" }
        ]
      },
      additionalContent: (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
          <p className="text-sm text-blue-900">
            Al entrar, se muestra un modal con resultado, fecha de realización de cursos y puntaje por módulo (si ya los realizaste y el área cargó resultados).
          </p>
          <p className="text-sm text-blue-900 mt-2">
            <strong>Siguiente etapa:</strong> Currículum (CV).
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "Currículum (CV)",
      description: "Crea o carga tu CV y envíalo a revisión para poder postularte.",
      icon: "📄",
      status: "Bloqueado",
      blockReason: "Completa el Curso de preparación",
      summary: "Crea o carga tu CV y envíalo a revisión para poder postularte.",
      checklist: [
        "Resultado global del curso de preparación: Aprobado.",
        "Estar dentro de fechas para crear o modificar el CV."
      ],
      actions: {
        primary: { label: "Cargar CV", action: "upload-cv" },
        secondary: [
          { label: "Capturar CV en el sistema", action: "create-cv" }
        ]
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Cargar un CV (PDF)</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Seleccionar archivo .PDF.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Nombrar tu CV con tu ID y nombre completo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>El PDF no debe superar 5 MB.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>El nombre del archivo no debe contener puntos o caracteres especiales.</span>
                </li>
              </ul>
              <Button variant="primary" size="sm" className="w-full">Cargar y enviar a revisión</Button>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Capturar CV (en el sistema)</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Capturar datos requeridos en todas las pestañas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Cargar fotografía en formato .JPG, .JPEG o .PNG (≤ 5 MB).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>El nombre del archivo no debe contener puntos o caracteres especiales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Guardar avances (estatus: Borrador).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Enviar mi CV a revisión.</span>
                </li>
              </ul>
              <Button variant="primary" size="sm" className="w-full">Capturar CV</Button>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border">
            <h4 className="font-medium mb-2">Estados del CV</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-muted text-foreground rounded text-xs">Borrador</span>
                <span className="text-muted-foreground">puedes continuar editando.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">En revisión</span>
                <span className="text-muted-foreground">espera revisión del área.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Con observaciones</span>
                <span className="text-muted-foreground">ver comentarios y corregir.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Cancelado</span>
                <span className="text-muted-foreground">CV cancelado.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Aprobado</span>
                <span className="text-muted-foreground">puedes continuar a postulación.</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Explorar proyectos y postularme",
      description: "Consulta organizaciones y proyectos disponibles y postúlate.",
      icon: "🔍",
      status: "Bloqueado",
      blockReason: "Aprueba el Curso y el CV",
      summary: "Consulta organizaciones y proyectos disponibles y postúlate.",
      checklist: [
        "Curso de preparación: Aprobado.",
        "CV: Aprobado.",
        "No haber llegado al límite de postulaciones (1).",
        "Estar dentro de fechas para realizar postulaciones."
      ],
      actions: {
        primary: { label: "Ver proyectos y postularme", action: "view-projects" },
        secondary: [
          { label: "Filtrar organizaciones", action: "filter" },
          { label: "Enviar duda", action: "support" }
        ]
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Ver organizaciones y proyectos disponibles.
            </p>
            <p className="text-sm text-muted-foreground">
              Si tu carrera/materia lo permite, también puedes postularte a Autogestión o Equipo representativo.
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-medium mb-2">Proponer organización</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Puedes proponer una organización no listada. Al proponer, no podrás postularte a otro proyecto; debes esperar a que la organización registre datos, se registre el proyecto y sea aprobado por el comité.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Capturar datos de la organización y del contacto.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Confirmar para enviar correo electrónico al contacto.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Estatus de propuesta: 'Alta por parte del estudiante'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Esperar a que se apruebe; si no se registra o no se aprueba, esperar a que el área cancele la propuesta para poder postularte a otra organización.</span>
              </li>
            </ul>
            <Button variant="outline" size="sm">Proponer organización</Button>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Postulaciones, entrevista y resultado",
      description: "Da seguimiento a tus postulaciones, entrevistas y al resultado final.",
      icon: "📋",
      status: "Bloqueado",
      blockReason: "Realiza una postulación primero",
      summary: "Da seguimiento a tus postulaciones, entrevistas y al resultado final.",
      checklist: [
        "Haber realizado una postulación."
      ],
      actions: {
        primary: { label: "Ver mis postulaciones", action: "view-applications" },
        secondary: [
          { label: "Enviar duda", action: "support" }
        ]
      },
      additionalContent: (
        <div className="space-y-3 mt-4">
          <StageContentModule title="Ver avance y detalle">
            <p className="text-sm text-muted-foreground">
              Abrir el avance y, para ver detalle, entrar a 'Ver la postulación'.
            </p>
          </StageContentModule>

          <StageContentModule title="Cancelar postulación">
            <p className="text-sm text-muted-foreground mb-2">
              Puedes cancelar solo si el estatus es: 'Postulado', 'Con entrevista' o 'Entrevistado'.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Ingresar comentario con la razón.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Al cancelar, no podrás volver a postularte a ese proyecto.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Se envía correo a la organización informando la cancelación.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Carta de presentación para postulación (opcional)">
            <p className="text-sm text-muted-foreground mb-2">Consideraciones:</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>No podrá ser emitida &apos;a quien corresponda&apos;.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>El trámite continúa en Servicios Escolares una vez enviado por el coordinador; el estudiante recibe copia del correo.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Cambios posteriores pueden generar costo de emisión.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>El tiempo de conservación del documento es de seis meses.</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mb-2">Pasos:</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Solicitar (llenar datos en modal).</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Firmar electrónicamente con ID y contraseña institucional.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Cuando recibas la carta, cargarla en PDF (≤5 MB y sin puntos/caracteres especiales en el nombre).</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Una vez cargada, la organización podrá visualizarla.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Entrevista">
            <p className="text-sm text-muted-foreground mb-2">
              La organización propone fecha y modalidad. Te llegará un correo con fecha/hora, modalidad, lugar/teléfono/enlace, entrevistador y comentarios.
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="primary" size="sm">Confirmar entrevista</Button>
              <Button variant="outline" size="sm">Proponer otra fecha</Button>
            </div>
          </StageContentModule>

          <StageContentModule title="Resultado de la postulación">
            <p className="text-sm text-muted-foreground mb-3">
              La organización puede aceptarte, rechazarte o solicitar otra entrevista.
            </p>
            <p className="text-sm text-muted-foreground mb-2">Si te aceptan:</p>
            <div className="flex gap-2 mb-3">
              <Button variant="primary" size="sm">Aceptar colaborar</Button>
              <Button variant="outline" size="sm">No aceptar</Button>
            </div>
            <p className="text-sm text-blue-900 bg-blue-50 p-3 rounded border border-blue-200">
              <strong>Nota:</strong> Si la Carta Compromiso es requisito, deberás ir a Seguimiento a mis prácticas para firmarla.
            </p>
          </StageContentModule>
        </div>
      )
    },
    {
      id: 7,
      title: "Inscripción de materia",
      description: "Inscribe tu materia de prácticas cuando se abra el periodo.",
      icon: "🎓",
      status: "Bloqueado",
      blockReason: "Completa las etapas anteriores",
      summary: "Inscribe tu materia de prácticas cuando se abra el periodo.",
      checklist: [
        "Estar dentro de las fechas para inscribir la materia de prácticas."
      ],
      actions: {
        primary: { label: "Ver información de inscripción", action: "view-enrollment" }
      },
      additionalContent: (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
          <p className="text-sm text-blue-900">
            Al entrar a esta opción se muestra un mensaje informativo.
          </p>
        </div>
      )
    },
    {
      id: 8,
      title: "Seguimiento, formalización y documentos",
      description: "Gestiona tu práctica activa, cumple requisitos de formalización y evita cancelaciones por incumplimiento.",
      icon: "📑",
      status: "Bloqueado",
      blockReason: "La organización debe aceptarte primero",
      summary: "Gestiona tu práctica activa, cumple requisitos de formalización y evita cancelaciones por incumplimiento.",
      checklist: [
        "Tener una práctica aceptada por la organización."
      ],
      actions: {
        primary: { label: "Ver seguimiento", action: "view-tracking" }
      },
      additionalContent: (
        <div className="space-y-4 mt-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-900">
                <strong>Importante:</strong> Debes cumplir requisitos antes de las fechas límite; de lo contrario, la Dirección de Prácticas en la Profesión podría cancelar tu práctica.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Práctica en curso y cierre",
      description: "Durante tu práctica, gestiona evaluaciones, curso de control (si aplica), documentos de autogestión y finaliza correctamente.",
      icon: "✅",
      status: "Bloqueado",
      blockReason: "Completa formalización primero",
      summary: "Durante tu práctica, gestiona evaluaciones, curso de control (si aplica), documentos de autogestión y finaliza correctamente.",
      checklist: [],
      actions: {
        primary: { label: "Ver práctica en curso", action: "view-practice" }
      },
      additionalContent: (
        <div className="space-y-3 mt-4">
          <StageContentModule title="Curso de control (si aplica)">
            <p className="text-sm text-muted-foreground mb-2">
              Si tu práctica se extiende un periodo más, contacta a tu Coordinador para que asigne un curso de control.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Si se asigna, llega correo informativo.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Se muestra estatus y periodo extendido; al dar clic en el periodo se ve detalle.</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Evaluaciones">
            <p className="text-sm text-muted-foreground mb-3">
              Durante la práctica debes contestar evaluación intermedia y evaluación de experiencia (en algunos tipos de prácticas) dentro de las fechas definidas.
            </p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">Contestar</Button>
              <Button variant="outline" size="sm">Ver</Button>
            </div>
          </StageContentModule>

          <StageContentModule title="Evaluación de desempeño">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Caso 1:</strong> Si la organización la realizó y autorizó vista, podrás verla.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Caso 2 (Autogestión + materia Prácticas 2):</strong>
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Descargar formato</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>La organización llena datos y firma</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Escanear y cargar PDF (≤5 MB, sin puntos/caracteres especiales)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Una vez cargado, se puede visualizar</span>
              </li>
            </ul>
          </StageContentModule>

          <StageContentModule title="Requisitos de la práctica en curso (solo Autogestión)">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-sm mb-2">Práctica 1:</h5>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium mb-1">1) Formato presentación del proyecto de autogestión</p>
                    <p className="text-muted-foreground">Llenar antes de fecha límite (capturar datos solicitados). Una vez firmado, se puede ver.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">2) Copia digital del proyecto de autogestión a presentar</p>
                    <p className="text-muted-foreground">Cargar antes de fecha límite. PDF ≤5 MB; nombre sin puntos/caracteres especiales. Tras cargar, se puede descargar.</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">Práctica 2:</h5>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium mb-1">1) Carta de aceptación del proyecto de autogestión</p>
                    <p className="text-muted-foreground">Capturar datos y guardar. Imprimir para firma de la organización. Escanear y cargar PDF (≤5 MB; nombre sin puntos/caracteres especiales). Tras cargar, se puede descargar.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">2) Copia compromiso autogestión</p>
                    <p className="text-muted-foreground">Imprimir, llenar datos y firmar por la organización. Escanear y cargar PDF (≤5 MB; nombre sin puntos/caracteres especiales). Tras cargar, se puede descargar.</p>
                  </div>
                </div>
              </div>
            </div>
          </StageContentModule>

          <StageContentModule title="Práctica liberada (cuando aplique)">
            <p className="text-sm text-muted-foreground mb-3">
              Liberada significa que la organización finalizó tu práctica, pero tienes evaluaciones y/o documentos pendientes. Al cumplirlos, podrás finalizar tu práctica.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Evaluaciones pendientes:</p>
                <p className="text-sm text-muted-foreground">Contestar evaluaciones pendientes.</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Carta de término autogestión (solo Autogestión + Prácticas 2):</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Imprimir carta con datos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Firma de organización.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Escanear y cargar PDF (≤5MB; sin puntos/caracteres especiales).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span>Tras cargar, se puede descargar.</span>
                  </li>
                </ul>
              </div>
              <Button variant="primary" size="sm" disabled>Finalizar práctica (completa pendientes)</Button>
            </div>
          </StageContentModule>

          <StageContentModule title="Práctica finalizada">
            <p className="text-sm text-muted-foreground">
              Cuando el estatus es Finalizada, significa que has terminado tu práctica. Puedes ver evaluaciones y documentos de cierre (si aplica).
            </p>
          </StageContentModule>

          <StageContentModule title="Opciones para segunda práctica">
            <p className="text-sm text-muted-foreground mb-3">
              Solo si: Práctica finalizada + materia Prácticas 1 + tipo 'Práctica en organización'
            </p>
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-medium mb-1">Opción 1: Realizar prácticas en otra organización</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Iniciar registro cuando se abra el periodo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Postularse cuando se abra el periodo de postulaciones.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-medium mb-1">Opción 2: Continuar en el mismo proyecto u otro de la misma organización</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Iniciar registro cuando se abra el periodo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Postularse en la misma organización cuando se abra el periodo.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-medium mb-1">Opción 3: Solicitar acreditar horas excedentes</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Llenar formulario de solicitud.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>La dirección de prácticas revisa y resuelve.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={14} />
                    <span>Esperar resultado.</span>
                  </li>
                </ul>
              </div>
            </div>
          </StageContentModule>

          <StageContentModule title="Solicitar acreditación de horas (si aplica)">
            <p className="text-sm text-muted-foreground mb-3">
              Flujo del proceso:
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Abrir modal; ingresar comentario; confirmar solicitud.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Se puede ver la solicitud desde el mismo botón o desde 'Datos generales de la práctica'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Se puede cancelar solo si el estatus es 'En validación'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>También se ve desde pantalla de inicio con enlace 'Solicitud de acreditación de horas'.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <span>Llega correo con resolución; si se aprueba, Práctica 2 aparece con estatus 'Acreditación de horas'.</span>
              </li>
            </ul>
            <Button variant="outline" size="sm">Acreditación de horas</Button>
          </StageContentModule>
        </div>
      )
    }
  ];

  const completedSteps = currentStep - 1;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleResetProgress = () => {
    setCurrentStep(1);
    localStorage.removeItem("guide-current-step");
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    const nextStepData = steps.find(s => s.id === nextStep);
    
    if (currentStep === 1 && nextStepData?.requiresEligibility) {
      const requirements = meetsInternshipRequirements();
      if (!requirements.eligible) {
        setShowRequirementsWarning(true);
        return;
      }
    }
    
    if (nextStep <= steps.length) {
      setCurrentStep(nextStep);
      setShowRequirementsWarning(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowRequirementsWarning(false);
    }
  };

  const handleSupportSubmit = () => {
    if (supportMessage.trim()) {
      // Crear correo con la duda
      const emailSubject = translate(language, "guide.supportSubject");
      const emailBody = `${translate(language, "guide.supportBodyIntro")}${supportMessage}\n\n---\n${translate(language, "guide.supportEmailOpeningDescription")}`;
      
      // Abrir cliente de correo
      const mailtoLink = `mailto:practicas.profesionales@udlap.mx?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      
      // Toast informativo
      toast.success(translate(language, "guide.supportEmailOpeningTitle"), {
        description: translate(language, "guide.supportEmailOpeningDescription")
      });
      // Limpiar el localStorage después de enviar
      localStorage.removeItem("guide-support-message");
      setSupportMessage("");
      setShowSupportModal(false);
    }
  };

  const handleViewChange = (view: GuideView) => {
    setActiveView(view);
    if (view === "udlap") {
      setSelectedStage(1);
    }
  };

  const handleJumpToQuickGuide = (stageId: number) => {
    // Mapeo de etapa a paso
    const stageToStepMap: Record<number, number> = {
      1: 1,
      5: 2,
      6: 3,
      8: 4,
      9: 6
    };
    
    const targetStep = stageToStepMap[stageId];
    if (targetStep) {
      setActiveView("quick");
      setTimeout(() => {
        setCurrentStep(targetStep);
        const element = document.getElementById(`step-${targetStep}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  const toggleAccordion = (stageId: number) => {
    setExpandedAccordions(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case "Completado": return "bg-green-100 text-green-700 border-green-200";
      case "Aprobado": return "bg-green-100 text-green-700 border-green-200";
      case "Disponible": return "bg-blue-100 text-blue-700 border-blue-200";
      case "En revisión": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Con observaciones": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Bloqueado": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusLabel = (status: StageStatus) => {
    const statusMap: Record<StageStatus, string> = {
      "Bloqueado": "blocked",
      "Disponible": "available",
      "En revisión": "underReview",
      "Con observaciones": "withObservations",
      "Aprobado": "approved",
      "Completado": "completed",
    };

    return translate(language, `guide.status.${statusMap[status]}`);
  };

  const getCurrentStageStatus = () => {
    const completedCount = stages.filter(s => s.status === "Completado").length;
    return `${completedCount}/9`;
  };

  const getNextAction = () => {
    if (activeView === "quick") {
      return currentStep < steps.length
        ? translate(language, "guide.completeStep").replace("{step}", String(currentStep))
        : translate(language, "guide.processCompleted");
    } else {
      const nextStage = stages.find(s => s.status === "Disponible" || s.status === "En revisión");
      return nextStage ? nextStage.title : translate(language, "guide.reviewPendingStages");
    }
  };

  const requirements = meetsInternshipRequirements();
  const currentStage = stages.find(s => s.id === selectedStage);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Breadcrumbs />
      
      {/* Header */}
      <div className="bg-card rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl mb-2">{translate(language, "guide.title")}</h1>
            <p className="text-muted-foreground">
              {translate(language, "guide.subtitle")}
            </p>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border min-w-[260px]">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{translate(language, "guide.progressProcess")}</span>
                <span className="font-medium">{activeView === "quick" ? Math.round(progressPercentage) : Math.round((stages.filter(s => s.status === "Completado").length / stages.length) * 100)}%</span>
              </div>
              {activeView === "quick" ? (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{translate(language, "guide.currentStep")}:</span>
                  <span className="font-medium">{currentStep}/8</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{translate(language, "guide.currentStep")}:</span>
                  <span className="font-medium">{getCurrentStageStatus()}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground">{translate(language, "guide.nextAction")}:</span>
              </div>
              <p className="text-xs text-primary font-medium">{getNextAction()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="bg-card rounded-lg shadow-sm p-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleViewChange("quick")}
            className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
              activeView === "quick"
                ? "bg-primary text-white"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <span className="font-medium">{translate(language, "guide.quickGuide")}</span>
          </button>
          <button
            onClick={() => handleViewChange("udlap")}
            className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
              activeView === "udlap"
                ? "bg-primary text-white"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <span className="font-medium">{translate(language, "guide.udlapProcess")}</span>
          </button>
        </div>
      </div>

      {/* Quick Guide View */}
      {activeView === "quick" && (
        <div className="space-y-6">
          
          {/* Banner to System */}
          <div className="bg-secondary rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-3">{translate(language, "guide.bannerTitle")}</h2>
            <p className="text-white/90 mb-4">
              {translate(language, "guide.bannerDescription")}
            </p>
            <a
              href="https://aplicaciones.udlap.mx/SistemadePracticasUDLAPEstudiantes/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {translate(language, "guide.accessSystem")}
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Requirements Warning */}
          {showRequirementsWarning && (
            <div className="bg-destructive/10 border-l-4 border-destructive rounded-lg p-6 animate-in fade-in">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-medium text-destructive mb-2">{translate(language, "guide.cannotContinue")}</h3>
                  <p className="text-sm text-destructive/80 mb-2">
                    {translate(language, "guide.requirementsWarning")}
                  </p>
                  <ul className="text-sm text-destructive/80 space-y-1 mb-3">
                    {requirements.reasons.map((reason, idx) => (
                      <li key={idx}>• {reason}</li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRequirementsWarning(false)}
                  >
                    {translate(language, "common.ok")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Progreso del Proceso</span>
                <TooltipWrapper content="Este indicador muestra cuántos pasos has completado del total. Tu progreso se guarda automáticamente." />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {translate(language, "guide.completedSteps")
                    .replace("{completed}", String(completedSteps))
                    .replace("{total}", String(steps.length))}
                </span>
                {currentStep > 1 && (
                  <button
                    onClick={handleResetProgress}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                    aria-label="Reiniciar progreso"
                  >
                    <RotateCcw size={14} />
                    Reiniciar
                  </button>
                )}
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  id={`step-${step.id}`}
                  className={`bg-card rounded-lg shadow-sm overflow-hidden transition-all ${
                    isActive ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="w-full p-6 flex items-start gap-4 hover:bg-background transition-colors text-left"
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="text-secondary" size={28} />
                      ) : (
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <span>{step.id}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h2 className={isActive ? "text-primary" : ""}>{step.title}</h2>
                          {step.tooltip && <TooltipWrapper content={step.tooltip} />}
                        </div>
                        <span className="text-sm text-muted-foreground">{step.duration}</span>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                      {isCompleted && (
                        <span className="inline-block mt-2 text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                          {translate(language, "guide.completedLabel")}
                        </span>
                      )}
                    </div>
                  </button>

                  {isActive && (
                    <div className="px-6 pb-6 pt-2 border-t border-border bg-background">
                      <div className="flex items-center gap-2 mb-3">
                        <Info size={18} className="text-primary" />
                        <h3>{translate(language, "guide.stepDetails")}</h3>
                      </div>
                      <ul className="space-y-2">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ArrowRight
                              className="text-primary flex-shrink-0 mt-0.5"
                              size={18}
                            />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={handlePreviousStep}
                          disabled={step.id === 1}
                          className="flex-1"
                        >
                          {translate(language, "guide.previous")}
                        </Button>
                        {step.id < steps.length ? (
                          <Button
                            variant="primary"
                            onClick={handleNextStep}
                            icon={<ArrowRight size={18} />}
                            className="flex-1"
                          >
                            {translate(language, "guide.nextStep")}
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            onClick={() => {
                              toast.success(translate(language, "guide.completedToastTitle"), {
                                description: translate(language, "guide.completedToastDescription")
                              });
                            }}
                            icon={<CheckCircle size={18} />}
                            className="flex-1"
                          >
                            {translate(language, "guide.finish")}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Timeline Summary */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl mb-4">{translate(language, "guide.timelineTitle")}</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-3xl text-primary mb-1">{translate(language, "guide.timelineTotalTime")}</div>
                <p className="text-sm text-muted-foreground">
                  {translate(language, "guide.timelineTotalDescription")}
                </p>
              </div>
              <div className="flex-1 border-l border-border pl-4">
                <div className="text-3xl text-secondary mb-1">{translate(language, "guide.timelineHours")}</div>
                <p className="text-sm text-muted-foreground">
                  {translate(language, "guide.timelineHoursDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UDLAP Process View */}
      {activeView === "udlap" && (
        <div className="space-y-6">
          {/* Banner to System */}
          <div className="bg-secondary rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-3">{translate(language, "guide.bannerTitle")}</h2>
            <p className="text-white/90 mb-4">
              {translate(language, "guide.bannerDescription")}
            </p>
            <a
              href="https://aplicaciones.udlap.mx/SistemadePracticasUDLAPEstudiantes/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {translate(language, "guide.accessSystem")}
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="grid md:grid-cols-[350px_1fr] gap-6">
            {/* Desktop Stepper */}
            <div className="hidden md:block">
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-6">
                <h3 className="font-medium mb-4">{translate(language, "guide.udlapStageTitle")}</h3>
              <div className="space-y-3">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedStage === stage.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">{stage.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-medium leading-tight ${
                            selectedStage === stage.id ? "text-primary" : ""
                          }`}>
                            {stage.title}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {stage.description}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(stage.status)}`}>
                            {getStatusLabel(stage.status)}
                          </span>
                          {stage.duration && (
                            <span className="text-xs text-muted-foreground">{stage.duration}</span>
                          )}
                        </div>
                        {stage.status === "Bloqueado" && stage.blockReason && (
                          <TooltipWrapper content={stage.blockReason}>
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <Lock size={12} />
                              <span className="truncate">{stage.blockReason}</span>
                            </div>
                          </TooltipWrapper>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className="md:hidden space-y-3">
            {stages.map((stage) => {
              const isExpanded = expandedAccordions.includes(stage.id);
              return (
                <div key={stage.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(stage.id)}
                    className="w-full p-4 flex items-start gap-3 text-left hover:bg-background"
                  >
                    <div className="text-2xl flex-shrink-0">{stage.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium">{stage.title}</h4>
                        {isExpanded ? <ChevronDown size={20} className="flex-shrink-0" /> : <ChevronRight size={20} className="flex-shrink-0" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                      <span className={`text-xs px-2 py-0.5 rounded border inline-block ${getStatusColor(stage.status)}`}>
                        {getStatusLabel(stage.status)}
                      </span>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-border">
                      <StageDetailPanel stage={stage} onJumpToQuickGuide={handleJumpToQuickGuide} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Detail Panel */}
          {currentStage && (
            <div className="hidden md:block">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <StageDetailPanel stage={currentStage} onJumpToQuickGuide={handleJumpToQuickGuide} />
              </div>
            </div>
          )}
          </div>
        </div>
      )}

      {/* Floating Support Button */}
      <button
        onClick={() => setShowSupportModal(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-40"
        aria-label={translate(language, "guide.supportModalTitle")}
      >
        <MessageCircle size={24} />
      </button>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-medium mb-4">{translate(language, "guide.supportModalTitle")}</h3>
            <textarea
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder={translate(language, "guide.supportMessagePlaceholder")}
              className="w-full border border-border rounded-lg p-3 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSupportModal(false);
                  setSupportMessage("");
                  localStorage.removeItem("guide-support-message");
                }}
                className="flex-1"
              >
                {translate(language, "common.cancel")}
              </Button>
              <Button
                variant="primary"
                onClick={handleSupportSubmit}
                className="flex-1"
                disabled={!supportMessage.trim()}
              >
                {translate(language, "common.confirm")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StageDetailPanel({ stage, onJumpToQuickGuide }: { stage: Stage; onJumpToQuickGuide: (stageId: number) => void }) {
  const { language } = useAccessibility();
  const stageHasQuickGuide = [1, 5, 6, 8, 9].includes(stage.id);
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl">{stage.icon}</div>
          <div className="flex-1">
            <h2 className="text-2xl mb-2">{stage.title}</h2>
            <p className="text-muted-foreground">{stage.summary}</p>
          </div>
        </div>
        <span className={`text-sm px-3 py-1 rounded border inline-block ${(() => {
          switch (stage.status) {
            case "Completado": return "bg-green-100 text-green-700 border-green-200";
            case "Aprobado": return "bg-green-100 text-green-700 border-green-200";
            case "Disponible": return "bg-blue-100 text-blue-700 border-blue-200";
            case "En revisión": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Con observaciones": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Bloqueado": return "bg-muted text-muted-foreground border-border";
            default: return "bg-muted text-muted-foreground border-border";
          }
        })()}`}>
          {stage.status}
        </span>
      </div>

      {stage.status === "Bloqueado" && stage.blockReason && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-start gap-2">
            <Lock className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-medium text-yellow-900 mb-1">{translate(language, "guide.stageBlocked")}</p>
              <p className="text-sm text-yellow-800">{stage.blockReason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist */}
      {stage.checklist.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">{translate(language, "guide.stageChecklistTitle")}</h3>
          <ul className="space-y-2">
            {stage.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={18} />
                <span className="text-muted-foreground text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      {stage.id === 1 && (
        <div>
          <h3 className="font-medium mb-3">{translate(language, "guide.stageActions")}</h3>
          <div className="flex flex-wrap gap-2">
            {stage.actions.primary && (
              <Button
                variant="primary"
                onClick={() => {
                  window.location.href = "https://aplicaciones.udlap.mx/SistemadePracticasUDLAPEstudiantes/";
                }}
                disabled={stage.status === "Bloqueado"}
              >
                {stage.actions.primary.label}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Additional Content */}
      {stage.additionalContent}

      {/* Jump to Quick Guide */}
      {stageHasQuickGuide && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onJumpToQuickGuide(stage.id)}
            icon={<ArrowRight size={18} />}
          >
            {translate(language, "guide.relatedQuickGuide")}
          </Button>
        </div>
      )}
    </div>
  );
}

function StageContentModule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-background rounded-lg p-4 border border-border">
      <h4 className="font-medium mb-3">{title}</h4>
      {children}
    </div>
  );
}