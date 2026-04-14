import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface StudentProfile {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  major: string;
  creditsCompleted: number;
  totalCredits: number;
  gpa: number;
  currentSemester: string;
  hasActiveInsurance: boolean;
  hasCompletedRequiredCourses: boolean;
  currentInternship: {
    company: string;
    status: "none" | "pending" | "active" | "completed";
  };
}

interface StudentProfileContextType {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  meetsInternshipRequirements: () => { 
    eligible: boolean; 
    reasons: string[] 
  };
}

const StudentProfileContext = createContext<StudentProfileContextType | undefined>(undefined);

export function StudentProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    // Intentar cargar del localStorage
    const saved = localStorage.getItem("student-profile");
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Datos de ejemplo por defecto
    return {
      name: "Estudiante UDLAP",
      studentId: "12345678",
      email: "estudiante@udlap.mx",
      phone: "",
      major: "Ingeniería en Sistemas",
      creditsCompleted: 180,
      totalCredits: 240,
      gpa: 8.5,
      currentSemester: "Primavera 2026",
      hasActiveInsurance: true,
      hasCompletedRequiredCourses: true,
      currentInternship: {
        company: "",
        status: "none"
      }
    };
  });

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("student-profile", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const meetsInternshipRequirements = () => {
    const reasons: string[] = [];
    
    const creditsPercentage = (profile.creditsCompleted / profile.totalCredits) * 100;
    if (creditsPercentage < 70) {
      reasons.push(`Necesitas al menos 70% de créditos completados. Actualmente tienes ${creditsPercentage.toFixed(0)}%`);
    }
    
    if (profile.gpa < 7.0) {
      reasons.push(`El promedio mínimo requerido es 7.0. Tu promedio actual es ${profile.gpa}`);
    }
    
    if (!profile.hasActiveInsurance) {
      reasons.push("Debes tener seguro escolar activo");
    }
    
    if (!profile.hasCompletedRequiredCourses) {
      reasons.push("Debes completar todos los cursos obligatorios previos");
    }
    
    if (profile.currentInternship.status === "active") {
      reasons.push("Ya tienes una práctica profesional activa");
    }
    
    if (profile.currentInternship.status === "pending") {
      reasons.push("Tienes una solicitud de práctica pendiente de aprobación");
    }
    
    return {
      eligible: reasons.length === 0,
      reasons
    };
  };

  return (
    <StudentProfileContext.Provider value={{ profile, updateProfile, meetsInternshipRequirements }}>
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error("useStudentProfile must be used within StudentProfileProvider");
  }
  return context;
}
