import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>
        <a href="#" onClick={() => navigate('/login')}>Login</a>
      </h2>
      <h2>
        <a href="#" onClick={() => navigate('/register')}>Register</a>
      </h2>
    </div>
  );
}
