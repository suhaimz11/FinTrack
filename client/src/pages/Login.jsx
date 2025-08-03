import React, { useState, useEffect } from 'react';
import { login } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinTrackLogo from '../components/FinTrackLogo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state?.loggedOut) {
      toast.success('✅ Logged out successfully!', { autoClose: 2000 });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      toast.success('🎉 Welcome back!', { autoClose: 2000 });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { autoClose: 3000 });
    }
  };

  return (
    <div className="glass-container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '1.5rem',
        }}
      >
        <FinTrackLogo size={40} />
        <h2 style={{ margin: 0 }}>FinTrack</h2>
      </div>

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

      <ToastContainer />
    </div>
  );
}
