import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "/": "Inicio",
  "/preguntas-frecuentes": "Preguntas Frecuentes",
  "/guia": "Guía Paso a Paso",
  "/contactos": "Contactos",
  "/empresas": "Empresas Disponibles",
  "/documentos": "Documentos",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home size={16} />
        <span>Inicio</span>
      </Link>
      
      <ChevronRight size={16} className="text-muted-foreground" />
      
      <span className="text-foreground font-medium">
        {routeNames[location.pathname] || "Página"}
      </span>
    </nav>
  );
}

