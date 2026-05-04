import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";

const routeNames: Record<string, string> = {
  "/dashboard": "breadcrumbs.home",
  "/dashboard/preguntas-frecuentes": "breadcrumbs.faq",
  "/dashboard/guia": "breadcrumbs.guide",
  "/dashboard/contactos": "breadcrumbs.contacts",
  "/dashboard/empresas": "breadcrumbs.companies",
};

export function Breadcrumbs() {
  const location = useLocation();
  const { language } = useAccessibility();

  // No mostrar en login
  if (location.pathname === "/") {
    return null;
  }

  const currentPathTranslationKey = routeNames[location.pathname];
  const currentPathName = currentPathTranslationKey 
    ? translate(language, currentPathTranslationKey)
    : translate(language, "breadcrumbs.page");

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home size={16} />
        <span>{translate(language, "breadcrumbs.home")}</span>
      </Link>
      
      <ChevronRight size={16} className="text-muted-foreground" />
      
      <span className="text-foreground font-medium">
        {currentPathName}
      </span>
    </nav>
  );
}