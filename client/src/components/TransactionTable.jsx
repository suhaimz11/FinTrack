import React, { useEffect, useState } from 'react';
import { fetchTransactions, deleteTransaction } from '../api/transactions';

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data.reverse()); // optional: show latest first
    } catch (err) {
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        setTransactions(prev => prev.filter(tx => tx._id !== id));
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (transactions.length === 0) return <p>No transactions found.</p>;

  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.theadTr}>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Category</th>
          <th style={styles.th}>Amount</th>
          <th style={styles.th}>Type</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(txn => (
          <tr key={txn._id} style={styles.tr}>
            <td style={styles.td}>{new Date(txn.date).toLocaleDateString()}</td>
            <td style={styles.td}>{txn.category}</td>
            <td style={{ ...styles.td, color: txn.type === 'expense' ? 'red' : 'green', fontWeight: '600' }}>
              ₹{txn.amount}
            </td>
            <td style={styles.td}>{txn.type}</td>
            <td style={styles.td}>
              {/* No edit yet */}
              <button style={styles.deleteButton} onClick={() => handleDelete(txn._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Keep your same `styles` object from previous code


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
