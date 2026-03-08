import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { fpoMembers, pooledListings } from "@/data/mockData";
import { Users, AlertTriangle, Calculator } from "lucide-react";

export default function FPODashboard() {
  const [showCalc, setShowCalc] = useState(false);
  const [totalAmount, setTotalAmount] = useState("184500");

  const perFarmer = totalAmount ? Math.round(Number(totalAmount) / fpoMembers.length) : 0;

  return (
    <DashboardLayout title="FPO Manager">
      {/* Pooled Listings */}
      <div className="rounded-xl border border-border bg-card p-5 mb-6">
        <h3 className="text-sm font-display font-semibold text-foreground mb-3">Active Pooled Listings</h3>
        <div className="space-y-3">
          {pooledListings.map((pool, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div>
                <p className="text-sm font-medium text-foreground">{pool.crop} Pool</p>
                <p className="text-xs text-muted-foreground">{pool.totalQuantity}kg from {pool.farmers} farmers</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-display font-bold text-price">₹{pool.askingPrice}/kg</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${pool.status === "Active" ? "bg-primary/10 text-primary" : "bg-trust-mid/10 text-trust-mid"}`}>
                  {pool.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 rounded-lg border border-dashed border-border py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
          + Create Pool
        </button>
      </div>

      {/* Member Roster */}
      <div className="rounded-xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-display font-semibold text-foreground">Member Roster</h3>
        </div>
        <div className="space-y-1">
          <div className="grid grid-cols-4 gap-2 text-[10px] text-muted-foreground uppercase tracking-wider px-3 py-2">
            <span>Farmer</span>
            <span>Crops</span>
            <span>Trust</span>
            <span>Risk</span>
          </div>
          {fpoMembers.map((member, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors items-center">
              <p className="text-sm text-foreground truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.crops}</p>
              <span className="text-xs font-bold text-trust-high">{member.trustScore}</span>
              <div className="flex items-center gap-1">
                {member.vulnerabilityScore > 50 && <AlertTriangle className="w-3 h-3 text-exploitation" />}
                <span className={`text-xs font-bold ${member.vulnerabilityScore > 50 ? "text-exploitation" : member.vulnerabilityScore > 30 ? "text-trust-mid" : "text-trust-high"}`}>
                  {member.vulnerabilityScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Calculator */}
      <div className="rounded-xl border border-border bg-card p-5">
        <button onClick={() => setShowCalc(!showCalc)} className="flex items-center gap-2 w-full">
          <Calculator className="w-4 h-4 text-price" />
          <h3 className="text-sm font-display font-semibold text-foreground">Revenue Split Calculator</h3>
        </button>
        {showCalc && (
          <div className="mt-4 space-y-3 animate-slide-up">
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Total sale amount (₹)"
              className="w-full rounded-lg bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
            />
            <div className="space-y-1">
              {fpoMembers.map((member, i) => (
                <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{member.name}</span>
                  <span className="text-price font-medium">₹{perFarmer.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-price">₹{Number(totalAmount || 0).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
