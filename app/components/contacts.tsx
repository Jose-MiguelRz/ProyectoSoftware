import { Mail, Phone, MapPin, Clock, User, Building2 } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "./button";
import { Card } from "./card";
import { AppointmentCalendar } from "./appointment-calendar";
import { useState } from "react";
import { ACTIONS } from "../constants/design-tokens";

interface Contact {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  hours: string;
  photo?: string;
}

export function Contacts() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string>("");

  const contacts: Contact[] = [
    {
      name: "Dra. María Elena Rodríguez",
      role: "Coordinadora General de Prácticas Profesionales",
      department: "Dirección Académica",
      email: "maria.rodriguez@udlap.mx",
      phone: "+52 (222) 229-2000 Ext. 2345",
      office: "Edificio de Rectoría, Piso 2, Oficina 201",
      hours: "Lunes a Viernes, 9:00 AM - 5:00 PM"
    },
    {
      name: "Mtro. Carlos Hernández",
      role: "Coordinador de Vinculación Empresarial",
      department: "Relaciones con Empresas",
      email: "carlos.hernandez@udlap.mx",
      phone: "+52 (222) 229-2000 Ext. 2346",
      office: "Edificio de Rectoría, Piso 2, Oficina 203",
      hours: "Lunes a Viernes, 9:00 AM - 6:00 PM"
    },
    {
      name: "Lic. Ana Patricia Sánchez",
      role: "Responsable de Documentación",
      department: "Administración de Prácticas",
      email: "ana.sanchez@udlap.mx",
      phone: "+52 (222) 229-2000 Ext. 2347",
      office: "Edificio de Rectoría, Piso 2, Oficina 205",
      hours: "Lunes a Viernes, 9:00 AM - 4:00 PM"
    },
    {
      name: "Mtro. Roberto García",
      role: "Coordinador de Seguimiento Académico",
      department: "Evaluación y Seguimiento",
      email: "roberto.garcia@udlap.mx",
      phone: "+52 (222) 229-2000 Ext. 2348",
      office: "Edificio de Rectoría, Piso 2, Oficina 207",
      hours: "Lunes a Viernes, 10:00 AM - 6:00 PM"
    },
    {
      name: "Lic. Laura Martínez",
      role: "Asistente de Coordinación",
      department: "Atención a Estudiantes",
      email: "laura.martinez@udlap.mx",
      phone: "+52 (222) 229-2000 Ext. 2349",
      office: "Edificio de Rectoría, Piso 2, Oficina 202",
      hours: "Lunes a Viernes, 8:00 AM - 5:00 PM"
    }
  ];

  const handleOpenCalendar = (contactName: string) => {
    setSelectedContact(contactName);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
    setSelectedContact("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Breadcrumbs />
      
      <div>
        <h1 className="text-3xl mb-2">Contactos</h1>
        <p className="text-muted-foreground">
          Encuentra a las personas que pueden ayudarte durante tu proceso de prácticas profesionales
        </p>
      </div>

      {/* General Contact Card */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-lg p-6 sm:p-8 text-white">
        <h2 className="text-2xl mb-4">Oficina de Prácticas Profesionales</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Mail className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">Email General</p>
              <a href="mailto:practicas@udlap.mx" className="hover:underline">
                practicas@udlap.mx
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">Teléfono</p>
              <a href="tel:+522222292000" className="hover:underline">
                +52 (222) 229-2000
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">Ubicación</p>
              <p>Edificio de Rectoría, Piso 2</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">Horario</p>
              <p>Lunes a Viernes, 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Contacts */}
      <div>
        <h2 className="text-2xl mb-4">Personal de Coordinación</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <Card key={index} hover>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-secondary" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">{contact.name}</h3>
                  <p className="text-primary text-sm mb-1">{contact.role}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 size={14} />
                    <span>{contact.department}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Mail className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Teléfono</p>
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Oficina</p>
                    <p className="text-sm">{contact.office}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Horario de Atención</p>
                    <p className="text-sm">{contact.hours}</p>
                  </div>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full mt-4"
                onClick={() => handleOpenCalendar(contact.name)}
              >
                {ACTIONS.agendar} Cita
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-accent rounded-lg p-6">
        <h2 className="text-xl mb-3">Consejos para Contactar</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">
              Para consultas generales, escribe al email general de la oficina
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">
              Agenda citas con anticipación, especialmente en periodos de alta demanda
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">
              Incluye tu nombre completo, matrícula y carrera en tus comunicaciones
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">
              Revisa tu correo institucional regularmente para actualizaciones
            </span>
          </li>
        </ul>
      </div>

      {/* Appointment Calendar Modal */}
      <AppointmentCalendar
        isOpen={isCalendarOpen}
        onClose={handleCloseCalendar}
        contactName={selectedContact}
      />
    </div>
  );
}