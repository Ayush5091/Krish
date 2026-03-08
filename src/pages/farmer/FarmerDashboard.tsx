import { useNavigate } from "react-router-dom";
import { TrendingUp, PlusCircle, List, Shield, Bell, MapPin } from "lucide-react";
import FarmerLayout from "@/components/FarmerLayout";
import { farmer, todayPrice, priceAlerts } from "@/data/mockData";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  return (
    <FarmerLayout>
      {/* Greeting */}
      <div className="mt-4 mb-6">
        <p className="text-sm text-muted-foreground">Good morning,</p>
        <h1 className="text-2xl font-display font-bold text-foreground">{farmer.name}</h1>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin className="w-3 h-3" />
          {farmer.region}
        </div>
      </div>

      {/* Price Card */}
      <div className="rounded-xl border border-primary/30 bg-card p-5 mb-4 glow-green">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Today's fair price</p>
        <p className="text-sm font-medium text-foreground mb-2">{todayPrice.crop}</p>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-display font-bold text-price">₹{todayPrice.price}</span>
          <span className="text-sm text-muted-foreground">/{todayPrice.unit}</span>
          <div className="ml-auto flex items-center gap-1 text-trust-high text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            {todayPrice.change} in {todayPrice.period}
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {priceAlerts.length > 0 && (
        <div className="rounded-lg bg-price/10 border border-price/20 px-4 py-3 mb-6">
          <p className="text-xs text-price font-medium">
            🔔 Alert active: Notify when {priceAlerts[0].crop} exceeds ₹{priceAlerts[0].threshold}/{todayPrice.unit}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: PlusCircle, label: "List Produce", path: "/farmer/list-produce", accent: "bg-primary" },
          { icon: List, label: "My Listings", path: "/farmer/my-listings", accent: "bg-price" },
          { icon: Shield, label: "Trust Score", path: "/farmer/trust-score", accent: "bg-trust-high" },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:scale-[1.02]"
          >
            <div className={`w-10 h-10 rounded-lg ${action.accent} flex items-center justify-center`}>
              <action.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>
    </FarmerLayout>
  );
}
