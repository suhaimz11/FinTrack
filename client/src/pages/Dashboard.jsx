import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PieChart from '../components/PieChart';
import TransactionTable from '../components/TransactionTable';
import AddTransactionModal from '../components/AddTransactionModal';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    // Fullscreen background with 0.5 inch padding
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to bottom right, #dbefff, #b7dfff)',
        overflow: 'hidden',
        padding: '0.5in',
        boxSizing: 'border-box',
      }}
    >
      {/* Glass container with internal scroll */}
      <div
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // important to hide outer scroll
        }}
      >
        {/* Scrollable inner content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            borderRadius: 'inherit',
          }}
        >
          <Navbar />

          {/* Overview Cards */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <div className="overview-card">💰 Total Balance: ₹0</div>
            <div className="overview-card">⬆️ Income: ₹0</div>
            <div className="overview-card">⬇️ Expenses: ₹0</div>
          </div>

          {/* Pie Chart */}
          <div style={{ margin: '2rem 0' }}>
            <h3>Expense Breakdown</h3>
            <PieChart />
          </div>

          {/* Transactions Table */}
          <div style={{ margin: '2rem 0' }}>
            <h3>Transaction History</h3>
            <TransactionTable />
          </div>

          {/* Add Transaction Button */}
          <button
            style={{
              padding: '10px 20px',
              background: '#0077ff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'block',
              margin: '2rem auto',
            }}
            onClick={() => setShowModal(true)}
          >
            + Add Transaction
          </button>

          {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
        </div>
      </div>
    </div>
  );
}
