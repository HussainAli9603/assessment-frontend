// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; 
import "../style/navbar.css"

const Navbar = () => {
  // const { isAuthenticated, logout, user } = useAuth();
  const  isAuthenticated = false
  const user = {
      username: "Hussain Ali",
  }
  const logout = "ssss"

  return (
    <nav className="navbar">
    <div className="navbar-container">
       
        <a href="/" className="navbar-brand">
            TaskFlow
        </a>


        <div className="navbar-links">
           
            <div className="authenticated-links hidden-element">
                <span className="navbar-username">
                    Welcome, User!
                </span>
                <a href="/dashboard" className="navbar-link-btn">
                    Dashboard
                </a>
                <button className="navbar-logout-btn">
                    Logout
                </button>
            </div>

    
            <div className="unauthenticated-links">
                <a href="/login" className="navbar-link-btn">
                    Login
                </a>
                <a href="/register" className="navbar-link-btn">
                    Register
                </a>
            </div>
        </div>
    </div>
</nav>
  );
};

export default Navbar;
