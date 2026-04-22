// Design System Constants
export const SPACING = {
  xs: "gap-1",
  sm: "gap-2", 
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
  xxl: "gap-8"
} as const;

export const CARD_STYLES = {
  base: "bg-card rounded-lg shadow-sm",
  hover: "hover:shadow-md transition-shadow",
  padding: {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  }
} as const;

export const BUTTON_STYLES = {
  base: "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all",
  variants: {
    primary: "bg-primary hover:bg-primary/90 text-white disabled:bg-muted disabled:cursor-not-allowed",
    secondary: "bg-secondary hover:bg-secondary/90 text-white disabled:bg-muted disabled:cursor-not-allowed",
    outline: "border border-border hover:bg-muted disabled:bg-muted disabled:cursor-not-allowed",
    ghost: "text-primary hover:underline"
  },
  sizes: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }
} as const;

export const TOAST_MESSAGES = {
  success: {
    solicitudEnviada: (entityName: string) => ({
      title: "Solicitud enviada correctamente",
      description: `Tu solicitud a ${entityName} ha sido enviada. Recibirás confirmación por correo en las próximas 48 horas.`
    }),
    citaAgendada: (contactName: string) => ({
      title: "Solicitud de cita enviada",
      description: `${contactName} te contactará por correo para confirmar la fecha y hora.`
    }),
    descargaCompletada: (fileName: string) => ({
      title: "Descarga completada",
      description: `${fileName} se ha descargado correctamente.`
    })
  },
  error: {
    generic: {
      title: "Error al procesar",
      description: "Ha ocurrido un error. Por favor, intenta de nuevo."
    }
  },
  info: {
    proximamente: {
      title: "Próximamente",
      description: "Esta funcionalidad estará disponible pronto."
    }
  }
} as const;

export const ACTIONS = {
  solicitar: "Solicitar",
  agendar: "Agendar",
  descargar: "Descargar",
  enviar: "Enviar",
  cancelar: "Cancelar",
  confirmar: "Confirmar",
  deshacer: "Deshacer",
  limpiar: "Limpiar",
  reiniciar: "Reiniciar"
} as const;
