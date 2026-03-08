import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import KarnatakaMap from "@/components/KarnatakaMap";
import { districtExploitation, flaggedTraders } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

export default function RegulatorDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Regulator Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">Exploitation Heatmap</h3>
          <p className="text-xs text-muted-foreground mb-4">Karnataka districts by price gap ratio</p>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {districtExploitation.map((d) => {
              const intensity = d.score / 100;
              const bg = d.score > 65 ? "bg-exploitation" : d.score > 40 ? "bg-trust-mid" : "bg-trust-high";
              return (
                <div
                  key={d.name}
                  className={`rounded-lg p-3 text-center border border-border`}
                  style={{ backgroundColor: `hsl(${d.score > 65 ? '0 72%' : d.score > 40 ? '38 80%' : '145 55%'} ${Math.max(20, intensity * 50)}%)` }}
                >
                  <p className="text-[10px] font-medium text-foreground truncate">{d.name}</p>
                  <p className="text-lg font-display font-bold text-foreground">{d.score}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-trust-high" /> Low risk</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-trust-mid" /> Medium</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-exploitation" /> High risk</div>
          </div>
        </div>

        {/* Flagged Traders */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-exploitation" />
            <h3 className="text-sm font-display font-semibold text-foreground">Flagged Intermediaries</h3>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-5 gap-2 text-[10px] text-muted-foreground uppercase tracking-wider px-3 py-2">
              <span className="col-span-2">Trader</span>
              <span>Gap</span>
              <span>Farmers</span>
              <span>Score</span>
            </div>
            {flaggedTraders.map((trader) => (
              <button
                key={trader.id}
                onClick={() => navigate(`/regulator/trader/${trader.id}`)}
                className="w-full grid grid-cols-5 gap-2 px-3 py-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
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
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
