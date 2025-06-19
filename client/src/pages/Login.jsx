import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login logic (replace with real auth later)
    if (email && password) {
      console.log('Login with:', { email, password });
      alert('Login submitted!');
      navigate('/dashboard'); // ✅ Redirect to dashboard
    } else {
      alert('Please enter valid credentials.');
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
