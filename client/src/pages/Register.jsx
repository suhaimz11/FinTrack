import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    console.log('Register with:', { email, password });
    alert('Registration submitted!');
  };

  return (
    <div className="glass-container">
      <h2>Register</h2>
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

        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          required
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="form-button center-button">Register</button>
      </form>
    </div>
  );
}
