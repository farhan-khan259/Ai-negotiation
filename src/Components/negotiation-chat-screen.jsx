import {
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Moon,
  Pause,
  Settings,
  Shield,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const NegotiationChatScreen = ({ onEnd, onNavigate, setupData }) => {
  const [criticExpanded, setCriticExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [isApprovalMode, setIsApprovalMode] = useState(false);
  const [messages, setMessages] = useState([]);

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

  // Check autonomy mode based on estimated value
  useEffect(() => {
    if (setupData) {
      const estimatedValue = setupData.estimatedValue || 0;
      const needsApproval = estimatedValue >= 1000;
      setRequiresApproval(needsApproval);
      setIsApprovalMode(needsApproval);
    }
  }, [setupData]);

  // Initialize messages
  useEffect(() => {
    const initialMessages = [
      {
        id: "1",
        sender: "ai",
        content:
          "Hello! I'm reaching out on behalf of our company to discuss the Q1 2026 supply agreement. We're looking to establish a mutually beneficial partnership.",
        timestamp: "10:23 AM",
        needsApproval: false,
      },
      {
        id: "2",
        sender: "supplier",
        content:
          "Good morning! Thank you for reaching out. We're definitely interested in working together. Our standard pricing for this volume is $12,500 per unit.",
        timestamp: "10:25 AM",
        needsApproval: false,
      },
      {
        id: "3",
        sender: "ai",
        content:
          "I appreciate the initial quote. Based on our market analysis and considering the long-term partnership potential, we were hoping to work within a range of $9,500 to $10,500 per unit. Would you be open to discussing volume-based discounts?",
        timestamp: "10:27 AM",
        needsApproval: false,
      },
      {
        id: "4",
        sender: "supplier",
        content:
          "That's quite a bit lower than our standard rate. However, for a committed partnership, I could consider $11,200 per unit with a 12-month commitment. We could also include expedited shipping at no extra cost.",
        timestamp: "10:30 AM",
        needsApproval: false,
      },
    ];

    if (requiresApproval) {
      // For high-value negotiations, add a pending AI message that needs approval
      initialMessages.push({
        id: "5",
        sender: "ai",
        content:
          "Thank you for the counteroffer and the shipping benefit. The 12-month commitment works well for us. Could we meet at $10,800 per unit? We'd also be interested in discussing an extended warranty option if that's available.",
        timestamp: "10:33 AM",
        needsApproval: true,
      });
      setPendingMessage(
        "Thank you for the counteroffer and the shipping benefit. The 12-month commitment works well for us. Could we meet at $10,800 per unit? We'd also be interested in discussing an extended warranty option if that's available.",
      );
    } else {
      // For low-value negotiations, send automatically
      initialMessages.push({
        id: "5",
        sender: "ai",
        content:
          "Thank you for the counteroffer and the shipping benefit. The 12-month commitment works well for us. Could we meet at $10,800 per unit? We'd also be interested in discussing an extended warranty option if that's available.",
        timestamp: "10:33 AM",
        needsApproval: false,
      });
    }

    setMessages(initialMessages);
  }, [requiresApproval]);

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

  const handleApprove = () => {
    // Move pending message to regular messages
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === "5" ? { ...msg, needsApproval: false } : msg,
      ),
    );
    setPendingMessage("");
    setIsApprovalMode(false);

    // Simulate supplier response after approval
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: "6",
          sender: "supplier",
          content:
            "I understand your position. Let me check with management about $10,800 and the warranty extension.",
          timestamp: "10:35 AM",
          needsApproval: false,
        },
      ]);
    }, 2000);
  };

  const handleEditDraft = () => {
    const editedMessage = prompt("Edit the AI draft:", pendingMessage);
    if (editedMessage) {
      setPendingMessage(editedMessage);
    }
  };

  const validationChecks = [
    {
      id: "1",
      check: "Price within acceptable range ($9,500-$10,500)",
      status: "warning",
    },
    {
      id: "2",
      check: "Maintains professional and collaborative tone",
      status: "passed",
    },
    { id: "3", check: "No unauthorized commitments made", status: "passed" },
    {
      id: "4",
      check: "Aligned with relationship maintenance rule",
      status: "passed",
    },
  ];

  const negotiationTone = setupData?.negotiationTone || "professional";
  const primaryGoal = setupData?.primaryGoal || "lower-price";
  const estimatedValue = setupData?.estimatedValue || 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-8 py-8 flex gap-6">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="card p-4 rounded-xl border border-border bg-card mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Acme Supply Co.
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span>Active Negotiation</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  Round 3 of 5
                </p>
                <p className="text-xs text-muted-foreground">
                  Estimated completion: 15 min
                </p>
              </div>
            </div>

            {/* Strategy Info */}
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Strategy</p>
                <p className="text-sm font-medium text-foreground capitalize">
                  {negotiationTone}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Primary Goal</p>
                <p className="text-sm font-medium text-foreground capitalize">
                  {primaryGoal.replace("-", " ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deal Value</p>
                <p className="text-sm font-medium text-foreground">
                  ${estimatedValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mode</p>
                <p
                  className={`text-sm font-medium ${requiresApproval ? "text-warning" : "text-success"}`}
                >
                  {requiresApproval ? "Human-in-loop" : "Autonomous"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="card flex-1 rounded-xl border border-border bg-card overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "ai" ? "flex-row" : "flex-row"}`}
                >
                  {/* Avatar */}
                  {message.sender === "ai" ? (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-foreground" />
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="flex-1 max-w-[600px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {message.sender === "ai"
                          ? "AI Negotiator"
                          : "Acme Supply Co."}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                      {message.needsApproval && (
                        <span className="text-xs px-2 py-1 rounded bg-warning/20 text-warning">
                          Pending Approval
                        </span>
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-xl ${
                        message.sender === "ai"
                          ? message.needsApproval
                            ? "bg-warning/10 border border-warning/20"
                            : "bg-primary/10 border border-primary/20"
                          : "bg-accent"
                      }`}
                    >
                      <p className="text-sm text-foreground leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {!isApprovalMode && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">
                      Acme Supply Co.
                    </span>
                    <div className="mt-1 p-4 rounded-xl bg-accent inline-flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - Dynamic based on autonomy mode */}
            <div className="p-4 border-t border-border bg-muted/30">
              {isApprovalMode ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 human-approval-banner">
                    <div className="flex items-center gap-2 text-warning mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">
                        Human Approval Required
                      </span>
                    </div>
                    <p className="text-sm text-foreground">
                      High-value negotiation detected ($
                      {estimatedValue.toLocaleString()}). AI has drafted a
                      response. Review and approve before sending.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-foreground mb-3">
                      {pendingMessage}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleEditDraft}
                        className="btn btn-outline h-9 px-4 flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Edit Draft
                      </button>
                      <button
                        onClick={handleApprove}
                        className="btn btn-primary h-9 px-4 flex-1"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve & Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <input
                    placeholder={
                      requiresApproval
                        ? "AI is negotiating with human approval..."
                        : "AI is negotiating autonomously..."
                    }
                    disabled
                    className="input h-11 bg-input-background border-input rounded-lg opacity-60 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="btn h-11 px-6 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                {requiresApproval
                  ? `High-value negotiation ($${estimatedValue.toLocaleString()}): Human approval required for each AI message`
                  : "Low-value negotiation: AI is conducting the negotiation autonomously"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3 justify-end">
            <button className="btn btn-outline h-11 px-6 rounded-lg border-border hover:bg-accent">
              <Pause className="w-4 h-4 mr-2" />
              Pause AI
            </button>
            <button
              onClick={onEnd}
              className="btn btn-destructive h-11 px-6 rounded-lg bg-destructive hover:bg-destructive/90"
            >
              <X className="w-4 h-4 mr-2" />
              End Negotiation
            </button>
          </div>
        </div>

        {/* Critic Agent Panel */}
        <div className="w-80 flex-shrink-0">
          <div className="card rounded-xl border border-border bg-card">
            <button
              onClick={() => setCriticExpanded(!criticExpanded)}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors rounded-t-xl"
            >
              <h3 className="font-semibold text-foreground">
                Critic Agent Validation
              </h3>
              {criticExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {criticExpanded && (
              <div className="p-4 pt-0 space-y-3">
                {validationChecks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-accent/50"
                  >
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        check.status === "passed"
                          ? "text-[#10b981]"
                          : "text-[#f59e0b]"
                      }`}
                    />
                    <p className="text-sm text-foreground">{check.check}</p>
                  </div>
                ))}
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    All critical validations passed. AI is operating within
                    defined parameters.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Autonomy Settings Panel */}
          <div className="card rounded-xl border border-border bg-card mt-4 p-4">
            <h3 className="font-semibold text-foreground mb-4">
              Autonomy Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${requiresApproval ? "bg-warning threshold-warning" : "bg-success"}`}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {requiresApproval
                      ? "Human-in-the-loop Mode"
                      : "Fully Autonomous Mode"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {requiresApproval
                      ? "All AI messages require human approval before sending"
                      : "AI negotiates and responds automatically"}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Deal Value</span>
                  <span className="font-medium text-foreground">
                    ${estimatedValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">
                    Autonomy Threshold
                  </span>
                  <span className="font-medium text-foreground">$1,000</span>
                </div>
                <div className="mt-2 p-2 rounded bg-accent/50">
                  <p className="text-xs text-muted-foreground">
                    {requiresApproval
                      ? "Deal value ≥ $1,000: Human approval required"
                      : "Deal value < $1,000: Fully autonomous"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Negotiation Stats */}
          <div className="card rounded-xl border border-border bg-card mt-4 p-4">
            <h3 className="font-semibold text-foreground mb-4">
              Negotiation Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Current Offer</span>
                  <span className="font-medium text-foreground">$11,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target Range</span>
                  <span className="font-medium text-foreground">
                    $9,500-$10,500
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Messages Exchanged
                  </span>
                  <span className="font-medium text-foreground">
                    {messages.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">
                    12 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NegotiationChatScreen;
