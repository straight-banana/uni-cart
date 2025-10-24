import { useState } from "react";
import { Plus, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/components/ProductCard";
import { ComparisonBar } from "@/components/ComparisonBar";
import { EditProductModal } from "@/components/EditProductModal";
import { ComparisonModal } from "@/components/ComparisonModal";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 89.99,
    site: "Amazon",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    quantity: 1,
    url: "https://amazon.com",
  },
  {
    id: "2",
    name: "Smart Watch Fitness Tracker",
    price: 129.99,
    site: "Daraz",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    quantity: 2,
    url: "https://daraz.com",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 45.50,
    site: "eBay",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    quantity: 1,
    url: "https://ebay.com",
  },
  {
    id: "4",
    name: "4K Action Camera Waterproof",
    price: 199.99,
    site: "Amazon",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    quantity: 1,
  },
  {
    id: "5",
    name: "Gaming Mouse RGB",
    price: 59.99,
    site: "Daraz",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    quantity: 3,
  },
  {
    id: "6",
    name: "Mechanical Keyboard RGB Backlit",
    price: 79.99,
    site: "Amazon",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    quantity: 1,
  },
];

const Index = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineIndicator, setShowOfflineIndicator] = useState(false);
  const { toast } = useToast();

  const handleToggleSelect = (id) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= 5) {
        toast({
          title: "Maximum reached",
          description: "You can compare up to 5 products at a time.",
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast({
      title: "Product updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedProducts((prev) => prev.filter((p) => p !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your dashboard.",
    });
  };

  const handleCompare = () => {
    setIsCompareModalOpen(true);
  };

  const handleClearComparison = () => {
    setSelectedProducts([]);
  };

  const selectedProductsData = products.filter((p) =>
    selectedProducts.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isOnline={isOnline} />
      
      {!isOnline && showOfflineIndicator && (
        <OfflineIndicator onDismiss={() => setShowOfflineIndicator(false)} />
      )}

      <Sidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />

      <main className="ml-64 mt-16 p-8 min-h-screen pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Products
              </h1>
              <p className="text-muted-foreground">
                Track and compare products from multiple sites
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lavender">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mb-6">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10"
            >
              Under $50
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10"
            >
              Amazon Only
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10"
            >
              On Sale
            </Button>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="mb-6 p-8 rounded-full bg-primary/10">
                <ShoppingBag className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No items yet!</h2>
              <p className="text-muted-foreground mb-6">
                Add something from your favorite sites 🛍
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProducts.includes(product.id)}
                  onToggleSelect={handleToggleSelect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Comparison Bar */}
      <ComparisonBar
        selectedProducts={selectedProductsData}
        onRemove={handleToggleSelect}
        onCompare={handleCompare}
        onClear={handleClearComparison}
      />

      {/* Modals */}
      <EditProductModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <ComparisonModal
        products={selectedProductsData}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      {/* Floating Add Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary hover:opacity-90 text-white shadow-2xl shadow-primary/50 z-30 animate-glow-pulse"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
