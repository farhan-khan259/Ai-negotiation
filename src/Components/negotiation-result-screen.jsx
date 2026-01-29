import {
  Bot,
  Calendar,
  CheckCircle2,
  DollarSign,
  Download,
  Moon,
  Plus,
  Settings,
  Shield,
  Sun,
  TrendingDown,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const NegotiationResultScreen = ({ onStartNew, onNavigate, setupData }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const negotiationTone = setupData?.negotiationTone || "professional";
  const primaryGoal = setupData?.primaryGoal || "lower-price";
  const estimatedValue = setupData?.estimatedValue || 0;
  const requiresApproval = estimatedValue >= 1000;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">
              AI Negotiation Platform
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <label className="mode-toggle">
              <input
                type="checkbox"
                className="mode-toggle-input"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <div className="mode-toggle-track">
                <div className="mode-toggle-icons">
                  <Sun className="mode-toggle-sun" />
                  <Moon className="mode-toggle-moon" />
                </div>
              </div>
            </label>

            <button
              className="btn btn-ghost btn-icon"
              onClick={() => onNavigate("settings")}
            >
              <Settings className="w-5 h-5 text-foreground" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Negotiation Completed Successfully
            </h1>
            <p className="text-muted-foreground">
              Final agreement reached with Acme Supply Co. on January 25, 2026
            </p>
          </div>

          {/* Strategy Applied Section (NEW) */}
          <div className="card p-6 rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Strategy Applied
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Negotiation Tone
                </p>
                <p className="font-semibold text-foreground capitalize">
                  {negotiationTone}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Primary Goal
                </p>
                <p className="font-semibold text-foreground capitalize">
                  {primaryGoal.replace("-", " ")}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-xs text-muted-foreground mb-1">Deal Value</p>
                <p className="font-semibold text-foreground">
                  ${estimatedValue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Autonomy Mode
                </p>
                <p
                  className={`font-semibold ${requiresApproval ? "text-warning" : "text-success"}`}
                >
                  {requiresApproval ? "Human-in-the-loop" : "Fully Autonomous"}
                </p>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="card p-6 rounded-xl border-2 border-success bg-gradient-to-br from-success/5 to-transparent mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Savings Achieved
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl font-semibold text-success">
                    $1,400
                  </h2>
                  <span className="text-lg text-muted-foreground">
                    per unit
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10">
                  <TrendingDown className="w-5 h-5 text-success" />
                  <span className="text-2xl font-semibold text-success">
                    11.2%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  below original quote
                </p>
              </div>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Original Quote
                  </p>
                  <h3 className="text-3xl font-semibold text-foreground">
                    $12,500
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">per unit</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Supplier's initial offer
                </p>
              </div>
            </div>

            <div className="card p-6 rounded-xl border-2 border-success bg-gradient-to-br from-success/5 to-transparent">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Final Negotiated Price
                  </p>
                  <h3 className="text-3xl font-semibold text-success">
                    $11,100
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">per unit</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
              </div>
              <div className="pt-4 border-t border-success/20">
                <p className="text-xs text-muted-foreground">
                  Within target range ($9,500-$10,500)
                </p>
              </div>
            </div>
          </div>

          {/* Deal Terms */}
          <div className="card p-6 rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Final Deal Terms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Unit Price</p>
                    <p className="font-semibold text-foreground">$11,100</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Contract Length
                    </p>
                    <p className="font-semibold text-foreground">12 months</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Warranty</p>
                    <p className="font-semibold text-foreground">24 months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">
                Additional Benefits
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Free expedited shipping on all orders</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Dedicated account manager assigned</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Priority support with 4-hour response time</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Negotiation Summary */}
          <div className="card p-6 rounded-xl mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Negotiation Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Rounds
                </p>
                <p className="text-2xl font-semibold text-foreground">4</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="text-2xl font-semibold text-foreground">18m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Messages</p>
                <p className="text-2xl font-semibold text-foreground">8</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  AI Strategy
                </p>
                <p className="text-base font-medium text-foreground capitalize">
                  {negotiationTone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="btn btn-outline h-11 px-6">
              <Download className="w-4 h-4 mr-2" />
              Download Transcript
            </button>
            <button onClick={onStartNew} className="btn btn-primary h-11 px-6">
              <Plus className="w-4 h-4 mr-2" />
              Start New Negotiation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NegotiationResultScreen;
