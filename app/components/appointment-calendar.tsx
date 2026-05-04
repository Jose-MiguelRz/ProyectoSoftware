import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";

interface AppointmentCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
}

const AVAILABLE_HOURS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function AppointmentCalendar({ isOpen, onClose, contactName }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [studentId, setStudentId] = useState("");
  const [studentIdError, setStudentIdError] = useState("");

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate calendar days
  const calendarDays: (number | null)[] = [];
  
  // Add empty slots for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow selecting past dates or weekends
    if (date < today || date.getDay() === 0 || date.getDay() === 6) {
      return;
    }

    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleConfirm = async () => {
    if (!studentId.trim()) {
      setStudentIdError("El ID del estudiante es obligatorio");
      return;
    }
    
    if (!selectedDate || !selectedTime) return;

    setStudentIdError("");

    const formattedDate = selectedDate.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generar el mensaje de correo
    const emailSubject = `Solicitud de Cita - Dudas de Prácticas - ${studentId}`;
    const emailBody = `Hola,

Me interesa agendar una cita para dudas de prácticas.

Datos de la Cita:
- ID del Estudiante: ${studentId}
- Fecha Propuesta: ${formattedDate}
- Hora Propuesta: ${selectedTime}

Quedo atenta a su disponibilidad.

Saludos,
Estudiante UDLAP`;

    // Crear el mailto link
    const mailtoLink = `mailto:${contactName}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir el cliente de correo
    window.location.href = mailtoLink;
    
    // Mostrar un toast informativo
    toast.success("Abriendo cliente de correo", {
      description: `Se abrirá tu cliente de correo con la solicitud de cita para ${formattedDate} a las ${selectedTime}`
    });

    onClose();
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === month &&
           selectedDate.getFullYear() === year;
  };

  const isDateAvailable = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Available if: not in past, not weekend
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6;
  };

  const today = new Date();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 rounded-t-lg">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <CalendarIcon size={24} />
              <h2 className="text-2xl">Agendar Cita</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-card/20 rounded-full p-1 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-white/90">{contactName}</p>
        </div>

        <div className="p-6">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Mes anterior"
            >
              <ChevronLeft size={20} />
            </button>
            
            <h3 className="text-lg">
              {MONTHS[month]} {year}
            </h3>
            
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Mes siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-sm text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} />;
                }

                const isAvailable = isDateAvailable(day);
                const isSelected = isDateSelected(day);
                const isToday = isCurrentMonth && day === today.getDate();

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    disabled={!isAvailable}
                    className={`
                      aspect-square rounded-lg text-sm transition-all
                      ${isSelected 
                        ? 'bg-primary text-white font-medium shadow-md' 
                        : isAvailable 
                          ? 'bg-background hover:bg-primary/10 hover:border-primary border border-transparent' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }
                      ${isToday && !isSelected ? 'ring-2 ring-primary/30' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-primary" />
                <h4 className="text-lg">Selecciona una hora</h4>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {AVAILABLE_HOURS.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 px-4 rounded-lg text-sm transition-all border
                      ${selectedTime === time
                        ? 'bg-secondary text-white border-secondary shadow-md'
                        : 'bg-background hover:bg-secondary/10 hover:border-secondary border-transparent'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Student ID Input */}
              <div className="mt-6 pt-6 border-t">
                <label className="block text-sm font-medium mb-2">
                  ID del Estudiante <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    setStudentIdError("");
                  }}
                  placeholder="Ingresa tu ID de estudiante"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    studentIdError
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:ring-primary focus:border-transparent"
                  }`}
                />
                {studentIdError && (
                  <p className="text-sm text-destructive mt-1">{studentIdError}</p>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className="flex-1"
            >
              Confirmar Cita
            </Button>
          </div>

          {/* Legend */}
          <div className="mt-4 p-4 bg-accent rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <strong className="text-foreground">Nota:</strong> Solo puedes agendar citas en días laborales (Lunes a Viernes).
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary"></div>
                <span>Fecha seleccionada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-background border border-border"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted"></div>
                <span>No disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

