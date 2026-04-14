import { useState, useEffect } from "react";
import { Building2, MapPin, DollarSign, Clock, Users, Filter, RotateCcw, AlertCircle, Search } from "lucide-react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "./button";
import { Card } from "./card";
import { InternshipApplicationForm } from "./internship-application-form";
import { useStudentProfile } from "./student-profile-provider";
import { useDatabase } from "./database-provider";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { TOAST_MESSAGES, ACTIONS } from "../constants/design-tokens";
import { Company } from "../constants/database";

export function Companies() {
  const { profile, meetsInternshipRequirements, updateProfile } = useStudentProfile();
  const db = useDatabase();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem("companies-search") || "";
  });
  const [filterIndustry, setFilterIndustry] = useState<string>(() => {
    return localStorage.getItem("companies-filter-industry") || "all";
  });
  const [filterPaid, setFilterPaid] = useState<string>(() => {
    return localStorage.getItem("companies-filter-paid") || "all";
  });
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  // Cargar empresas desde la base de datos
  useEffect(() => {
    const loadedCompanies = db.getCompanies();
    setCompanies(loadedCompanies);
  }, [db]);

  // Guardar búsqueda y filtros en localStorage
  useEffect(() => {
    localStorage.setItem("companies-search", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("companies-filter-industry", filterIndustry);
    localStorage.setItem("companies-filter-paid", filterPaid);
  }, [filterIndustry, filterPaid]);

  const industries = Array.from(new Set(companies.map((c) => c.industry)));


  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      searchTerm === "" ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === "all" || company.industry === filterIndustry;
    const matchesPaid =
      filterPaid === "all" ||
      (filterPaid === "paid" && company.paid) ||
      (filterPaid === "unpaid" && !company.paid);
    return matchesSearch && matchesIndustry && matchesPaid;
  });

  const handleApply = (company: Company) => {
    setSelectedCompany(company);
    setIsApplicationOpen(true);
  };

  const handleApplicationSuccess = async () => {
    if (!selectedCompany) return;
    
    // Actualizar estado del estudiante
    updateProfile({
      currentInternship: {
        company: selectedCompany.name,
        status: "pending"
      }
    });
    
    setIsApplicationOpen(false);
    
    const message = TOAST_MESSAGES.success.solicitudEnviada(selectedCompany.name);
    toast.success(message.title, {
      description: message.description,
      action: {
        label: ACTIONS.deshacer,
        onClick: () => {
          updateProfile({
            currentInternship: {
              company: "",
              status: "none"
            }
          });
          toast.info("Solicitud cancelada", {
            description: "Tu solicitud ha sido cancelada exitosamente."
          });
        }
      }
    });
    
    setSelectedCompany(null);
  };

  const handleProposeExternal = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.info(TOAST_MESSAGES.info.proximamente.title, {
      description: "Contacta directamente al coordinador para proponer una empresa externa."
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterIndustry("all");
    setFilterPaid("all");
    toast.info("Filtros limpiados", {
      description: "Se han restablecido todos los filtros y la búsqueda."
    });
  };

  const requirements = meetsInternshipRequirements();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Breadcrumbs />
      
      <div>
        <h1 className="text-3xl mb-2">Empresas Disponibles</h1>
        <p className="text-muted-foreground">
          Explora las empresas afiliadas que ofrecen oportunidades de prácticas profesionales
        </p>
      </div>

      {/* Requirements Warning */}
      {!requirements.eligible && (
        <Card className="bg-amber-50 border-l-4 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-amber-900 mb-2">No cumples todos los requisitos</h3>
              <p className="text-sm text-amber-800 mb-2">
                Para solicitar una práctica profesional debes cumplir con los siguientes requisitos:
              </p>
              <ul className="text-sm text-amber-800 space-y-1">
                {requirements.reasons.map((reason, idx) => (
                  <li key={idx}>• {reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Current Application Status */}
      {profile.currentInternship.status === "pending" && (
        <Card className="bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Solicitud en Proceso</h3>
              <p className="text-sm text-blue-800">
                Tienes una solicitud pendiente de aprobación en: <strong>{profile.currentInternship.company}</strong>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Search Bar */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Search size={20} className="text-primary" />
          <h2 className="text-lg">Buscar Empresas</h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, industria, ubicación o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-primary" />
            <h2 className="text-lg">Filtros</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{filteredCompanies.length}</span> {filteredCompanies.length === 1 ? 'empresa encontrada' : 'empresas encontradas'}
            </div>
            {(searchTerm !== "" || filterIndustry !== "all" || filterPaid !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                icon={<RotateCcw size={14} />}
              >
                {ACTIONS.limpiar}
              </Button>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Industria</label>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="all">Todas las industrias</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Tipo de Práctica</label>
            <select
              value={filterPaid}
              onChange={(e) => setFilterPaid(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="all">Todas</option>
              <option value="paid">Remuneradas</option>
              <option value="unpaid">No remuneradas</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Companies Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg">{company.name}</h3>
                  <span className="text-sm text-muted-foreground">{company.industry}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    company.paid
                      ? "bg-secondary/10 text-secondary"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {company.paid ? "Remunerado" : "No remunerado"}
                </span>
                {company.positions <= 2 && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Pocos lugares
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">{company.description}</p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-muted-foreground" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-muted-foreground" />
                <span>{company.positions} posiciones</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-muted-foreground" />
                <span>{company.hours}</span>
              </div>
              {company.paid && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-secondary" />
                  <span className="text-secondary">Con beca</span>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={() => handleApply(company)}
              disabled={!requirements.eligible || profile.currentInternship.status === "pending" || profile.currentInternship.status === "active"}
            >
              {profile.currentInternship.status === "pending" 
                ? "Solicitud Pendiente" 
                : profile.currentInternship.status === "active"
                ? "Ya Tienes Práctica Activa"
                : ACTIONS.solicitar + " Práctica"}
            </Button>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-muted-foreground mb-4">No se encontraron empresas con los filtros seleccionados.</p>
          <Button variant="ghost" onClick={handleClearFilters}>
            {ACTIONS.limpiar} filtros
          </Button>
        </Card>
      )}

      {/* Application Dialog */}
      <Dialog.Root open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 animate-in fade-in zoom-in">
            <Dialog.Title className="text-2xl mb-2">
              Solicitar Práctica en {selectedCompany?.name}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-6">
              Completa el formulario para enviar tu solicitud. Todos los campos marcados con * son obligatorios.
            </Dialog.Description>
            
            {selectedCompany && (
              <InternshipApplicationForm
                companyName={selectedCompany.name}
                onSuccess={handleApplicationSuccess}
                onCancel={() => {
                  setIsApplicationOpen(false);
                  setSelectedCompany(null);
                }}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}