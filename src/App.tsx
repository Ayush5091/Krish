import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/farmer" element={<PageTransition><FarmerDashboard /></PageTransition>} />
        <Route path="/farmer/list-produce" element={<PageTransition><ListProduce /></PageTransition>} />
        <Route path="/farmer/my-listings" element={<PageTransition><MyListings /></PageTransition>} />
        <Route path="/farmer/trust-score" element={<PageTransition><TrustScore /></PageTransition>} />
        <Route path="/farmer/price-alerts" element={<PageTransition><PriceAlerts /></PageTransition>} />
        <Route path="/regulator" element={<PageTransition><RegulatorDashboard /></PageTransition>} />
        <Route path="/regulator/trader/:id" element={<PageTransition><TraderDetail /></PageTransition>} />
        <Route path="/buyer" element={<PageTransition><BuyerDashboard /></PageTransition>} />
        <Route path="/fpo" element={<PageTransition><FPODashboard /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
