
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 


const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    // Show a loading indicator while checking auth status
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  // If authenticated, render the nested routes (e.g., DashboardPage)
  // Otherwise, navigate to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
