import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  Building2, 
  BookOpen, 
  Users, 
  FileText,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";

export function Home() {
  const quickLinks = [
    {
      title: "Preguntas Frecuentes",
      description: "Encuentra respuestas rápidas a las dudas más comunes",
      icon: HelpCircle,
      href: "/dashboard/preguntas-frecuentes",
      color: "bg-primary"
    },
    {
      title: "Empresas Disponibles",
      description: "Explora oportunidades en empresas asociadas",
      icon: Building2,
      href: "/dashboard/empresas",
      color: "bg-secondary"
    },
    {
      title: "Guía Paso a Paso",
      description: "Sigue el proceso completo de inicio a fin",
      icon: BookOpen,
      href: "/dashboard/guia",
      color: "bg-primary"
    },
    {
      title: "Contactos",
      description: "Encuentra a las personas que pueden ayudarte",
      icon: Users,
      href: "/dashboard/contactos",
      color: "bg-secondary"
    },
    {
      title: "Documentos",
      description: "Descarga formatos y plantillas necesarias",
      icon: FileText,
      href: "/dashboard/documentos",
      color: "bg-primary"
    },
  ];

  const announcements = [
    {
      title: "Periodo de Prácticas Primavera 2026",
      date: "Febrero 19, 2026",
      type: "Importante",
      icon: AlertCircle,
      color: "text-primary"
    },
    {
      title: "Nuevas empresas agregadas",
      date: "Febrero 15, 2026",
      type: "Actualización",
      icon: CheckCircle,
      color: "text-secondary"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-secondary rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <TrendingUp size={200} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl mb-4">Bienvenido al Sistema de Prácticas Profesionales</h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-3xl">
            Toda la información que necesitas para completar tus prácticas profesionales en un solo lugar.
          </p>
          <Link
            to="/dashboard/guia"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all hover:gap-3"
          >
            Comenzar
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-card rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-primary" size={24} />
          <h2 className="text-xl">Avisos Importantes</h2>
        </div>
        <div className="space-y-3">
          {announcements.map((announcement, index) => {
            const Icon = announcement.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <Icon className={announcement.color} size={20} />
                <div className="flex-1">
                  <h3>{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground">{announcement.date} • {announcement.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="text-2xl mb-6">Accesos Rápidos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.href}
                className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
              >
                <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <div className="flex items-center gap-1 text-primary text-sm">
                  Ver más
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>


    </div>
  );
}
