import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, MockDatabase } from "../constants/database";

interface AuthContextType {
  user: User | null;
  login: (studentId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const db = MockDatabase.getInstance();

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const savedUser = localStorage.getItem("udlap_auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        localStorage.removeItem("udlap_auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (studentId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    // Para demo: aceptar cualquier usuario/contraseña no vacíos
    if (studentId.trim() && password.trim()) {
      const result = db.authenticate(studentId, password);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("udlap_auth_user", JSON.stringify(result.user));
        return { success: true };
      }
    }

    return { success: false, error: "Credenciales inválidas" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("udlap_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
