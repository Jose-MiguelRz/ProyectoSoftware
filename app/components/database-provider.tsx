import { createContext, useContext, ReactNode } from "react";
import { MockDatabase } from "../constants/database";

const DatabaseContext = createContext<MockDatabase | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const db = MockDatabase.getInstance();

  return (
    <DatabaseContext.Provider value={db}>
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