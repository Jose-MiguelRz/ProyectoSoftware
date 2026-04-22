import { Moon, Sun, Globe, Type } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { Card } from "./card";
import { Button } from "./button";
import { useAccessibility } from "./accessibility-provider";
import { toast } from "sonner";
import { translate } from "../constants/translations";

export function AccessibilitySettings() {
  const { theme, setTheme, language, setLanguage, fontSize, setFontSize } = useAccessibility();

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    toast.success(translate(language, "accessibility.saved"));
  };

  const handleLanguageChange = (newLanguage: "es" | "en") => {
    setLanguage(newLanguage);
    toast.success(translate(language, "accessibility.saved"));
  };

  const handleFontSizeChange = (newFontSize: "small" | "medium" | "large") => {
    setFontSize(newFontSize);
    toast.success(translate(language, "accessibility.saved"));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Breadcrumbs />

      <div>
        <h1 className="text-3xl mb-2">{translate(language, "accessibility.title")}</h1>
        <p className="text-muted-foreground">
          {translate(language, "accessibility.preferences")}
        </p>
      </div>

      {/* Tema */}
      <Card hover={false}>
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
            {theme === "dark" ? (
              <Moon className="text-primary" size={24} />
            ) : (
              <Sun className="text-primary" size={24} />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-1">{translate(language, "accessibility.theme")}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {translate(language, "accessibility.themeDescription")}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant={theme === "light" ? "primary" : "outline"}
            onClick={() => handleThemeChange("light")}
            className="flex-1 flex items-center gap-2"
          >
            <Sun size={18} />
            {translate(language, "accessibility.lightMode")}
          </Button>
          <Button
            variant={theme === "dark" ? "primary" : "outline"}
            onClick={() => handleThemeChange("dark")}
            className="flex-1 flex items-center gap-2"
          >
            <Moon size={18} />
            {translate(language, "accessibility.darkMode")}
          </Button>
        </div>
      </Card>

      {/* Idioma */}
      <Card hover={false}>
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
            <Globe className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-1">{translate(language, "accessibility.language")}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {translate(language, "accessibility.languageDescription")}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant={language === "es" ? "primary" : "outline"}
            onClick={() => handleLanguageChange("es")}
            className="flex-1"
          >
            {translate(language, "accessibility.spanish")}
          </Button>
          <Button
            variant={language === "en" ? "primary" : "outline"}
            onClick={() => handleLanguageChange("en")}
            className="flex-1"
          >
            {translate(language, "accessibility.english")}
          </Button>
        </div>
      </Card>

      {/* Tamaño de Letra */}
      <Card hover={false}>
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
            <Type className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-1">{translate(language, "accessibility.fontSize")}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {translate(language, "accessibility.fontSizeDescription")}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Pequeño */}
          <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                 style={{ fontSize: "14px" }}>
            <input
              type="radio"
              name="fontSize"
              value="small"
              checked={fontSize === "small"}
              onChange={() => handleFontSizeChange("small")}
              className="w-4 h-4"
            />
            <span className="flex-1">{translate(language, "accessibility.small")}</span>
            <span className="text-muted-foreground text-xs">Aa</span>
          </label>

          {/* Mediano */}
          <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <input
              type="radio"
              name="fontSize"
              value="medium"
              checked={fontSize === "medium"}
              onChange={() => handleFontSizeChange("medium")}
              className="w-4 h-4"
            />
            <span className="flex-1">{translate(language, "accessibility.medium")}</span>
            <span className="text-muted-foreground">Aa</span>
          </label>

          {/* Grande */}
          <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                 style={{ fontSize: "18px" }}>
            <input
              type="radio"
              name="fontSize"
              value="large"
              checked={fontSize === "large"}
              onChange={() => handleFontSizeChange("large")}
              className="w-4 h-4"
            />
            <span className="flex-1">{translate(language, "accessibility.large")}</span>
            <span className="text-muted-foreground text-lg">Aa</span>
          </label>
        </div>
      </Card>

      {/* Info adicional */}
      <Card hover={false} className="bg-accent">
        <h3 className="font-medium mb-2">{translate(language, "common.welcome")}</h3>
        <p className="text-sm text-muted-foreground">
          {language === "es" 
            ? "Tus preferencias de accesibilidad se guardan automáticamente en tu navegador. Puedes cambiarlas en cualquier momento visitando esta página."
            : "Your accessibility preferences are automatically saved in your browser. You can change them anytime by visiting this page."
          }
        </p>
      </Card>
    </div>
  );
}

