import { useState } from 'react';
import './App.css';
import DashboardScreen from './Components/dashboard-screen.jsx';
import LoginScreen from './Components/login-screen.jsx';
import NegotiationChatScreen from './Components/negotiation-chat-screen.jsx';
import NegotiationResultScreen from './Components/negotiation-result-screen.jsx';
import NegotiationSetupScreen from './Components/negotiation-setup-screen.jsx';
import SettingsScreen from './Components/settings-screen.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleContinueToSetup = () => {
    setCurrentScreen('setup');
  };

  const handleStartNegotiation = () => {
    setCurrentScreen('chat');
  };

  const handleEndNegotiation = () => {
    setCurrentScreen('result');
  };

  const handleStartNew = () => {
    setCurrentScreen('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="app">
      {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
      {currentScreen === 'dashboard' && (
        <DashboardScreen
          onContinue={handleContinueToSetup}
          onNavigate={handleNavigate}
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
        />
      )}
      {currentScreen === 'result' && (
        <NegotiationResultScreen
          onStartNew={handleStartNew}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;