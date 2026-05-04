import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "./button";
import { useStudentProfile } from "./student-profile-provider";
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";
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
  const { language } = useAccessibility();
  const storageKey = `internship-form-${companyName}`;
  
  const [formData, setFormData] = useState(() => {
    // Cargar datos guardados del localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading saved form data", e);
      }
    }
    return {
      studentId: "",
      phone: profile.phone,
      motivation: "",
      availability: ""
    };
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const requirements = meetsInternshipRequirements();

  // Guardar formulario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData, storageKey]);

  // Validaciones en tiempo real
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "studentId":
        if (!value) return translate(language, "internship.validations.studentIdRequired");
        if (value.trim().length < 2) {
          return translate(language, "internship.validations.studentIdMinLength");
        }
        return "";
      
      case "phone":
        if (!value) return translate(language, "internship.validations.phoneRequired");
        const cleanPhone = value.replace(/\D/g, "");
        if (cleanPhone.length !== 10) {
          return translate(language, "internship.validations.phoneInvalid");
        }
        return "";
      
      case "motivation":
        if (!value.trim()) return translate(language, "internship.validations.motivationRequired");
        if (value.trim().length < 50) {
          return translate(language, "internship.validations.motivationMinLength") + " " + value.trim().length + ")";
        }
        if (value.trim().length > 500) {
          return translate(language, "internship.validations.motivationMaxLength") + " " + value.trim().length + ")";
        }
        return "";
      
      case "availability":
        if (!value) return translate(language, "internship.validations.availabilityRequired");
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
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
    
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
      toast.error(translate(language, "internship.incompleteForm"), {
        description: translate(language, "internship.correctErrors")
      });
      return;
    }
    
    // Generar el mensaje de correo
    const emailSubject = `Solicitud de Práctica - ${formData.studentId}`;
    const availabilityText = formData.availability === 'tiempo-completo' 
      ? translate(language, "internship.fullTime")
      : formData.availability === 'medio-tiempo' 
      ? translate(language, "internship.partTime")
      : translate(language, "internship.flexible");
    
    const emailBody = `Subject: ${translate(language, "internship.title")}

${translate(language, "internship.studentId")}: ${formData.studentId}
${translate(language, "companies.filter")}: ${companyName}
${translate(language, "internship.availability")}: ${availabilityText}

${translate(language, "internship.motivation")}:
${formData.motivation}`;
    
    // Crear el mailto link
    const mailtoLink = `mailto:practicas.profesion@udlap.mx?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir el cliente de correo
    window.location.href = mailtoLink;
    
    // Limpiar el localStorage después de enviar
    localStorage.removeItem(storageKey);
    
    // Mostrar un toast informativo
    toast.success(translate(language, "internship.sendingEmail"), {
      description: translate(language, "internship.emailDescription")
    });
    
    onSuccess();
  };

  const isFormValid = Object.values(errors).every(err => !err) && 
                      formData.studentId.trim() !== "" &&
                      formData.phone.trim() !== "" &&
                      formData.motivation.trim() !== "" &&
                      formData.availability !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Requisitos no cumplidos */}
      {!requirements.eligible && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-destructive mb-2">{translate(language, "internship.requirements.unmetRequirements")}</h4>
              <ul className="text-sm space-y-1">
                {requirements.reasons.map((reason, idx) => (
                  <li key={idx} className="text-destructive/80">• {reason}</li>
                ))}
              </ul>
              <p className="text-sm text-destructive/80 mt-2">
                {translate(language, "internship.requirements.cannotApply")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ID del Estudiante */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {translate(language, "internship.studentId")} <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={formData.studentId}
          onChange={(e) => handleChange("studentId", e.target.value)}
          onBlur={() => handleBlur("studentId")}
          disabled={!requirements.eligible}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.studentId && touched.studentId
              ? "border-destructive focus:ring-destructive/20"
              : "border-border focus:ring-primary focus:border-transparent"
          } disabled:bg-muted disabled:cursor-not-allowed`}
          placeholder={translate(language, "internship.studentId")}
          aria-invalid={!!(errors.studentId && touched.studentId)}
          aria-describedby={errors.studentId && touched.studentId ? "studentId-error" : undefined}
        />
        {touched.studentId && errors.studentId && (
          <p id="studentId-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.studentId}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {translate(language, "internship.phone")} <span className="text-destructive">*</span>
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
              : "border-border focus:ring-primary focus:border-transparent"
          } disabled:bg-muted disabled:cursor-not-allowed`}
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
            {translate(language, "internship.phone")} válido
          </p>
        )}
      </div>

      {/* Disponibilidad */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {translate(language, "internship.availability")} <span className="text-destructive">*</span>
        </label>
        <select
          value={formData.availability}
          onChange={(e) => handleChange("availability", e.target.value)}
          onBlur={() => handleBlur("availability")}
          disabled={!requirements.eligible}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.availability && touched.availability
              ? "border-destructive focus:ring-destructive/20"
              : "border-border focus:ring-primary focus:border-transparent"
          } disabled:bg-muted disabled:cursor-not-allowed`}
          aria-invalid={!!(errors.availability && touched.availability)}
        >
          <option value="">{translate(language, "common.filter")}</option>
          <option value="tiempo-completo">{translate(language, "internship.fullTime")}</option>
          <option value="medio-tiempo">{translate(language, "internship.partTime")}</option>
          <option value="flexible">{translate(language, "internship.flexible")}</option>
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
          {translate(language, "internship.motivation")} <span className="text-destructive">*</span>
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
              : "border-border focus:ring-primary focus:border-transparent"
          } disabled:bg-muted disabled:cursor-not-allowed`}
          placeholder={translate(language, "internship.motivationPlaceholder")}
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
          {translate(language, "internship.cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!requirements.eligible || !isFormValid}
          className="flex-1"
        >
          {translate(language, "internship.submit")}
        </Button>
      </div>
    </form>
  );
}

