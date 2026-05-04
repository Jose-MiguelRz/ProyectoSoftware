import { Mail, Phone, MapPin, Clock, User, Building2 } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "./button";
import { Card } from "./card";
import { AppointmentCalendar } from "./appointment-calendar";
import { useState } from "react";
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";
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
  const { language } = useAccessibility();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string>("");

  const contacts: Contact[] = [
    {
      name: "Mercedes Flores Bouchan",
      role: "Coordinador",
      department: "Coordinación",
      email: "mercedes.flores@udlap.mx",
      phone: "4383",
      office: "BI 404",
      hours: "Lunes a Viernes, 9:00 AM - 5:00 PM"
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
        <h1 className="text-3xl mb-2">{translate(language, "contacts.title")}</h1>
        <p className="text-muted-foreground">
          {translate(language, "contacts.description")}
        </p>
      </div>

      {/* General Contact Card */}
      <div className="bg-primary rounded-lg p-6 sm:p-8 text-white">
        <h2 className="text-2xl mb-4">{translate(language, "contacts.generalOffice")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Mail className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">{translate(language, "contacts.generalOfficeEmail")}</p>
              <a href="mailto:practicas@udlap.mx" className="hover:underline">
                practicas@udlap.mx
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">{translate(language, "contacts.generalPhone")}</p>
              <a href="tel:+522222292000" className="hover:underline">
                +52 (222) 229-2000
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">{translate(language, "contacts.generalLocation")}</p>
              <p>Edificio de Rectoría, Piso 2</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-white/80 mb-1">{translate(language, "contacts.generalHours")}</p>
              <p>Lunes a Viernes, 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Contacts */}
      <div>
        <h2 className="text-2xl mb-4">{translate(language, "contacts.coordinationStaff")}</h2>
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

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <Mail className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">{translate(language, "contacts.cardEmail")}</p>
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
                    <p className="text-xs text-muted-foreground mb-0.5">{translate(language, "contacts.cardPhone")}</p>
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">{translate(language, "contacts.cardOffice")}</p>
                    <p className="text-sm">{contact.office}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-muted-foreground flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">{translate(language, "contacts.cardHours")}</p>
                    <p className="text-sm">{contact.hours}</p>
                  </div>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full mt-4"
                onClick={() => handleOpenCalendar(contact.name)}
              >
                {translate(language, "contacts.scheduleAppointment")}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-accent rounded-lg p-6">
        <h2 className="text-xl mb-3">{translate(language, "contacts.tipsTitle")}</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">{translate(language, "contacts.tip1")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">{translate(language, "contacts.tip2")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">{translate(language, "contacts.tip3")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">{translate(language, "contacts.tip4")}</span>
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
