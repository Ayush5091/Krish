import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import KarnatakaMap from "@/components/KarnatakaMap";
import { districtExploitation, flaggedTraders } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

export default function RegulatorDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Regulator Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Heatmap */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Exploitation Heatmap</h3>
          <p className="text-xs text-muted-foreground mb-3 sm:mb-4">Karnataka districts by price gap ratio</p>
          
          <KarnatakaMap data={districtExploitation} />

          <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-trust-high" /> Low risk</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-trust-mid" /> Medium</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-exploitation" /> High risk</div>
          </div>
        </div>

        {/* Flagged Traders */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <AlertTriangle className="w-4 h-4 text-exploitation" />
            <h3 className="text-sm font-display font-semibold text-foreground">Flagged Intermediaries</h3>
          </div>

          <div className="space-y-1">
            {/* Header - hidden on small mobile, shown on sm+ */}
            <div className="hidden sm:grid grid-cols-5 gap-2 text-[10px] text-muted-foreground uppercase tracking-wider px-3 py-2">
              <span className="col-span-2">Trader</span>
              <span>Gap</span>
              <span>Farmers</span>
              <span>Score</span>
            </div>
            {flaggedTraders.map((trader) => (
              <button
                key={trader.id}
                onClick={() => navigate(`/regulator/trader/${trader.id}`)}
                className="w-full px-3 py-3 rounded-lg hover:bg-muted active:bg-muted transition-colors text-left"
              >
                {/* Mobile layout */}
                <div className="sm:hidden">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">{trader.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      trader.exploitationScore > 80 ? "bg-exploitation/20 text-exploitation" : "bg-trust-mid/20 text-trust-mid"
                    }`}>
                      {trader.exploitationScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{trader.district}</span>
                    <span className="text-price font-medium">{trader.priceGapScore}× gap</span>
                    <span>{trader.farmersAffected} farmers</span>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-5 gap-2">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-foreground truncate">{trader.name}</p>
                    <p className="text-[10px] text-muted-foreground">{trader.district}</p>
                  </div>
                  <p className="text-sm text-price font-medium self-center">{trader.priceGapScore}×</p>
                  <p className="text-sm text-foreground self-center">{trader.farmersAffected}</p>
                  <div className="self-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      trader.exploitationScore > 80 ? "bg-exploitation/20 text-exploitation" : "bg-trust-mid/20 text-trust-mid"
                    }`}>
                      {trader.exploitationScore}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
