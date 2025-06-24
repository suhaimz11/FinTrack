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
        {/* Static Navbar at top */}
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
          {/* Balance and Expense This Month Section */}
<div style={{
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem',
  flexWrap: 'wrap',
}}>
  {/* Balance Card */}
  <div style={{
  flex: 1,
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: '#000',
  fontWeight: '600',
  fontSize: '1.2rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}}>
   <span style={{ fontSize: '1.5rem' }}>Balance:</span> ₹2400

  <LineChart dataPoints={balanceHistory} />
</div>


  {/* Expense Card */}
  <div style={{
  flex: 1,
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: '#000',
  fontWeight: '600',
  fontSize: '1.2rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}}>
   <span style={{ fontSize: '1.5rem' }}>Expenses This Month:</span> ₹620

  <LineChart
    dataPoints={expenseHistory.map(item => ({
      date: item.date,
      balance: item.expense // reusing "balance" field name to work with LineChart
    }))}
  />
</div>

</div>


          {/* Pie Chart */}
          <div style={{ margin: '2rem 0' }}>
            <h3>Expense Breakdown</h3>
            <PieChart />
          </div>

          {/* Transaction Table */}
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
