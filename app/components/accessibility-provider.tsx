import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "es" | "en";
type FontSize = "small" | "medium" | "large";

interface AccessibilityContextType {
  theme: Theme;
  language: Language;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setFontSize: (fontSize: FontSize) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("accessibility-theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("accessibility-language") as Language | null;
    return saved || "es";
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem("accessibility-fontSize") as FontSize | null;
    return saved || "medium";
  });

  // Guardar preferencias y aplicar tema
  useEffect(() => {
    localStorage.setItem("accessibility-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("accessibility-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("accessibility-fontSize", fontSize);
    const root = document.documentElement;
    
    switch (fontSize) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "medium":
        root.style.fontSize = "16px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
    }
  }, [fontSize]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setLanguage = (newLanguage: Language) => setLanguageState(newLanguage);
  const setFontSize = (newFontSize: FontSize) => setFontSizeState(newFontSize);

  return (
    <AccessibilityContext.Provider value={{ theme, language, fontSize, setTheme, setLanguage, setFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}

