import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  studentId: string;
}

interface AuthContextType {
  user: User | null;
  login: (studentId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciales de prueba mockup
const MOCK_USERS = [
  {
    studentId: "123456",
    password: "udlap123"
  },
  {
    studentId: "987654",
    password: "practicas123"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({ studentId: "123456" }); // Usuario por defecto para testing
  const [isLoading, setIsLoading] = useState(false); // No loading inicialmente

  // Cargar usuario desde localStorage al montar
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("udlap_auth_user");
  //   if (savedUser) {
  //     try {
  //       setUser(JSON.parse(savedUser));
  //     } catch (error) {
  //       console.error("Error al cargar usuario:", error);
  //       localStorage.removeItem("udlap_auth_user");
  //     }
  //   }
  //   setIsLoading(false);
  // }, []);

  const login = async (studentId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS.find(
      u => u.studentId === studentId && u.password === password
    );

    if (mockUser) {
      const userData = {
        studentId: mockUser.studentId
      };
      setUser(userData);
      localStorage.setItem("udlap_auth_user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Credenciales incorrectas" };
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
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
