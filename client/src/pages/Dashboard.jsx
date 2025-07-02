import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PieChart from '../components/PieChart';
import TransactionTable from '../components/TransactionTable';
import AddTransactionModal from '../components/AddTransactionModal';
import LineChart from '../components/LineChart';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const balanceHistory = [
    { date: 'Jan', balance: 1000 },
    { date: 'Feb', balance: 1200 },
    { date: 'Mar', balance: 900 },
    { date: 'Apr', balance: 1400 },
    { date: 'May', balance: 1100 },
  ];

  const expenseHistory = [
    { date: 'Jan', expense: 500 },
    { date: 'Feb', expense: 600 },
    { date: 'Mar', expense: 400 },
    { date: 'Apr', expense: 750 },
    { date: 'May', expense: 620 },
  ];

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#000',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    flex: 1,
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to bottom right, #eaf6ff, #d1e9ff)',
        padding: '0.5in',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Glass container */}
      <div
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Navbar */}
        <div style={{ flexShrink: 0 }}>
          <Navbar />
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Balance and Expense section */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Balance */}
            <div style={glassCardStyle}>
              <span style={{ fontSize: '1.5rem' }}>Balance:</span> ₹2400
              <LineChart dataPoints={balanceHistory} />
            </div>

            {/* Expense */}
            <div style={glassCardStyle}>
              <span style={{ fontSize: '1.5rem' }}>Expenses This Month:</span> ₹620
              <LineChart
                dataPoints={expenseHistory.map(item => ({
                  date: item.date,
                  balance: item.expense,
                }))}
              />
            </div>
          </div>

          {/* Transaction Table and Pie Chart side-by-side */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              margin: '2rem 0',
            }}
          >
            {/* Transaction Table */}
            <div style={glassCardStyle}>
              <h3 style={{ marginBottom: '1rem' }}>Transaction History</h3>
              <TransactionTable />
            </div>

            {/* Pie Chart */}
            <div style={glassCardStyle}>
              <h3 style={{ marginBottom: '1rem' }}>Expense Breakdown</h3>
              <PieChart />
            </div>
          </div>

          <button className="floating-add-btn" onClick={() => setShowModal(true)}>
            <span className="plus-sign">+</span>
            <span className="add-text">+ Add Transaction</span>
          </button>

          {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}






          
        </div>
      </div>
    </div>
  );
}
