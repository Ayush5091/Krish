import { useNavigate } from "react-router-dom";
import { Sprout, ShoppingCart, Shield, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const roles = [
  {
    title: "Farmer",
    icon: Sprout,
    path: "/farmer",
    description: "List produce, get fair prices, track trust scores",
    accent: "bg-primary",
  },
  {
    title: "Buyer / Trader",
    icon: ShoppingCart,
    path: "/buyer",
    description: "Browse listings, make offers at oracle-verified prices",
    accent: "bg-price",
  },
  {
    title: "Regulator",
    icon: Shield,
    path: "/regulator",
    description: "Monitor exploitation, flag intermediaries, view heatmaps",
    accent: "bg-exploitation",
  },
  {
    title: "FPO Manager",
    icon: Users,
    path: "/fpo",
    description: "Manage farmer pools, collective bargaining, revenue splits",
    accent: "bg-trust-mid",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        {/* Brand */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight">
              Agro<span className="text-primary">Lens</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto mb-6 sm:mb-8 px-2">
            Fair pricing. Transparent supply chains. Empowered farmers.
          </p>

          {/* The killer stat */}
          <div className="inline-flex items-center gap-3 sm:gap-4 rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-5 sm:px-8 py-4 sm:py-5 glow-green">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-display font-bold text-price">₹35</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Farmer gets</p>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium">vs</p>
            </div>
            <div className="w-px h-10 sm:h-12 bg-border" />
            <div className="text-left">
              <p className="text-2xl sm:text-3xl font-display font-bold text-exploitation">₹100</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Consumer pays</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3">
            65% of value lost to middlemen. AgroLens changes that.
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full max-w-3xl px-1">
          <p className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 uppercase tracking-widest font-medium">
            Select your role
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {roles.map((role) => (
              <button
                key={role.title}
                onClick={() => navigate(role.path)}
                className="group relative rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 sm:p-6 text-left transition-all duration-300 hover:border-primary/50 hover:glow-green active:scale-[0.98] sm:hover:scale-[1.02]"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${role.accent} flex items-center justify-center mb-3 sm:mb-4`}>
                  <role.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <h3 className="text-sm sm:text-lg font-display font-semibold text-foreground mb-0.5 sm:mb-1">
                  {role.title}
                </h3>
                <p className="text-[11px] sm:text-sm text-muted-foreground leading-snug">
                  {role.description}
                </p>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground/30 group-hover:text-primary transition-colors">
                  →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
