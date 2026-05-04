import { useState } from "react";
import { ChevronDown, Filter as FilterIcon } from "lucide-react";
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Breadcrumbs } from "./breadcrumbs";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQ() {
  const { language } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = language === "en" ? [
    {
      category: "requisitos",
      question: "What are the requirements for professional internships?",
      answer: "You must have completed at least 70% of your degree credits, be enrolled in the current semester, and have a minimum GPA of 7.0. You must also have completed all required prerequisite courses."
    },
    {
      category: "requisitos",
      question: "How many hours do I need to complete?",
      answer: "A total of 480 professional internship hours are required, which is about 12 weeks at 40 hours per week. You can distribute these hours flexibly as agreed with the company."
    },
    {
      category: "proceso",
      question: "How do I choose a company?",
      answer: "You can choose from the affiliated companies listed in the 'Available Companies' section, or propose an external company. If you propose an external company, you need to submit a cover letter and wait for coordinator approval."
    },
    {
      category: "proceso",
      question: "What documents do I need to submit?",
      answer: "You must submit: signed cover letter, internship registration form, company acceptance letter, work plan approved by your supervisor, and civil liability insurance (provided by the university)."
    },
    {
      category: "evaluacion",
      question: "How will I be evaluated?",
      answer: "Your evaluation includes three components: 40% company supervisor evaluation, 40% reports and deliveries to your academic advisor, and 20% final results presentation. You must score at least 70/100 to pass."
    },
    {
      category: "evaluacion",
      question: "When should I submit my reports?",
      answer: "You must submit monthly reports to your academic advisor. The first report is due after 4 weeks, the second after 8 weeks, and the final report along with the presentation after completing 480 hours."
    },
    {
      category: "fechas",
      question: "When can I start my internship?",
      answer: "You can start your internship any time of year once you have official approval. However, registration deadlines are January 15 for the Spring semester and August 15 for the Fall semester."
    },
    {
      category: "fechas",
      question: "What happens if I cannot complete the hours in one semester?",
      answer: "You can spread your internship over more than one semester if needed. Just notify your coordinator and keep your reports up to date. There is no penalty for extending the period."
    },
    {
      category: "general",
      question: "Can I do an internship outside of Puebla?",
      answer: "Yes, you can do your internship in any city in Mexico or abroad. Meetings with your advisor may be virtual, but the company and work plan must be approved in advance."
    },
    {
      category: "general",
      question: "Are internships paid?",
      answer: "This depends on the company. Some companies offer a stipend or salary, while others offer unpaid internships. This information is specified in each company listing."
    },
  ] : [
    {
      category: "requisitos",
      question: "¿Cuáles son los requisitos para realizar prácticas profesionales?",
      answer: "Debes tener al menos el 70% de los créditos de tu carrera completados, estar inscrito en el semestre actual, y tener un promedio mínimo de 7.0. Además, debes haber completado todos los cursos obligatorios previos según tu plan de estudios."
    },
    {
      category: "requisitos",
      question: "¿Cuántas horas debo completar?",
      answer: "Se requieren 480 horas totales de práctica profesional, que equivalen a aproximadamente 12 semanas trabajando 40 horas por semana. Puedes distribuir estas horas de manera flexible según acuerdes con la empresa."
    },
    {
      category: "proceso",
      question: "¿Cómo selecciono una empresa?",
      answer: "Puedes elegir entre las empresas afiliadas listadas en la sección 'Empresas Disponibles', o proponer una empresa externa. Si propones una empresa externa, debes enviar una carta de presentación y esperar la aprobación de la coordinación."
    },
    {
      category: "proceso",
      question: "¿Qué documentos necesito entregar?",
      answer: "Debes entregar: Carta de presentación firmada, Formato de registro de prácticas, Carta de aceptación de la empresa, Plan de trabajo aprobado por tu supervisor, y Seguro de responsabilidad civil (proporcionado por la universidad)."
    },
    {
      category: "evaluacion",
      question: "¿Cómo seré evaluado?",
      answer: "Tu evaluación constará de tres componentes: 40% evaluación del supervisor en la empresa, 40% reportes y entregas a tu asesor académico, y 20% presentación final de resultados. Debes obtener al menos 70/100 para aprobar."
    },
    {
      category: "evaluacion",
      question: "¿Cuándo debo entregar mis reportes?",
      answer: "Debes entregar reportes mensuales a tu asesor académico. El primer reporte se entrega al cumplir 4 semanas, el segundo a las 8 semanas, y el reporte final junto con la presentación al completar las 480 horas."
    },
    {
      category: "fechas",
      question: "¿Cuándo puedo comenzar mis prácticas?",
      answer: "Puedes comenzar tus prácticas en cualquier momento del año una vez que tengas la aprobación oficial. Sin embargo, las fechas límite de registro son: 15 de enero para semestre Primavera, y 15 de agosto para semestre Otoño."
    },
    {
      category: "fechas",
      question: "¿Qué pasa si no puedo completar las horas en un semestre?",
      answer: "Puedes distribuir tus prácticas en más de un semestre si es necesario. Solo debes informar a tu coordinador y mantener tus reportes actualizados. No hay penalización por extender el periodo."
    },
    {
      category: "general",
      question: "¿Puedo hacer prácticas en una empresa fuera de Puebla?",
      answer: "Sí, puedes realizar tus prácticas en cualquier ciudad de México o en el extranjero. Debes considerar que las reuniones con tu asesor pueden ser virtuales, pero necesitas aprobar previamente la empresa y el plan de trabajo."
    },
    {
      category: "general",
      question: "¿Las prácticas son remuneradas?",
      answer: "Esto depende de la empresa. Algunas empresas ofrecen una beca o salario, mientras que otras ofrecen prácticas no remuneradas. Esta información está especificada en cada oferta de empresa disponible."
    },
  ];

  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter((faq) => faq.category === selectedCategory);

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Breadcrumbs />
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl">{translate(language, "faq.title")}</h1>
          <TooltipWrapper content={translate(language, "faq.description")} />
        </div>
        <p className="text-muted-foreground">
          {translate(language, "faq.description")}
        </p>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FilterIcon size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{translate(language, "faq.filterByCategory")}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-white"
                : "bg-muted text-foreground hover:bg-muted"
            }`}
            aria-pressed={selectedCategory === "all"}
          >
            {translate(language, "faq.all")} ({faqs.length})
          </button>
          {categories.map((category) => {
            const count = faqs.filter(f => f.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted"
                }`}
                aria-pressed={selectedCategory === category}
              >
                {translate(language, `faq.categories.${category}`)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFAQs.map((faq, index) => (
          <div key={index} className="bg-card rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-background transition-colors text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    {translate(language, `faq.categories.${faq.category}`)}
                  </span>
                </div>
                <h3 className="text-lg">{faq.question}</h3>
              </div>
              <ChevronDown
                className={`text-muted-foreground transition-transform flex-shrink-0 ml-4 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg">
          <p className="text-muted-foreground mb-4">{translate(language, "faq.noQuestions")}</p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-primary hover:underline"
          >
            {translate(language, "faq.showAll")}
          </button>
        </div>
      )}
    </div>
  );
}
