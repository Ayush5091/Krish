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
      <div className="rounded-xl border border-primary/30 bg-card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 glow-green">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-primary flex items-center justify-center flex-shrink-0">
          <span className="text-lg sm:text-xl font-display font-bold text-primary">{buyerTrustScore}</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">Your Trust Score</p>
          <p className="text-xs text-muted-foreground">Fair dealings improve your score and visibility</p>
        </div>
      </div>

      {/* Listings */}
      <h3 className="text-sm font-display font-semibold text-foreground mb-3">Available Listings</h3>
      <div className="space-y-3">
        {availableListings.map((listing) => (
          <div key={listing.id} className="rounded-xl border border-border bg-card p-3 sm:p-4">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{listing.crop} — Grade {listing.quality}</p>
                <p className="text-xs text-muted-foreground truncate">{listing.farmer}, {listing.location} · {listing.quantity}kg</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 mb-3">
              <div className="flex-1 rounded-lg bg-muted p-2 text-center">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">Asking</p>
                <p className="text-xs sm:text-sm font-display font-bold text-price">₹{listing.askingPrice}</p>
              </div>
              <div className="flex-1 rounded-lg bg-muted p-2 text-center">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">Oracle Fair</p>
                <p className="text-xs sm:text-sm font-display font-bold text-foreground">₹{listing.oraclePrice}</p>
              </div>
              <div className="flex-1 rounded-lg bg-muted p-2 text-center">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">Gap</p>
                <p className={`text-xs sm:text-sm font-display font-bold ${listing.askingPrice > listing.oraclePrice ? "text-trust-mid" : "text-trust-high"}`}>
                  {listing.askingPrice > listing.oraclePrice ? "+" : ""}{Math.round((listing.askingPrice / listing.oraclePrice - 1) * 100)}%
                </p>
              </div>
            </div>
            {offered === listing.id ? (
              <p className="text-xs text-primary font-medium text-center py-2">✓ Offer sent</p>
            ) : (
              <button
                onClick={() => setOffered(listing.id)}
                className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium flex items-center justify-center gap-2 active:opacity-80"
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
