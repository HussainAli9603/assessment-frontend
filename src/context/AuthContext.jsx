// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

// Create the AuthContext
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data if authenticated
  const [loading, setLoading] = useState(true); // Manages loading state during initial checks
  const [error, setError] = useState(null); // Stores any authentication errors
  const navigate = useNavigate(); // Hook for navigation

  // Effect to run on initial load to check for existing token and authenticate user
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setUser({ token: token }); // Set a temporary user object based on token presence
      }
      setLoading(false); // Authentication check complete
    };
    checkAuth();
  }, []); // Runs only once on component mount

  /**
   * Handles user login.
   * Sends credentials to backend, stores token, and updates user state.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<boolean>} True if login successful, false otherwise.
   */

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, id, username } = response.data;

      localStorage.setItem('token', token); 
      setUser({ id, username, email, token });
      navigate('/dashboard'); 
      return true;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user registration.
   * Sends user data to backend, logs in automatically on success.
   * @param {string} username - New user's username.
   * @param {string} email - New user's email.
   * @param {string} password - New user's password.
   * @returns {Promise<boolean>} True if registration successful, false otherwise.
   */
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    console.log(username)
    console.log(email)
    console.log(password)
    try {
      const response = await api.post('/auth/register', { username, email, password });
      // Upon successful registration, automatically log in the user
      const { token, id } = response.data; // Response includes token for immediate login
      localStorage.setItem('token', token);
      setUser({ id, username, email, token });
      navigate('/dashboard'); // Redirect to dashboard
      return true;
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed.');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user logout.
   * Removes token from localStorage and clears user state.
   */
  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  // Provide the authentication state and functions to children components
  const authContextValue = {
    user,
    isAuthenticated: !!user, // Convenience flag
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to easily consume the AuthContext.
 * @returns {object} The authentication context value.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
