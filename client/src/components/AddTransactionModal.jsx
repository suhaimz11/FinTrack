import React, { useState } from 'react';

export default function AddTransactionModal({ onClose, onSubmit }) {
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!details || !amount || !category || !date) {
      alert('Please fill in all required fields');
      return;
    }

    const transactionData = {
      details,
      amount: parseFloat(amount),
      category,
      type,
      date,
    };

    if (onSubmit) onSubmit(transactionData);
    onClose();
  }

  const categories = [
    'Food',
    'Transport',
    'Rent',
    'Entertainment',
    'Salary',
    'Shopping',
    'Utilities',
    'Healthcare',
    'Other',
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          color: '#000',
          fontWeight: '600',
        }}
      >
        <h3 style={{ margin: 0, marginBottom: '1rem', textAlign: 'center' }}>Add Transaction</h3>

        <label>
          Details*:
          <input
            type="text"
            value={details}
            onChange={e => setDetails(e.target.value)}
            required
            placeholder="e.g. Bought groceries from Walmart"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Amount*:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Category*:
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          Type*:
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Date*:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#eee',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: '#0077ff',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
