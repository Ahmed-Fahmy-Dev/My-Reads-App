import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '54px', fontWeight: 'bold', color: 'red' }}>This page doesnt exist</p>
      <button onClick={() => navigate('/')}>Home Page</button>
    </div>
  );
};

export default ErrorPage;
