// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar'; 
import './index.css'

// Page components
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; 
import ProtectedRoutes from './components/ProtectedRoutes'; 

function App() {
  return (
    // AuthProvider makes authentication state available to all nested components
      <Router>
        <AuthProvider>
        <Navbar /> {/* Navbar is always visible */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          {/* Uses ProtectedRoutes component to ensure only authenticated users can access */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Fallback for unmatched routes */}
          <Route path="*" element={
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 text-center text-2xl text-gray-600">
              404 | Page Not Found
              <Link to="/" className="ml-2 text-blue-600 hover:underline">Go Home</Link>
            </div>
          } />
        </Routes>
     </AuthProvider>
      </Router>
  );
}

export default App;
