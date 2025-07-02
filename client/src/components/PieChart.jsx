import React, { useState } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
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
            cursor: 'pointer'
          }}
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
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
    </div>
  );
}
