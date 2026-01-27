import { AlertCircle, Bot } from "lucide-react";
import { useState } from "react";

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Predefined admin credentials
  const ADMIN_CREDENTIALS = {
    email: "admin@negotiationai.com",
    password: "Admin@123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (
        email === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {
        onLogin();
      } else {
        setError(
          "Invalid email or password. Please use the admin credentials.",
        );
      }
      setIsLoading(false);
    }, 500);
  };

  const handleForgotPassword = () => {
    alert("Contact system administrator for password reset");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[440px]">
        <div className="card p-8 shadow-sm">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to your Autonomous AI Negotiation Platform
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@negotiationai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Admin@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Forgot Password Link - Now using button */}
          <div className="mt-6 text-center">
            <button
              id="continue-btn"
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
