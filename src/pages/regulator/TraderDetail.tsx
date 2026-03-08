import DashboardLayout from "@/components/DashboardLayout";
import { traderDetail } from "@/data/mockData";
import { AlertTriangle, Flag } from "lucide-react";
import { useState } from "react";

export default function TraderDetail() {
  const [flagged, setFlagged] = useState(false);
  const t = traderDetail;

  return (
    <DashboardLayout title={t.name} backTo="/regulator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="space-y-4">
          <div className="rounded-xl border border-exploitation/30 bg-card p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-exploitation flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-exploitation">{t.exploitationScore}</span>
              </div>
              <div>
                <h2 className="text-lg font-display font-semibold text-foreground">{t.name}</h2>
                <p className="text-sm text-muted-foreground">{t.district}</p>
                <p className="text-xs text-exploitation font-medium mt-1">Exploitation Score: {t.exploitationScore}/100</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["Avg Price Gap", `${t.avgPriceGap}×`],
                ["Farmers/mo", String(t.farmersThisMonth)],
                ["Total Txns", String(t.totalTransactions)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-lg font-display font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setFlagged(true)}
            disabled={flagged}
            className={`w-full rounded-xl py-3 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              flagged
                ? "bg-exploitation/20 text-exploitation border border-exploitation/30"
                : "bg-exploitation text-primary-foreground hover:opacity-90"
            }`}
          >
            <Flag className="w-4 h-4" />
            {flagged ? "Flagged for Investigation" : "Flag for Investigation"}
          </button>
        </div>

        {/* Network Graph */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Supply Chain Network</h3>
          
          <svg viewBox="0 0 400 350" className="w-full">
            {/* Trader node (center) */}
            <circle cx="200" cy="175" r="35" fill="hsl(0 72% 50%)" opacity="0.2" />
            <circle cx="200" cy="175" r="25" fill="hsl(0 72% 50%)" />
            <text x="200" y="172" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">TRADER</text>
            <text x="200" y="183" textAnchor="middle" fill="white" fontSize="7">{t.exploitationScore}/100</text>

            {/* Farmer nodes */}
            {t.connectedFarmers.map((f, i) => {
              const angle = (i / t.connectedFarmers.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 130;
              const x = 200 + Math.cos(angle) * radius;
              const y = 175 + Math.sin(angle) * radius;
              const gapColor = f.priceGap > 2.5 ? "hsl(0 72% 50%)" : f.priceGap > 2 ? "hsl(38 80% 50%)" : "hsl(145 55% 42%)";

              return (
                <g key={i}>
                  {/* Edge */}
                  <line x1="225" y1="175" x2={x - 15} y2={y} stroke={gapColor} strokeWidth="2" opacity="0.6" />
                  <text
                    x={(225 + x - 15) / 2}
                    y={(175 + y) / 2 - 5}
                    textAnchor="middle"
                    fill={gapColor}
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {f.priceGap}×
                  </text>

                  {/* Node */}
                  <circle cx={x} cy={y} r="18" fill="hsl(145 55% 42%)" opacity="0.2" />
                  <circle cx={x} cy={y} r="14" fill="hsl(145 55% 42%)" />
                  <text x={x} y={y - 3} textAnchor="middle" fill="white" fontSize="6">{f.name.split(" ")[0]}</text>
                  <text x={x} y={y + 6} textAnchor="middle" fill="white" fontSize="6" opacity="0.8">{f.trustScore}</text>
                </g>
              );
            })}
          </svg>

          <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground justify-center">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-exploitation" /> Trader</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-trust-high" /> Farmer</div>
            <span>Edge labels = price gap ratio</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
