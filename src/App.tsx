import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import ListProduce from "./pages/farmer/ListProduce";
import MyListings from "./pages/farmer/MyListings";
import TrustScore from "./pages/farmer/TrustScore";
import PriceAlerts from "./pages/farmer/PriceAlerts";
import RegulatorDashboard from "./pages/regulator/RegulatorDashboard";
import TraderDetail from "./pages/regulator/TraderDetail";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import FPODashboard from "./pages/fpo/FPODashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/list-produce" element={<ListProduce />} />
          <Route path="/farmer/my-listings" element={<MyListings />} />
          <Route path="/farmer/trust-score" element={<TrustScore />} />
          <Route path="/farmer/price-alerts" element={<PriceAlerts />} />
          <Route path="/regulator" element={<RegulatorDashboard />} />
          <Route path="/regulator/trader/:id" element={<TraderDetail />} />
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/fpo" element={<FPODashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
