import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ComparisonBar = ({
  selectedProducts,
  onRemove,
  onCompare,
  onClear,
}) => {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-64 right-0 z-40 animate-fade-in">
      <div className="gradient-primary rounded-t-3xl shadow-2xl p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Selected Products */}
            <div className="flex items-center gap-4 flex-1">
              <h3 className="text-white font-semibold text-lg">
                Compare Products ({selectedProducts.length}/5)
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative group flex-shrink-0"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onClear}
                className="bg-white/20 border-white/50 text-white hover:bg-white/30"
              >
                Clear All
              </Button>
              <Button
                onClick={onCompare}
                disabled={selectedProducts.length < 2}
                className="bg-white text-secondary hover:bg-white/90 shadow-lg animate-glow-pulse disabled:animate-none"
              >
                Compare Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
