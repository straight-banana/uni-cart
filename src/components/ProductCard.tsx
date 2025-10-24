import { Edit2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Product {
  id: string;
  name: string;
  price: number;
  site: string;
  image: string;
  quantity: number;
  url?: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({
  product,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow hover:scale-[1.02] overflow-hidden animate-fade-in">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions - Appears on Hover */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {product.url && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-foreground"
              asChild
            >
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Site Badge */}
        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
          {product.site}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-secondary">
            ${product.price}
          </span>
          <span className="text-sm text-muted-foreground">
            Qty: {product.quantity}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {/* Compare Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id={`compare-${product.id}`}
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(product.id)}
              className="border-primary data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <label
              htmlFor={`compare-${product.id}`}
              className="text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            >
              Compare
            </label>
          </div>

          {/* Edit & Delete */}
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit(product)}
                    className="h-8 w-8 hover:bg-primary/10 hover:text-secondary"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Product</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(product.id)}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Product</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
