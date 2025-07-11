import React, { useState } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F', '#AA66CC', '#FF4444'];

const dummyData = {
  Jan: [
    { name: 'Food', value: 400 },
    { name: 'Rent', value: 800 },
    { name: 'Transport', value: 300 },
  ],
  Feb: [
    { name: 'Food', value: 300 },
    { name: 'Rent', value: 1000 },
    { name: 'Transport', value: 250 },
    { name: 'Shopping', value: 150 },
  ],
  Mar: [
    { name: 'Food', value: 450 },
    { name: 'Rent', value: 900 },
    { name: 'Bills', value: 200 },
    { name: 'Others', value: 100 },
  ],
};

const months = Object.keys(dummyData);

export default function ExpensePieChart() {
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const data = dummyData[selectedMonth] || [];

  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);
  const highestCategory = data.reduce((max, item) =>
    item.value > max.value ? item : max, { name: '', value: 0 });

  return (
    <div>
      {/* Dropdown */}
      <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
        <label style={{ marginRight: '0.5rem' }}>Select Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Pie Chart */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RePieChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Summary */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: '#000',
          fontWeight: '600',
        }}
      >
        <div>Total Expense: ₹{totalExpense}</div>
        <div>Highest Spent On: {highestCategory.name} (₹{highestCategory.value})</div>
      </div>
    </div>
  );
}
