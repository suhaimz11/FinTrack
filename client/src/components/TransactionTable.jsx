import React, { useState } from 'react';

const dummyTransactions = {
  Jan: [
    { id: 1, date: '2025-01-03', description: 'Groceries', amount: -120 },
    { id: 2, date: '2025-01-05', description: 'Salary', amount: 1500 },
    { id: 3, date: '2025-01-10', description: 'Internet Bill', amount: -60 },
    { id: 4, date: '2025-01-11', description: 'Dining', amount: -90 },
    { id: 5, date: '2025-01-14', description: 'Fuel', amount: -70 },
    { id: 6, date: '2025-01-15', description: 'Clothing', amount: -150 },
    { id: 7, date: '2025-01-20', description: 'Freelance', amount: 500 },
    { id: 8, date: '2025-01-22', description: 'Gym', amount: -45 },
    { id: 9, date: '2025-01-25', description: 'Rent', amount: -600 },
    { id: 10, date: '2025-01-28', description: 'Snacks', amount: -30 },
    { id: 11, date: '2025-01-30', description: 'Medical', amount: -80 },
  ],
  Feb: [
    { id: 12, date: '2025-02-02', description: 'Groceries', amount: -100 },
    { id: 13, date: '2025-02-05', description: 'Salary', amount: 1500 },
    { id: 14, date: '2025-02-08', description: 'Dining', amount: -85 },
    { id: 15, date: '2025-02-10', description: 'Electricity', amount: -70 },
    { id: 16, date: '2025-02-12', description: 'Travel', amount: -200 },
    { id: 17, date: '2025-02-14', description: 'Snacks', amount: -20 },
    { id: 18, date: '2025-02-16', description: 'Fuel', amount: -60 },
    { id: 19, date: '2025-02-19', description: 'Shopping', amount: -150 },
  ]
};

const months = Object.keys(dummyTransactions);

export default function TransactionTable() {
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [showFull, setShowFull] = useState(false);

  const transactions = dummyTransactions[selectedMonth] || [];
  const visibleTransactions = showFull ? transactions : transactions.slice(0, 10);

  const handleEdit = (id) => {
    alert(`Edit transaction with id: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      alert(`Deleted transaction with id: ${id}`);
    }
  };

  return (
    <div>
      {/* Dropdown */}
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Select Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setShowFull(false); // reset view when month changes
          }}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.theadTr}>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.map((txn) => (
            <tr key={txn.id} style={styles.tr}>
              <td style={styles.td}>{txn.date}</td>
              <td style={styles.td}>{txn.description}</td>
              <td
                style={{
                  ...styles.td,
                  color: txn.amount < 0 ? 'red' : 'green',
                  fontWeight: '600',
                }}
              >
                ₹{Math.abs(txn.amount)}
              </td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(txn.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(txn.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expand Button */}
      {transactions.length > 10 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setShowFull(!showFull)}
            style={styles.expandButton}
          >
            {showFull ? 'Show Less' : 'View Full Table'}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '12px',
    overflow: 'hidden',
    color: '#000',
    fontSize: '14px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  theadTr: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'left',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
  },
  th: {
    padding: '12px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tr: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  td: {
    padding: '12px 16px',
    verticalAlign: 'middle',
  },
  editButton: {
    marginRight: '8px',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '8px',
    background: 'rgba(0, 119, 255, 0.3)',
    color: '#000',
    cursor: 'pointer',
    fontWeight: '600',
    backdropFilter: 'blur(6px)',
    transition: 'background 0.3s ease',
  },
  deleteButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '8px',
    background: 'rgba(255, 0, 0, 0.25)',
    color: '#000',
    cursor: 'pointer',
    fontWeight: '600',
    backdropFilter: 'blur(6px)',
    transition: 'background 0.3s ease',
  },
  expandButton: {
    padding: '8px 20px',
    borderRadius: '999px',
    background: 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
  },
};
