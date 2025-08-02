import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUsername(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });

    // Redirect after toast shows
    setTimeout(() => {
      navigate('/'); // Redirect to login route
    }, 2000);
  };

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        background: 'rgba(91, 192, 235, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>FinTrack</h2>
        {username && (
          <p style={{ marginTop: '4px', fontSize: '14px' }}>Hi, {username} 👋</p>
        )}
      </div>

      <button
        style={{
          padding: '8px 16px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.3)',
          color: '#000',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          fontWeight: '500',
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 15px rgba(0, 119, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
