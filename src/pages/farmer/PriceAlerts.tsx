import { useState } from "react";
import { Bell, Plus, Trash2 } from "lucide-react";
import FarmerLayout from "@/components/FarmerLayout";
import { priceAlerts as initialAlerts, crops } from "@/data/mockData";

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showAdd, setShowAdd] = useState(false);
  const [newCrop, setNewCrop] = useState("");
  const [newThreshold, setNewThreshold] = useState("");
  const [newMethod, setNewMethod] = useState<"SMS" | "In-App">("SMS");

  const addAlert = () => {
    if (!newCrop || !newThreshold) return;
    setAlerts([...alerts, {
      id: String(Date.now()),
      crop: newCrop,
      threshold: Number(newThreshold),
      direction: "above" as const,
      method: newMethod,
      active: true,
    }]);
    setShowAdd(false);
    setNewCrop("");
    setNewThreshold("");
  };

  return (
    <FarmerLayout title="Price Alerts">
      <div className="mt-4 space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-xl border border-price/20 bg-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-price/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-price" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {alert.crop} exceeds ₹{alert.threshold}/kg
              </p>
              <p className="text-[10px] text-muted-foreground">Via {alert.method} · Active</p>
            </div>
            <button onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))} className="text-muted-foreground hover:text-exploitation">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {showAdd ? (
          <div className="rounded-xl border border-border bg-card p-4 space-y-3 animate-slide-up">
            <select value={newCrop} onChange={(e) => setNewCrop(e.target.value)} className="w-full rounded-lg bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
              <option value="">Select crop...</option>
              {crops.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" value={newThreshold} onChange={(e) => setNewThreshold(e.target.value)} placeholder="Price threshold (₹/kg)" className="w-full rounded-lg bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/50" />
            <div className="flex gap-2">
              {(["SMS", "In-App"] as const).map((m) => (
                <button key={m} onClick={() => setNewMethod(m)} className={`flex-1 rounded-lg py-2 text-sm border ${newMethod === m ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
                  {m}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-lg border border-border py-2 text-sm text-muted-foreground">Cancel</button>
              <button onClick={addAlert} className="flex-1 rounded-lg bg-primary text-primary-foreground py-2 text-sm font-medium">Add Alert</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)} className="w-full rounded-xl border border-dashed border-border p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
            <Plus className="w-4 h-4" /> Add Price Alert
          </button>
        )}
      </div>
    </FarmerLayout>
  );
}
