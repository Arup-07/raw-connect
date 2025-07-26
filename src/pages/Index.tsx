import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HomePage } from "@/components/HomePage";
import { VendorDashboard } from "@/components/VendorDashboard";
import { SupplierDashboard } from "@/components/SupplierDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'vendor' | 'supplier'>('home');

  const handleGetStarted = (type: 'vendor' | 'supplier') => {
    setActiveTab(type);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'vendor':
        return <VendorDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      default:
        return <HomePage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Index;
