import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { availableListings } from "@/data/mockData";
import { ShoppingCart } from "lucide-react";

export default function BuyerDashboard() {
  const [offered, setOffered] = useState<string | null>(null);
  const buyerTrustScore = 87;

  return (
    <DashboardLayout title="Buyer Dashboard">
      {/* Trust Score */}
      <div className="rounded-xl border border-primary/30 bg-card p-4 flex items-center gap-4 mb-6 glow-green">
        <div className="w-14 h-14 rounded-full border-3 border-primary flex items-center justify-center">
          <span className="text-xl font-display font-bold text-primary">{buyerTrustScore}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Your Trust Score</p>
          <p className="text-xs text-muted-foreground">Fair dealings improve your score and visibility</p>
        </div>
      </div>

      {/* Listings */}
      <h3 className="text-sm font-display font-semibold text-foreground mb-3">Available Listings</h3>
      <div className="space-y-3">
        {availableListings.map((listing) => (
          <div key={listing.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-foreground">{listing.crop} — Grade {listing.quality}</p>
                <p className="text-xs text-muted-foreground">{listing.farmer}, {listing.location} · {listing.quantity}kg</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 rounded-lg bg-muted p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Asking</p>
                <p className="text-sm font-display font-bold text-price">₹{listing.askingPrice}</p>
              </div>
              <div className="flex-1 rounded-lg bg-muted p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Oracle Fair</p>
                <p className="text-sm font-display font-bold text-foreground">₹{listing.oraclePrice}</p>
              </div>
              <div className="flex-1 rounded-lg bg-muted p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Gap</p>
                <p className={`text-sm font-display font-bold ${listing.askingPrice > listing.oraclePrice ? "text-trust-mid" : "text-trust-high"}`}>
                  {listing.askingPrice > listing.oraclePrice ? "+" : ""}{Math.round((listing.askingPrice / listing.oraclePrice - 1) * 100)}%
                </p>
              </div>
            </div>
            {offered === listing.id ? (
              <p className="text-xs text-primary font-medium text-center py-2">✓ Offer sent</p>
            ) : (
              <button
                onClick={() => setOffered(listing.id)}
                className="w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" /> Make Offer
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
