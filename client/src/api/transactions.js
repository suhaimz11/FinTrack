const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchTransactions() {
  const token = localStorage.getItem('token');
  console.log("Using token in fetchTransactions:", token);

  const res = await fetch(`${API_BASE_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return await res.json();
}

export async function addTransaction(transaction) {
  const token = localStorage.getItem('token');
  console.log("Using token in addTransaction:", token);

  const res = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(transaction)
  });

  if (!res.ok) {
    throw new Error('Failed to add transaction');
  }

  return await res.json();
}

export async function deleteTransaction(id) {
  const token = localStorage.getItem('token');
  console.log("Using token in deleteTransaction:", token);

  const res = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to delete transaction');
  }

  return true;
}

export async function updateTransaction(id, data) {
  const token = localStorage.getItem('token');
  console.log("Using token in updateTransaction:", token);

  const res = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Failed to update transaction');
  }

  return await res.json();
}
