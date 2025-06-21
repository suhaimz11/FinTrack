import React from 'react';

export default function AddTransactionModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '400px'
      }}>
        <h3>Add Transaction</h3>
        <p>[ Form goes here ]</p>
        <button onClick={onClose} style={{ marginTop: '1rem' }}>Close</button>
      </div>
    </div>
  );
}
