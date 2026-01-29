import { useState } from 'react';
import './App.css';
import DashboardScreen from './Components/dashboard-screen.jsx';
import ForgotPasswordScreen from './Components/forgetpassword-screen.jsx';
import LoginScreen from './Components/login-screen.jsx';
import NegotiationChatScreen from './Components/negotiation-chat-screen.jsx';
import NegotiationResultScreen from './Components/negotiation-result-screen.jsx';
import NegotiationSetupScreen from './Components/negotiation-setup-screen.jsx';
import RegisterScreen from './Components/register-screen.jsx';
import SettingsScreen from './Components/settings-screen.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [negotiationSetupData, setNegotiationSetupData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleRegister = () => {
    // In a real app, you would set authentication state here
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleContinueToSetup = () => {
    setCurrentScreen('setup');
  };

  const handleStartNegotiation = (setupData) => {
    setNegotiationSetupData(setupData);
    setCurrentScreen('chat');
  };

  const handleEndNegotiation = () => {
    setCurrentScreen('result');
  };

  const handleStartNew = () => {
    setNegotiationSetupData(null);
    setCurrentScreen('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen) => {
    // Protect dashboard and other screens if not authenticated
    if (!isAuthenticated && ['dashboard', 'setup', 'chat', 'result', 'settings'].includes(screen)) {
      setCurrentScreen('login');
      return;
    }
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  // If not authenticated and trying to access protected screens, redirect to login
  if (!isAuthenticated && currentScreen !== 'login' && currentScreen !== 'register' && currentScreen !== 'forgot-password') {
    return <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
  }

  return (
    <div className="app">
      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'register' && (
        <RegisterScreen
          onRegister={handleRegister}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'forgot-password' && (
        <ForgotPasswordScreen
          onNavigate={handleNavigate}
          onResetPassword={handleLogin}
        />
      )}
      {currentScreen === 'dashboard' && (
        <DashboardScreen
          onContinue={handleContinueToSetup}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'setup' && (
        <NegotiationSetupScreen
          onStart={handleStartNegotiation}
          onBack={handleBackToDashboard}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'chat' && (
        <NegotiationChatScreen
          onEnd={handleEndNegotiation}
          onNavigate={handleNavigate}
          setupData={negotiationSetupData}
        />
      )}
      {currentScreen === 'result' && (
        <NegotiationResultScreen
          onStartNew={handleStartNew}
          onNavigate={handleNavigate}
          setupData={negotiationSetupData}
        />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen
          onBack={handleBackToDashboard}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;