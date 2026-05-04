import { Link } from "react-router-dom";
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";
import { 
  HelpCircle, 
  Building2, 
  BookOpen, 
  Users, 
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";

export function Home() {
  const { language } = useAccessibility();

  const quickLinks = [
    {
      titleKey: "home.faq",
      descriptionKey: "home.faqDescription",
      icon: HelpCircle,
      href: "/dashboard/preguntas-frecuentes",
      color: "bg-primary"
    },
    {
      titleKey: "home.companies",
      descriptionKey: "home.companiesDescription",
      icon: Building2,
      href: "/dashboard/empresas",
      color: "bg-secondary"
    },
    {
      titleKey: "home.guide",
      descriptionKey: "home.guideDescription",
      icon: BookOpen,
      href: "/dashboard/guia",
      color: "bg-primary"
    },
    {
      titleKey: "home.contacts",
      descriptionKey: "home.contactsDescription",
      icon: Users,
      href: "/dashboard/contactos",
      color: "bg-secondary"
    },
  ];

  const announcements = [
    {
      titleKey: "home.announcementsList.springInternshipTitle",
      dateKey: "home.announcementsList.springInternshipDate",
      typeKey: "home.announcementsList.important",
      icon: AlertCircle,
      color: "text-primary"
    },
    {
      titleKey: "home.announcementsList.newCompaniesTitle",
      dateKey: "home.announcementsList.newCompaniesDate",
      typeKey: "home.announcementsList.update",
      icon: CheckCircle,
      color: "text-secondary"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-secondary/90 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <TrendingUp size={200} />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl mb-4">
            {translate(language, "home.title")}
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-3xl">
            {translate(language, "home.subtitle")}
          </p>

          <Link
            to="/dashboard/guia"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all hover:gap-3"
          >
            {translate(language, "home.startButton")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-card rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-primary" size={24} />
          <h2 className="text-xl">{translate(language, "home.announcements")}</h2>
        </div>

        <div className="space-y-3">
          {announcements.map((announcement, index) => {
            const Icon = announcement.icon;

            return (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <Icon className={announcement.color} size={20} />

                <div className="flex-1">
                  <h3>{translate(language, announcement.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {translate(language, announcement.dateKey)} • {translate(language, announcement.typeKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl mb-6">{translate(language, "home.quickLinks")}</h2>

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

                <h3 className="mb-2 group-hover:text-primary transition-colors">
                  {translate(language, link.titleKey)}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {translate(language, link.descriptionKey)}
                </p>

                <div className="flex items-center gap-1 text-primary text-sm">
                  {translate(language, "companies.view")}
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