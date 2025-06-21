import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      padding: '1rem 2rem',
      backgroundColor: '#0077ff',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <h2>FinTrack</h2>
      <button style={{
        background: '#fff',
        color: '#0077ff',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        border: 'none'
      }}>Logout</button>
    </nav>
  );
}
