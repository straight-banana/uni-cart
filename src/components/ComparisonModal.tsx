import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export const ComparisonModal = ({
  products,
  isOpen,
  onClose,
}) => {
  const findBestValue = () => {
    if (products.length === 0) return null;
    return products.reduce((best, current) =>
      current.price < best.price ? current : best
    );
  };

  const bestValue = findBestValue();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-between">
            Product Comparison
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="p-4 text-left font-semibold text-muted-foreground">
                  Attribute
                </th>
                {products.map((product) => (
                  <th key={product.id} className="p-4 text-center">
                    <div className="space-y-2">
                      <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-primary/20">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {product.id === bestValue?.id && (
                        <Badge className="bg-success text-success-foreground">
                          Best Value
                        </Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Product Name */}
              <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">Product Name</td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="p-4 text-center text-sm font-medium"
                  >
                    {product.name}
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">Price</td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className={`p-4 text-center text-lg font-bold ${
                      product.id === bestValue?.id
                        ? "text-success bg-success/10"
                        : "text-secondary"
                    }`}
                  >
                    ${product.price}
                  </td>
                ))}
              </tr>

              {/* Site */}
              <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">Site</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                      {product.site}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Quantity */}
              <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">Quantity</td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="p-4 text-center text-sm font-medium"
                  >
                    {product.quantity}
                  </td>
                ))}
              </tr>

              {/* Total Cost */}
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">Total Cost</td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="p-4 text-center text-lg font-bold text-secondary"
                  >
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
          >
            Close Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
