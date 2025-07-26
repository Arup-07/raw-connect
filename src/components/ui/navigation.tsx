import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: 'home' | 'vendor' | 'supplier';
  onTabChange: (tab: 'home' | 'vendor' | 'supplier') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RC</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">RawConnect</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('home')}
              className={cn(
                "transition-all duration-200",
                activeTab === 'home' && "bg-primary text-primary-foreground"
              )}
            >
              Home
            </Button>
            <Button
              variant={activeTab === 'vendor' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('vendor')}
              className={cn(
                "transition-all duration-200",
                activeTab === 'vendor' && "bg-primary text-primary-foreground"
              )}
            >
              I'm a Vendor
            </Button>
            <Button
              variant={activeTab === 'supplier' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('supplier')}
              className={cn(
                "transition-all duration-200",
                activeTab === 'supplier' && "bg-primary text-primary-foreground"
              )}
            >
              I'm a Supplier
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}