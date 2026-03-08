import FarmerLayout from "@/components/FarmerLayout";
import { farmer, transactionHistory, recommendedBuyers } from "@/data/mockData";
import { Shield, Star } from "lucide-react";

export default function TrustScore() {
  return (
    <FarmerLayout title="Trust Score">
      <div className="mt-4 space-y-4">
        {/* Score Card */}
        <div className="rounded-xl border border-primary/30 bg-card p-6 text-center glow-green">
          <div className="w-20 h-20 rounded-full border-4 border-primary mx-auto flex items-center justify-center mb-3">
            <span className="text-3xl font-display font-bold text-primary">{farmer.trustScore}</span>
          </div>
          <p className="text-sm text-foreground font-medium">Your Trust Score</p>
          <p className="text-xs text-muted-foreground mt-1">Based on transaction history & supply chain analysis</p>
        </div>

        {/* Fair Price Capture */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Fair Price Capture</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">You</span>
                <span className="text-primary font-bold">{farmer.avgFairPriceCapture}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${farmer.avgFairPriceCapture}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">District Average</span>
                <span className="text-exploitation font-bold">{farmer.districtAvgCapture}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-exploitation" style={{ width: `${farmer.districtAvgCapture}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recent Transactions</p>
          <div className="space-y-2">
            {transactionHistory.map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm text-foreground">{tx.crop}</p>
                  <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-price">₹{tx.priceReceived}</p>
                  <p className={`text-[10px] ${tx.fairPercent >= 95 ? "text-trust-high" : "text-trust-mid"}`}>
                    {tx.fairPercent}% of fair
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Buyers */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recommended Buyers</p>
          <div className="space-y-3">
            {recommendedBuyers.map((buyer, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <div className="w-10 h-10 rounded-full bg-trust-high/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-trust-high">{buyer.trustScore}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{buyer.name}</p>
                  <p className="text-[10px] text-muted-foreground">{buyer.location} · {buyer.recentDeals} deals</p>
                </div>
                <Star className="w-4 h-4 text-price" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </FarmerLayout>
  );
}
