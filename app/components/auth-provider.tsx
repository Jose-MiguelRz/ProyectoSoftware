import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, MockDatabase } from "../constants/database";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

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

  // Escuchar cambios de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Usuario autenticado en Firebase
        const appUser: User = {
          id: firebaseUser.uid,
          studentId: firebaseUser.email?.split('@')[0] || '',
          name: firebaseUser.displayName || firebaseUser.email || 'Usuario',
          email: firebaseUser.email || '',
          career: 'Carrera no especificada',
          semester: 1,
          createdAt: new Date().toISOString()
        };
        setUser(appUser);
        localStorage.setItem("udlap_auth_user", JSON.stringify(appUser));
      } else {
        // Usuario no autenticado
        setUser(null);
        localStorage.removeItem("udlap_auth_user");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (studentId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!studentId.trim() || !password.trim()) {
        return { success: false, error: "Matrícula y contraseña requeridas" };
      }

      const email = `${studentId}@udlap.mx`;

      // Intentar iniciar sesión
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const appUser: User = {
          id: result.user.uid,
          studentId,
          name: result.user.displayName || studentId,
          email: result.user.email || email,
          career: 'Carrera no especificada',
          semester: 1,
          createdAt: new Date().toISOString()
        };
        setUser(appUser);
        localStorage.setItem("udlap_auth_user", JSON.stringify(appUser));
        return { success: true };
      } catch (signInError: any) {
        // Si falla por usuario no encontrado, intentar crear cuenta
        if (signInError.code === 'auth/user-not-found') {
          try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const appUser: User = {
              id: result.user.uid,
              studentId,
              name: studentId,
              email: result.user.email || email,
              career: 'Carrera no especificada',
              semester: 1,
              createdAt: new Date().toISOString()
            };
            setUser(appUser);
            localStorage.setItem("udlap_auth_user", JSON.stringify(appUser));
            return { success: true };
          } catch (createError: any) {
            return { success: false, error: createError.message || "Error al crear cuenta" };
          }
        }
        return { success: false, error: signInError.message || "Credenciales inválidas" };
      }
    } catch (error: any) {
      return { success: false, error: error.message || "Error desconocido" };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("udlap_auth_user");
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
    }
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
