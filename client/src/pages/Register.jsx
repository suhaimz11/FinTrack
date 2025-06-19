import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="glass-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="form-input"
        />

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

        <button type="submit" className="form-button center-button">Register</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#222' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
