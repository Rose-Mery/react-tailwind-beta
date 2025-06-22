import React, { useState } from 'react';
import LoginView from './views/LoginView';
import Dashboard from './components/Dashboard';
import 'leaflet/dist/leaflet.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("Login exitoso");
    setIsLoggedIn(true);
  };

  console.log("Estado login:", isLoggedIn);

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <LoginView onLogin={handleLogin} />}
    </div>
  );
}

export default App;
