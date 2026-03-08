import { useState } from "react";
import { Mic, ChevronRight, AlertTriangle, Check } from "lucide-react";
import FarmerLayout from "@/components/FarmerLayout";
import { crops, oracleData, farmer } from "@/data/mockData";

export default function ListProduce() {
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quality, setQuality] = useState("A");
  const [askingPrice, setAskingPrice] = useState("");
  const [joinPool, setJoinPool] = useState(false);
  const [listening, setListening] = useState(false);
  const [posted, setPosted] = useState(false);

  const priceNum = Number(askingPrice);
  const belowFloor = priceNum > 0 && priceNum < oracleData.recommendedFloor;

  const handleMic = () => {
    setListening(true);
    setTimeout(() => {
      setCrop("Areca Nut");
      setListening(false);
    }, 2000);
  };

  if (posted) {
    return (
      <FarmerLayout title="List Produce">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 glow-green">
            <Check className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-display font-bold text-foreground mb-2">Listing Posted!</h2>
          <p className="text-sm text-muted-foreground text-center">
            Your {crop} listing for {quantity}kg at ₹{askingPrice}/kg is now live.
            {joinPool && " Added to FPO pool."}
          </p>
        </div>
      </FarmerLayout>
    );
  }

  return (
    <FarmerLayout title="List Produce">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mt-4 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: What are you selling? */}
      {step === 1 && (
        <div className="space-y-4 animate-slide-up">
          <h3 className="text-lg font-display font-semibold text-foreground">What are you selling?</h3>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Crop</label>
            <div className="relative">
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-foreground text-sm appearance-none focus:outline-none focus:border-primary"
              >
                <option value="">Select crop...</option>
                {crops.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={handleMic}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform hover:scale-105"
              >
                <Mic className={`w-4 h-4 text-primary-foreground ${listening ? "animate-pulse-glow" : ""}`} />
              </button>
            </div>
            {listening && (
              <p className="text-xs text-primary mt-2 animate-pulse-glow">🎤 Listening... say your crop name</p>
            )}
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Quantity (kg)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 120"
              className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Quality Grade</label>
            <div className="flex gap-2">
              {["A", "B", "C"].map((g) => (
                <button
                  key={g}
                  onClick={() => setQuality(g)}
                  className={`flex-1 rounded-lg py-3 text-sm font-medium border transition-colors ${
                    quality === g
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/30"
                  }`}
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Location</label>
            <input
              value={farmer.location}
              readOnly
              className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-muted-foreground text-sm"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!crop || !quantity}
            className="w-full rounded-lg bg-primary text-primary-foreground py-3 font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: PriceOracle */}
      {step === 2 && (
        <div className="space-y-4 animate-slide-up">
          <h3 className="text-lg font-display font-semibold text-foreground">PriceOracle Recommendation</h3>

          <div className="rounded-xl border border-primary/30 bg-card p-5 space-y-4 glow-green">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs text-primary font-medium uppercase tracking-wider">AI Price Intelligence</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-display font-bold text-price">₹{oracleData.fairPriceToday}</p>
                <p className="text-[10px] text-muted-foreground">Fair today</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-trust-high">₹{oracleData.predictedIn14Days}</p>
                <p className="text-[10px] text-muted-foreground">In 14 days</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-exploitation">₹{oracleData.recommendedFloor}</p>
                <p className="text-[10px] text-muted-foreground">Floor price</p>
              </div>
            </div>

            {/* Color band */}
            <div className="relative h-3 rounded-full overflow-hidden bg-muted">
              <div className="absolute inset-y-0 left-0 bg-danger-zone rounded-l-full" style={{ width: "35%" }} />
              <div className="absolute inset-y-0 bg-warning-zone" style={{ left: "35%", width: "15%" }} />
              <div className="absolute inset-y-0 right-0 bg-safe-zone rounded-r-full" style={{ left: "50%" }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground rounded-full" style={{ left: "35%" }} />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <span>Below floor</span>
              <span className="text-primary">Fair zone →</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Your asking price (₹/kg)</label>
            <input
              type="number"
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              placeholder={`Recommended: ₹${oracleData.fairPriceToday}`}
              className="w-full rounded-lg bg-secondary border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
            />
            {belowFloor && (
              <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-exploitation/10 border border-exploitation/20">
                <AlertTriangle className="w-4 h-4 text-exploitation flex-shrink-0" />
                <p className="text-xs text-exploitation">
                  This is below the fair floor price (₹{oracleData.recommendedFloor}). Are you sure?
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 rounded-lg border border-border py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!askingPrice}
              className="flex-1 rounded-lg bg-primary text-primary-foreground py-3 font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-4 animate-slide-up">
          <h3 className="text-lg font-display font-semibold text-foreground">Review & Post</h3>

          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            {[
              ["Crop", crop],
              ["Quantity", `${quantity} kg`],
              ["Quality", `Grade ${quality}`],
              ["Location", farmer.location],
              ["Asking Price", `₹${askingPrice}/kg`],
              ["Oracle Fair Price", `₹${oracleData.fairPriceToday}/kg`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Join FPO Pool?</p>
              <p className="text-xs text-muted-foreground">Add to collective for better bargaining</p>
            </div>
            <button
              onClick={() => setJoinPool(!joinPool)}
              className={`w-12 h-7 rounded-full transition-colors relative ${joinPool ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform ${joinPool ? "right-1" : "left-1"}`} />
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="flex-1 rounded-lg border border-border py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back
            </button>
            <button
              onClick={() => setPosted(true)}
              className="flex-1 rounded-lg bg-primary text-primary-foreground py-3 font-medium text-sm glow-green"
            >
              Post Listing
            </button>
          </div>
        </div>
      )}
    </FarmerLayout>
  );
}
