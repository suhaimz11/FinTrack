import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      toast.success('✅ Welcome back!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // wait for toast to finish
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', {
        position: 'top-right',
        autoClose: 3000,
      });
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
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />

        <label className="form-label">Password:</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0px',
              top: '40%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button type="submit" className="form-button center-button">
          Login
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#222' }}>
        Don't have an account? <a href="/register">Register</a>
      </p>

      {/* Toast messages */}
      <ToastContainer />
    </div>
  );
}
