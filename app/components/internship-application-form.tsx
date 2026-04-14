import { useState } from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "./button";
import { useStudentProfile } from "./student-profile-provider";
import { toast } from "sonner";

interface InternshipApplicationFormProps {
  companyName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function InternshipApplicationForm({
  companyName,
  onSuccess,
  onCancel
}: InternshipApplicationFormProps) {
  const { profile, meetsInternshipRequirements } = useStudentProfile();
  const [formData, setFormData] = useState({
    email: profile.email,
    phone: profile.phone,
    startDate: "",
    motivation: "",
    availability: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const requirements = meetsInternshipRequirements();

  // Validaciones en tiempo real
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "El correo electrónico es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Ingresa un correo electrónico válido";
        }
        if (!value.endsWith("@udlap.mx")) {
          return "Debes usar tu correo institucional (@udlap.mx)";
        }
        return "";
      
      case "phone":
        if (!value) return "El teléfono es obligatorio";
        const cleanPhone = value.replace(/\D/g, "");
        if (cleanPhone.length !== 10) {
          return "El teléfono debe tener 10 dígitos";
        }
        return "";
      
      case "startDate":
        if (!value) return "La fecha de inicio es obligatoria";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 7); // Mínimo 7 días de anticipación
        
        if (selectedDate < minDate) {
          return "La fecha debe ser al menos 7 días a partir de hoy";
        }
        
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 6); // Máximo 6 meses adelante
        
        if (selectedDate > maxDate) {
          return "La fecha no puede ser mayor a 6 meses";
        }
        return "";
      
      case "motivation":
        if (!value.trim()) return "La motivación es obligatoria";
        if (value.trim().length < 50) {
          return "Escribe al menos 50 caracteres (actualmente: " + value.trim().length + ")";
        }
        if (value.trim().length > 500) {
          return "Máximo 500 caracteres (actualmente: " + value.trim().length + ")";
        }
        return "";
      
      case "availability":
        if (!value) return "Selecciona tu disponibilidad";
        return "";
      
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.substring(0, 10);
    
    if (limited.length >= 6) {
      return `${limited.substring(0, 3)} ${limited.substring(3, 6)} ${limited.substring(6)}`;
    } else if (limited.length >= 3) {
      return `${limited.substring(0, 3)} ${limited.substring(3)}`;
    }
    return limited;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange("phone", formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);
    
    // Validar todos los campos
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(err => err)) {
      toast.error("Formulario incompleto", {
        description: "Por favor corrige los errores antes de continuar."
      });
      return;
    }
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSuccess();
  };

  const isFormValid = Object.values(errors).every(err => !err) && 
                      Object.values(formData).every(val => val.trim() !== "");

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 7);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Requisitos no cumplidos */}
      {!requirements.eligible && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-destructive mb-2">Requisitos no cumplidos</h4>
              <ul className="text-sm space-y-1">
                {requirements.reasons.map((reason, idx) => (
                  <li key={idx} className="text-destructive/80">• {reason}</li>
                ))}
              </ul>
              <p className="text-sm text-destructive/80 mt-2">
                No puedes solicitar una práctica hasta cumplir todos los requisitos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Correo Electrónico Institucional <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          disabled={!requirements.eligible}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.email && touched.email
              ? "border-destructive focus:ring-destructive/20"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="tu.nombre@udlap.mx"
          aria-invalid={!!(errors.email && touched.email)}
          aria-describedby={errors.email && touched.email ? "email-error" : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.email}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Teléfono Celular <span className="text-destructive">*</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => handleBlur("phone")}
          disabled={!requirements.eligible}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.phone && touched.phone
              ? "border-destructive focus:ring-destructive/20"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="222 123 4567"
          maxLength={12}
          aria-invalid={!!(errors.phone && touched.phone)}
          aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
        />
        {touched.phone && errors.phone && (
          <p id="phone-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.phone}
          </p>
        )}
        {!errors.phone && touched.phone && formData.phone && (
          <p className="text-sm text-secondary mt-1 flex items-center gap-1">
            <CheckCircle size={14} />
            Teléfono válido
          </p>
        )}
      </div>

      {/* Fecha de inicio */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Fecha de Inicio Propuesta <span className="text-destructive">*</span>
        </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          onBlur={() => handleBlur("startDate")}
          disabled={!requirements.eligible}
          min={minDate.toISOString().split("T")[0]}
          max={maxDate.toISOString().split("T")[0]}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.startDate && touched.startDate
              ? "border-destructive focus:ring-destructive/20"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          aria-invalid={!!(errors.startDate && touched.startDate)}
          aria-describedby={errors.startDate && touched.startDate ? "startDate-error" : "startDate-help"}
        />
        {touched.startDate && errors.startDate ? (
          <p id="startDate-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.startDate}
          </p>
        ) : (
          <p id="startDate-help" className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <Info size={14} />
            La fecha debe ser entre 7 días y 6 meses a partir de hoy
          </p>
        )}
      </div>

      {/* Disponibilidad */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Disponibilidad Horaria <span className="text-destructive">*</span>
        </label>
        <select
          value={formData.availability}
          onChange={(e) => handleChange("availability", e.target.value)}
          onBlur={() => handleBlur("availability")}
          disabled={!requirements.eligible}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.availability && touched.availability
              ? "border-destructive focus:ring-destructive/20"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          aria-invalid={!!(errors.availability && touched.availability)}
        >
          <option value="">Selecciona tu disponibilidad</option>
          <option value="tiempo-completo">Tiempo Completo (40 hrs/semana)</option>
          <option value="medio-tiempo">Medio Tiempo (20 hrs/semana)</option>
          <option value="flexible">Horario Flexible (30 hrs/semana)</option>
        </select>
        {touched.availability && errors.availability && (
          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.availability}
          </p>
        )}
      </div>

      {/* Motivación */}
      <div>
        <label className="block text-sm font-medium mb-2">
          ¿Por qué quieres realizar tu práctica en {companyName}? <span className="text-destructive">*</span>
        </label>
        <textarea
          value={formData.motivation}
          onChange={(e) => handleChange("motivation", e.target.value)}
          onBlur={() => handleBlur("motivation")}
          disabled={!requirements.eligible}
          rows={4}
          maxLength={500}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
            errors.motivation && touched.motivation
              ? "border-destructive focus:ring-destructive/20"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="Describe tus motivaciones, intereses y qué esperas aprender..."
          aria-invalid={!!(errors.motivation && touched.motivation)}
          aria-describedby={errors.motivation && touched.motivation ? "motivation-error" : "motivation-help"}
        />
        <div className="flex items-center justify-between mt-1">
          <div>
            {touched.motivation && errors.motivation ? (
              <p id="motivation-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.motivation}
              </p>
            ) : (
              <p id="motivation-help" className="text-sm text-muted-foreground">
                Mínimo 50 caracteres, máximo 500
              </p>
            )}
          </div>
          <span className={`text-sm ${
            formData.motivation.length > 500 ? "text-destructive" :
            formData.motivation.length >= 50 ? "text-secondary" : "text-muted-foreground"
          }`}>
            {formData.motivation.length}/500
          </span>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!requirements.eligible || !isFormValid}
          className="flex-1"
        >
          Enviar Solicitud
        </Button>
      </div>
    </form>
  );
}
