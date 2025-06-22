// client/src/pages/RegisterPage.js
import React from 'react';
import AuthForm from '../components/AuthForm'; // Reusable form
import { useAuth } from '../context/AuthContext'; 

const RegisterPage = () => {
  const { register, loading, error } = useAuth(); 

  return (
    <div className="page-container">
      {/* <AuthForm type="register" onSubmit="register" loading="loading" error="error" /> */}
      <AuthForm type="register" onSubmit={register} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;
