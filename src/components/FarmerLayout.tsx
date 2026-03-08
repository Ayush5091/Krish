import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, PlusCircle, List, Shield, Bell, ArrowLeft } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/farmer" },
  { icon: PlusCircle, label: "List", path: "/farmer/list-produce" },
  { icon: List, label: "Listings", path: "/farmer/my-listings" },
  { icon: Shield, label: "Trust", path: "/farmer/trust-score" },
  { icon: Bell, label: "Alerts", path: "/farmer/price-alerts" },
];

export default function FarmerLayout({ children, title }: { children: ReactNode; title?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        {title && <h2 className="text-lg font-display font-semibold text-foreground">{title}</h2>}
        <div className="ml-auto text-xs text-primary font-medium font-display">AgroLens</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pb-24">
        {children}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
