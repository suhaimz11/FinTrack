import React from 'react';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome Back, User</h2>
        <button className="logout-button">Logout</button>
      </header>

      <section className="summary-section">
        <div className="summary-card income">
          <h3>Income</h3>
          <p>$2,400</p>
        </div>
        <div className="summary-card expense">
          <h3>Expense</h3>
          <p>$1,200</p>
        </div>
        <div className="summary-card total">
          <h3>Total</h3>
          <p>$1,300</p>
        </div>
      </section>

      <section className="transactions-section">
        <h3>Recent Transactions</h3>
        <ul className="transaction-list">
          <li>🍕 Pizza - $20</li>
          <li>💼 Salary - $2,500</li>
          <li>🚌 Transport - $50</li>
        </ul>
      </section>

      <button className="add-button">+ Add Transaction</button>
    </div>
  );
}
