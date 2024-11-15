// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Members from './pages/Members'; // Example additional page
import Integrations from './pages/Integrations'; // Example additional page
import PricingPlans from './pages/PricingPlans'; // Example additional page
import ReferFriends from './pages/ReferFriends'; // Example additional page
import Settings from './pages/Settings'; // Example additional page
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/pricing-plans" element={<PricingPlans />} />
        <Route path="/refer-friends" element={<ReferFriends />} />
        <Route path="/settings" element={<Settings />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
