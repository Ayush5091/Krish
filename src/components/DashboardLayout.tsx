import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DashboardLayout({ children, title, backTo = "/" }: { children: ReactNode; title: string; backTo?: string }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 pb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button onClick={() => navigate(backTo)} className="text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg sm:text-xl font-display font-semibold text-foreground truncate">{title}</h1>
          <div className="ml-auto text-xs text-primary font-medium font-display flex-shrink-0">AgroLens</div>
        </div>
        {children}
      </div>
    </div>
  );
}
