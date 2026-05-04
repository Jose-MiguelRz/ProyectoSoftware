import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { MockDatabase, mockCompanies, mockGuides, mockAppointments, mockUsers } from "../constants/database";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const DatabaseContext = createContext<MockDatabase | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const dbInstance = MockDatabase.getInstance();

  // Inicializar datos en Firestore (opcional)
  useEffect(() => {
    const initializeFirestore = async () => {
      try {
        // Verificar si ya hay datos
        const companiesSnapshot = await getDocs(collection(db, "companies"));
        
        if (companiesSnapshot.empty) {
          // Agregar datos mockup a Firestore
          console.log("Cargando datos iniciales en Firestore...");
          
          // Agregar empresas
          for (const company of mockCompanies) {
            await addDoc(collection(db, "companies"), company);
          }
          
          // Agregar guías
          for (const guide of mockGuides) {
            await addDoc(collection(db, "guides"), guide);
          }
          
          console.log("✅ Datos cargados en Firestore");
        } else {
          console.log("✅ Datos de Firestore encontrados");
        }
      } catch (error) {
        console.error("Error al inicializar Firestore:", error);
        console.log("⚠️ Usando datos locales (MockDatabase)");
      }
      setIsInitialized(true);
    };

    initializeFirestore();
  }, []);

  if (!isInitialized) {
    return <div>Inicializando base de datos...</div>;
  }

  return (
    <DatabaseContext.Provider value={dbInstance}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
}

// Hook adicional para acceder a Firestore directamente
export function useFirestore() {
  return db;
}
