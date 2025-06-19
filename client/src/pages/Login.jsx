import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="glass-container">
      <h2>FinTrack</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-input"
        />
        <label className="form-label">Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button center-button">Login</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#222' }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
