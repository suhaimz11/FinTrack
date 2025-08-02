import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PieChart from '../components/PieChart';
import TransactionTable from '../components/TransactionTable';
import AddTransactionModal from '../components/AddTransactionModal';
import LineChart from '../components/LineChart';
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from '../api/transactions.js';

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalBalance, setTotalBalance] = useState(0);
  const [expenseThisMonth, setExpenseThisMonth] = useState(0);
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [expenseHistory, setExpenseHistory] = useState([]);

  // YYYY-MM format for month selector
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
  });

  // Load all transactions once
  useEffect(() => {
    loadTransactions();
  }, []);

  // Whenever transactions change, recalc histories
  useEffect(() => {
    if (!transactions.length) return;

    // 1) Total balance
    const income = transactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
    const expense = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
    setTotalBalance(income - expense);

    // 2) Expense for selected month
    const monthExpense = transactions
      .filter(
        (tx) =>
          tx.type === 'expense' &&
          tx.date.startsWith(selectedMonth) // assumes ISO date: "YYYY-MM-DD"
      )
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
    setExpenseThisMonth(monthExpense);

    // 3) Build monthly aggregates for history charts
    const monthlyData = {};
    transactions.forEach((tx) => {
      const monthKey = tx.date.slice(0, 7); // "YYYY-MM"
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      monthlyData[monthKey][tx.type] += parseFloat(tx.amount);
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    setBalanceHistory(
      sortedMonths.map((m) => ({
        date: monthNames[parseInt(m.split('-')[1], 10) - 1],
        balance:
          monthlyData[m].income - monthlyData[m].expense,
      }))
    );
    setExpenseHistory(
      sortedMonths.map((m) => ({
        date: monthNames[parseInt(m.split('-')[1], 10) - 1],
        balance: monthlyData[m].expense,
      }))
    );
  }, [transactions, selectedMonth]);

  // Fetch & refresh helper
  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      alert('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (formData) => {
    try {
      await addTransaction(formData);
      setShowModal(false);
      loadTransactions();
    } catch {
      alert('Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch {
      alert('Failed to delete transaction');
    }
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
        <div style={{ flexShrink: 0 }}>
          <Navbar />
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Real-time Total Balance */}
            <div style={glassCardStyle}>
              <span style={{ fontSize: '1.5rem' }}>Balance:</span>{' '}
              ₹{totalBalance.toFixed(2)}
              <LineChart dataPoints={balanceHistory} />
            </div>

            {/* Real-time Expense This Month */}
            <div style={glassCardStyle}>
              <span style={{ fontSize: '1.5rem' }}>
                Expenses ({monthNames[parseInt(selectedMonth.split('-')[1], 10) - 1]}):
              </span>{' '}
              ₹{expenseThisMonth.toFixed(2)}
              <LineChart dataPoints={expenseHistory} />
            </div>
          </div>

          <div
            style={{
              ...glassCardStyle,
              display: 'flex',
              gap: '2rem',
              padding: '1.5rem',
              flexWrap: 'wrap',
              margin: '2rem 0',
            }}
          >
            <div style={{ flex: '2 1 600px', minWidth: '300px' }}>
              <h3 style={{ marginBottom: '1rem' }}>
                Transaction History
              </h3>
              <TransactionTable
                transactions={transactions}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                onDelete={handleDeleteTransaction}
              />
            </div>

            <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <h3 style={{ marginBottom: '1rem' }}>
                Expense Breakdown
              </h3>
              <PieChart
                transactions={transactions}
                selectedMonth={monthNames[
                  parseInt(selectedMonth.split('-')[1], 10) - 1
                ]}
                selectedYear={parseInt(
                  selectedMonth.split('-')[0],
                  10
                )}
              />
            </div>
          </div>

          <button
            className="floating-add-btn"
            onClick={() => setShowModal(true)}
          >
            <span className="plus-symbol">+</span>
            <span className="add-text">+ Add Transaction</span>
          </button>

          {showModal && (
            <AddTransactionModal
              onClose={() => setShowModal(false)}
              onSubmit={handleAddTransaction}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// move this outside of the component
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
