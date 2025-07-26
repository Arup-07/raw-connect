import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Package, TrendingUp, Users, Edit, Trash2, Star, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockStats = {
  totalOrders: 156,
  monthlyRevenue: 45600,
  activeProducts: 12,
  customerRating: 4.8
};

const mockProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 25,
    unit: "kg",
    stock: 150,
    orders: 45,
    status: "active"
  },
  {
    id: 2,
    name: "Red Onions",
    category: "Vegetables", 
    price: 18,
    unit: "kg",
    stock: 200,
    orders: 62,
    status: "active"
  },
  {
    id: 3,
    name: "Turmeric Powder",
    category: "Spices",
    price: 180,
    unit: "kg", 
    stock: 25,
    orders: 28,
    status: "low_stock"
  }
];

const mockOrders = [
  {
    id: "ORD001",
    vendor: "Rajesh's Chaat Corner",
    items: [
      { name: "Fresh Tomatoes", quantity: 10, price: 25 },
      { name: "Red Onions", quantity: 5, price: 18 }
    ],
    total: 340,
    status: "pending",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16"
  },
  {
    id: "ORD002", 
    vendor: "Mumbai Street Foods",
    items: [
      { name: "Turmeric Powder", quantity: 2, price: 180 }
    ],
    total: 360,
    status: "confirmed", 
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-17"
  }
];

export function SupplierDashboard() {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    unit: "kg",
    stock: "",
    description: ""
  });
  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      unit: newProduct.unit,
      stock: parseInt(newProduct.stock),
      orders: 0,
      status: "active" as const
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", category: "", price: "", unit: "kg", stock: "", description: "" });
    setIsAddingProduct(false);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to your inventory`,
    });
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'delivered': return 'bg-primary/10 text-primary border-primary/20';
      case 'low_stock': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Supplier Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹{mockStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockStats.activeProducts}</div>
              <p className="text-xs text-muted-foreground">2 need restocking</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-card to-muted/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockStats.customerRating}</div>
              <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Products Management */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Products</h2>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new product to your inventory
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="e.g. Fresh Tomatoes"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="spices">Spices</SelectItem>
                          <SelectItem value="grains">Grains & Oil</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price per unit *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="₹25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="liter">liter</SelectItem>
                            <SelectItem value="piece">piece</SelectItem>
                            <SelectItem value="packet">packet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Product description..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleAddProduct} className="flex-1">Add Product</Button>
                      <Button variant="outline" onClick={() => setIsAddingProduct(false)}>Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="border-none bg-gradient-to-br from-card to-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge variant="outline" className={getStatusColor(product.status)}>
                            {product.status === 'low_stock' ? 'Low Stock' : 'Active'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>₹{product.price}/{product.unit}</span>
                          <span>Stock: {product.stock}</span>
                          <span>{product.orders} orders</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Orders Management */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
            
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-none bg-gradient-to-br from-card to-muted/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Order {order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.vendor}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {order.deliveryDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">₹{order.total}</span>
                        {order.status === 'pending' && (
                          <Button size="sm" onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                            Confirm
                          </Button>
                        )}
                        {order.status === 'confirmed' && (
                          <Button size="sm" onClick={() => updateOrderStatus(order.id, 'delivered')}>
                            Mark Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}