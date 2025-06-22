// client/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css"

const HomePage = () => {
  return (
    <div class="page-container">
    <div class="content-card">
        <h1 class="main-title">
            Welcome to <span class="text-blue-600">TaskFlow</span>
        </h1>
        <p class="description-paragraph">
            Your personal task management system. Organize your life and boost your productivity with ease.
        </p>
        <div class="buttons-container">
            <a href="/register" class="action-button button-primary">
                Get Started
            </a>
            <a href="/login" class="action-button button-secondary ">
                Login
            </a>
        </div>
    </div>
</div>
  );
};

export default HomePage;
