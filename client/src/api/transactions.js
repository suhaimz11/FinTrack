// src/api/transactions.js

const API_BASE_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

export async function fetchTransactions() {
  const res = await fetch(`${API_BASE_URL}/transactions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return await res.json();
}

export async function addTransaction(transaction) {
  const res = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(transaction)
  });
  if (!res.ok) throw new Error('Failed to add transaction');
  return await res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete transaction');
  return true;
}
