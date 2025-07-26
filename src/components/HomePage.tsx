import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Shield, TrendingUp, Star, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HomePageProps {
  onGetStarted: (type: 'vendor' | 'supplier') => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Revolutionizing Street Food Supply Chain
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Connect with <span className="text-primary">Trusted</span> Raw Material Suppliers
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  RawConnect bridges the gap between street food vendors and reliable suppliers. 
                  Get quality ingredients at competitive prices with verified suppliers you can trust.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  onClick={() => onGetStarted('vendor')}
                >
                  Start as Vendor
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => onGetStarted('supplier')}
                >
                  Join as Supplier
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">500+ Vendors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">Verified Suppliers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">30% Cost Savings</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl rotate-3"></div>
              <img
                src={heroImage}
                alt="Street food vendors and fresh ingredients"
                className="relative w-full h-[400px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose RawConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We solve the real problems street food vendors face every day
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-gradient-to-br from-card to-muted/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Verified Suppliers</CardTitle>
                <CardDescription>
                  All suppliers are background-checked with quality certifications and business licenses
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-card to-muted/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-xl">Best Prices</CardTitle>
                <CardDescription>
                  Compare prices across multiple suppliers and access bulk pricing benefits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-card to-muted/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Quality Assurance</CardTitle>
                <CardDescription>
                  Real vendor reviews and ratings ensure you get consistent quality every time
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to transform your sourcing experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold">Browse & Compare</h3>
              <p className="text-muted-foreground">
                Search for raw materials and compare prices from verified suppliers in your area
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-secondary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold">Order & Track</h3>
              <p className="text-muted-foreground">
                Place orders directly through the platform and track delivery in real-time
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-accent-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold">Rate & Review</h3>
              <p className="text-muted-foreground">
                Share your experience to help build a trustworthy supplier community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of vendors and suppliers who have already improved their operations with RawConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                onClick={() => onGetStarted('vendor')}
              >
                Get Started as Vendor
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => onGetStarted('supplier')}
              >
                Become a Supplier
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}