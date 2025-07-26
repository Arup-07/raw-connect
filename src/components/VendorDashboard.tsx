import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, ShoppingCart, Search, Filter, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockSuppliers = [
  {
    id: 1,
    name: "Fresh Veggie Hub",
    location: "Karol Bagh, Delhi",
    rating: 4.8,
    reviews: 156,
    verified: true,
    products: [
      { name: "Fresh Tomatoes", price: 25, unit: "kg", originalPrice: 30 },
      { name: "Onions", price: 18, unit: "kg", originalPrice: 22 },
      { name: "Green Chilies", price: 40, unit: "kg", originalPrice: 45 }
    ],
    delivery: "Same day",
    minOrder: 10
  },
  {
    id: 2,
    name: "Spice Master",
    location: "Chandni Chowk, Delhi",
    rating: 4.9,
    reviews: 203,
    verified: true,
    products: [
      { name: "Turmeric Powder", price: 180, unit: "kg", originalPrice: 220 },
      { name: "Red Chili Powder", price: 200, unit: "kg", originalPrice: 240 },
      { name: "Garam Masala", price: 320, unit: "kg", originalPrice: 380 }
    ],
    delivery: "Next day",
    minOrder: 5
  },
  {
    id: 3,
    name: "Oil & Grains Co.",
    location: "Lajpat Nagar, Delhi",
    rating: 4.7,
    reviews: 89,
    verified: true,
    products: [
      { name: "Cooking Oil", price: 120, unit: "liter", originalPrice: 140 },
      { name: "Wheat Flour", price: 28, unit: "kg", originalPrice: 35 },
      { name: "Rice", price: 45, unit: "kg", originalPrice: 52 }
    ],
    delivery: "Same day",
    minOrder: 20
  }
];

export function VendorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const addToCart = (supplier: any, product: any) => {
    setCart([...cart, { supplier, product, quantity: 1 }]);
    toast({
      title: "Added to Cart",
      description: `${product.name} from ${supplier.name} added to cart`,
    });
  };

  const toggleFavorite = (supplierId: number) => {
    setFavorites(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Raw Materials</h1>
          <p className="text-muted-foreground">Connect with verified suppliers in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
                <SelectItem value="grains">Grains & Oil</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="lg" className="w-full md:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cart.length})
            </Button>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-card to-muted/10">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      {supplier.verified && (
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                        <span className="font-semibold text-sm">{supplier.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({supplier.reviews} reviews)</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(supplier.id)}
                    className="p-2"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(supplier.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {supplier.products.map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-primary">₹{product.price}/{product.unit}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                          <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(supplier, product)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Delivery: {supplier.delivery}</span>
                    <span>Min order: ₹{supplier.minOrder}kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">No suppliers found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}