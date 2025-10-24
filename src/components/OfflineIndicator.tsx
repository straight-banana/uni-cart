import { X, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfflineIndicatorProps {
  onDismiss: () => void;
}

export const OfflineIndicator = ({ onDismiss }: OfflineIndicatorProps) => {
  return (
    <div className="fixed top-16 left-64 right-0 z-40 animate-fade-in">
      <div className="bg-warning border-b border-warning-foreground/20 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5 text-warning-foreground" />
            <p className="text-sm font-medium text-warning-foreground">
              You're offline — changes will sync once you reconnect.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="h-8 w-8 hover:bg-warning-foreground/10"
          >
            <X className="h-4 w-4 text-warning-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};
