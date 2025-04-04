// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import AddLocation from './pages/AddLocation';
import AddParkingSpot from './pages/AddParkingSpot';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-location" element={<AddLocation />}/>
          <Route path="/admin/add-parking-spot" element={<AddParkingSpot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
