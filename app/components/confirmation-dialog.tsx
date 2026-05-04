import { useState } from "react";
import * as Dialog from "@radix-ui/react-alert-dialog";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  trigger: React.ReactNode;
  variant?: "warning" | "danger" | "info";
}

export function ConfirmationDialog({
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  trigger,
  variant = "info",
}: ConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    warning: "text-primary",
    danger: "text-destructive",
    info: "text-secondary",
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-lg shadow-xl p-6 w-full max-w-md z-50 animate-in fade-in zoom-in">
          <div className="flex items-start gap-4 mb-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              variant === "danger" ? "bg-destructive/10" : 
              variant === "warning" ? "bg-primary/10" : 
              "bg-secondary/10"
            }`}>
              <AlertTriangle className={variants[variant]} size={20} />
            </div>
            <div className="flex-1">
              <Dialog.Title className="text-lg mb-2">{title}</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Cancel asChild>
              <button className="text-muted-foreground hover:text-foreground" aria-label="Cerrar">
                <X size={20} />
              </button>
            </Dialog.Cancel>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Dialog.Cancel asChild>
              <button
                className="px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
                disabled={isLoading}
              >
                {cancelText}
              </button>
            </Dialog.Cancel>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg transition-colors text-white ${
                variant === "danger"
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-primary hover:bg-primary/90"
              } disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Procesando..." : confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

