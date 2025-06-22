// client/src/pages/LoginPage.js
import React from 'react';
import AuthForm from '../components/AuthForm'; // Reusable form
import { useAuth } from '../context/AuthContext'; 

const LoginPage = () => {
  const { login, loading, error } = useAuth();

  return (
    <div className="page-container">
      <AuthForm type="login" onSubmit={login} loading={loading} error={error} />
      {/* <AuthForm type="login" onSubmit="login" loading="loading" error="error" /> */}
    </div>
  );
};

export default LoginPage;
