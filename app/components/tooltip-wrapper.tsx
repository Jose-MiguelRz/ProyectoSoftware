import { HelpCircle } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipWrapperProps {
  content: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function TooltipWrapper({ content, children, showIcon = false }: TooltipWrapperProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children || (
            <span 
              className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-help"
              role="img"
              aria-label="Más información"
            >
              <HelpCircle size={16} />
            </span>
          )}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm max-w-xs shadow-lg z-50"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
