import React, { useEffect, useState } from 'react';
import { fetchTransactions, deleteTransaction, updateTransaction } from '../api/transactions'; // add updateTransaction api

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', amount: '', category: '', type: '', date: '' });

  const getData = async () => {
    try {
      const data = await fetchTransactions();
      data.reverse(); // latest first
      setTransactions(data);

      const uniqueMonths = Array.from(new Set(
        data.map(txn => {
          const d = new Date(txn.date);
          return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
        })
      )).sort((a, b) => b.localeCompare(a));

      setMonths(uniqueMonths);

      if (uniqueMonths.length > 0) {
        setSelectedMonth(uniqueMonths[0]);
        setFilteredTransactions(
          data.filter(txn => {
            const d = new Date(txn.date);
            const monthStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
            return monthStr === uniqueMonths[0];
          })
        );
      } else {
        setFilteredTransactions(data);
      }
    } catch (err) {
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        setTransactions(prev => prev.filter(tx => tx._id !== id));
        setFilteredTransactions(prev => prev.filter(tx => tx._id !== id));
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  // Start editing a transaction
  const startEdit = (txn) => {
    setEditingId(txn._id);
    setEditFormData({
      title: txn.title || '',
      amount: txn.amount || '',
      category: txn.category || '',
      type: txn.type || 'expense',
      date: txn.date ? new Date(txn.date).toISOString().slice(0, 10) : '',
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Handle input change for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated transaction
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your update API (you need to implement this in api/transactions.js and backend)
      await updateTransaction(editingId, editFormData);

      // Refresh transactions
      await getData();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update transaction:', err);
    }
  };

  // Handle month dropdown change
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    setFilteredTransactions(
      transactions.filter(txn => {
        const d = new Date(txn.date);
        const monthStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
        return monthStr === month;
      })
    );
  };

  if (loading) return <p>Loading...</p>;
  if (transactions.length === 0) return <p>No transactions found.</p>;

  return (
    <div>
      <label style={{ marginBottom: '10px', display: 'block', fontWeight: '600' }}>
        Filter by Month:{' '}
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map(month => (
            <option key={month} value={month}>
              {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>
      </label>

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
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No transactions found for this month.
              </td>
            </tr>
          ) : (
            filteredTransactions.map(txn => (
              <tr key={txn._id} style={styles.tr}>
                {editingId === txn._id ? (
                  <>
                    <td style={styles.td}>
                      <input
                        type="date"
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        name="category"
                        value={editFormData.category}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="number"
                        name="amount"
                        value={editFormData.amount}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td style={styles.td}>
                      <select name="type" value={editFormData.type} onChange={handleEditChange}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </td>
                    <td style={styles.td}>
                      <button onClick={handleEditSubmit} style={styles.saveButton}>Save</button>
                      <button onClick={cancelEdit} style={styles.cancelButton}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{new Date(txn.date).toLocaleDateString()}</td>
                    <td style={styles.td}>{txn.category}</td>
                    <td
                      style={{
                        ...styles.td,
                        color: txn.type === 'expense' ? 'red' : 'green',
                        fontWeight: '600',
                      }}
                    >
                      ₹{txn.amount}
                    </td>
                    <td style={styles.td}>{txn.type}</td>
                    <td style={styles.td}>
                      <button onClick={() => startEdit(txn)} style={styles.editButton}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(txn._id)} style={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
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
  saveButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '8px',
    background: 'rgba(0, 200, 0, 0.4)',
    color: '#000',
    cursor: 'pointer',
    fontWeight: '600',
    marginRight: '6px',
  },
  cancelButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '8px',
    background: 'rgba(200, 0, 0, 0.4)',
    color: '#000',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
