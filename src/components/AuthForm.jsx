// client/src/components/AuthForm.js
import React, { useState } from 'react';

/**
 * Reusable authentication form component for Login and Register.
 * @param {string} type - 'login' or 'register'. Determines form fields and submit action.
 * @param {function} onSubmit - Function to call on form submission (e.g., login or register action).
 * @param {string} loading - Boolean indicating if an auth operation is in progress.
 * @param {string} error - Any error message to display.
 */
// const AuthForm = ({ type, onSubmit, loading, error }) => {
const AuthForm = ({ type, onSubmit, loading, error }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const isRegister = type === 'register';

  /**
   * Handles form submission. Performs client-side validation
   * before calling the parent onSubmit function.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(''); // Clear previous local errors

    // Client-side validation
    if (!email || !password) {
      setLocalError('Email and password are required.');
      return;
    }
    if (isRegister) {
      if (!username) {
        setLocalError('Username is required.');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters long.');
        return;
      }
    }

    // Call the parent onSubmit function with appropriate data
    if (isRegister) {
      onSubmit(username, email, password);
    } else {
      onSubmit(email, password);
    }
  };

  return (
  <div className="auth-card"> {/* Replaced bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 */}
    <h2 className="auth-title"> {/* Replaced text-4xl font-extrabold text-center text-gray-800 mb-8 */}
      {isRegister ? 'Register' : 'Login'}
    </h2>

    {/* Display external error from API or local validation error */}
    {(error || localError) && (
      <div className="error-alert" role="alert"> 
        <strong className="font-bold">Error! </strong>
        <span className="error-message-text-block-sm-inline">{error || localError}</span>
      </div>
    )}

    <form onSubmit={handleSubmit} className="auth-form"> 
      {isRegister && (
        <div>
          <label htmlFor="username" className="form-label"> 
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input" 
            placeholder="Enter your username"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="form-label"> 
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="form-label"> 
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input" 
          placeholder="Enter your password"
          required
        />
      </div>

      {isRegister && (
        <div>
          <label htmlFor="confirmPassword" className="form-label"> 
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="Confirm your password"
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="submit-button" 
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
      </button>
    </form>
  </div>
);
};

export default AuthForm;
