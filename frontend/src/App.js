import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Component and Page Imports
import SideNav from './components/SideNav';
import VoiceAssistant from './components/VoiceAssistant';
import Dashboard from './pages/Dashboard';
import CampusNavigation from './pages/CampusNavigation';
import StudyMaterials from './pages/StudyMaterials';
import LiveCommunication from './pages/LiveCommunication';
import Profile from './pages/ProfilePage';
import Login from './pages/login'; 

// Main CSS for layout
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // ✅ Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <AppLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          {/* Login Route (always accessible) */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/navigation"
            element={isLoggedIn ? <CampusNavigation /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/materials"
            element={isLoggedIn ? <StudyMaterials /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/communication"
            element={isLoggedIn ? <LiveCommunication /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/accessibility"
            element={isLoggedIn ? <AccessibilityTools /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
