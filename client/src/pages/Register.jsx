import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';  
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!', { autoClose: 2000 });
      return;
    }

    try {
      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Registration successful!', { autoClose: 2000 });
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed', { autoClose: 3000 });
    }
  };

  return (
    <div className="glass-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Password:</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="form-input"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0px',
              top: '40%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <label className="form-label">Confirm Password:</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: 'absolute',
              right: '0px',
              top: '40%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          >
            {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button type="submit" className="form-button center-button">Register</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#222' }}>
        Already have an account? <Link to="/">Login</Link> 
      </p>

      <ToastContainer />
    </div>
  );
}
