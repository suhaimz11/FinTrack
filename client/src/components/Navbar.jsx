import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUsername(userData.name);
    }
  }, []);

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        background: 'rgba(91, 192, 235, 0.45)',         // translucent background
        backdropFilter: 'blur(12px)',                    // glass blur effect
        WebkitBackdropFilter: 'blur(12px)',              // Safari support
        color: '#000',                                   // dark text for light background
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Left side: Logo + Greeting */}
      <div>
        <h2 style={{ margin: 0 }}>FinTrack</h2>
        {username && (
          <p style={{ marginTop: '4px', fontSize: '14px' }}>Hi, {username} 👋</p>
        )}
      </div>

      {/* Right side: Logout Button */}
      <button
        style={{
          padding: '8px 16px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.3)', // brighter static state
          color: '#000',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          fontWeight: '500',
          transform: 'scale(1.05)', // permanently slightly enlarged
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 15px rgba(0, 119, 255, 0.4)'; // subtle glow
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)'; // reset shadow
        }}
        onClick={() => {
          // Add logout logic here:
          alert('Logging out...');
          localStorage.clear();
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </nav>
  );
}
