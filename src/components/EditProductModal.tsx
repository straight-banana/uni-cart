import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const EditProductModal = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Edit Product Details
          </DialogTitle>
          <DialogDescription>
            Make changes to your product information here.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="focus-visible:ring-primary"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="focus-visible:ring-primary"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) })
              }
              className="focus-visible:ring-primary"
            />
          </div>

          {/* Site */}
          <div className="space-y-2">
            <Label htmlFor="site">Site</Label>
            <Input
              id="site"
              value={formData.site}
              onChange={(e) =>
                setFormData({ ...formData, site: e.target.value })
              }
              className="focus-visible:ring-primary"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">Product URL (Optional)</Label>
            <Input
              id="url"
              type="url"
              value={formData.url || ""}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="focus-visible:ring-primary"
              placeholder="https://..."
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
