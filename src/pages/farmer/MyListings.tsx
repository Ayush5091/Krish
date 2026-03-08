import { useState } from "react";
import { Check, Clock, Lock, Package } from "lucide-react";
import FarmerLayout from "@/components/FarmerLayout";
import { farmerListings } from "@/data/mockData";

const statusConfig = {
  Open: { icon: Package, color: "text-price", bg: "bg-price/10", border: "border-price/20" },
  Matched: { icon: Check, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  "In Escrow": { icon: Lock, color: "text-trust-mid", bg: "bg-trust-mid/10", border: "border-trust-mid/20" },
  Completed: { icon: Check, color: "text-muted-foreground", bg: "bg-muted", border: "border-border" },
};

export default function MyListings() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <FarmerLayout title="My Listings">
      <div className="space-y-3 mt-4">
        {farmerListings.map((listing) => {
          const config = statusConfig[listing.status];
          const isExpanded = expanded === listing.id;

          return (
            <div
              key={listing.id}
              className={`rounded-xl border ${config.border} bg-card overflow-hidden transition-all`}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : listing.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{listing.crop}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium`}>
                    {listing.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{listing.quantity}kg</span>
                  <span>Grade {listing.quality}</span>
                  <span className="ml-auto text-price font-medium">₹{listing.askingPrice}/kg</span>
                </div>
              </button>

              {isExpanded && listing.buyer && (
                <div className="px-4 pb-4 border-t border-border pt-3 space-y-3 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Buyer</p>
                      <p className="text-sm font-medium text-foreground">{listing.buyer.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-trust-high/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-trust-high">{listing.buyer.trustScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-[10px] text-muted-foreground">Offered</p>
                      <p className="text-sm font-display font-bold text-price">₹{listing.buyer.offeredPrice}</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-[10px] text-muted-foreground">Oracle Price</p>
                      <p className="text-sm font-display font-bold text-foreground">₹{listing.oraclePrice}</p>
                    </div>
                  </div>

                  {listing.status === "Matched" && (
                    <div className="flex gap-2">
                      <button className="flex-1 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium">
                        Accept
                      </button>
                      <button className="flex-1 rounded-lg border border-border py-2.5 text-sm text-muted-foreground">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FarmerLayout>
  );
}
