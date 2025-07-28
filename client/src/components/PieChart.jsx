import React, { useMemo } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F', '#AA66CC', '#FF4444'];

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export default function PieChart({ transactions, selectedMonth, selectedYear }) {
  // Filter & aggregate expenses by category based on selected month & year
  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const monthIndex = monthNames.indexOf(selectedMonth);
    if (monthIndex === -1) return [];

    // Filter only expenses for selected month & year
    const filtered = transactions.filter(txn => {
      const date = new Date(txn.date);
      return (
        txn.type === 'expense' &&
        date.getFullYear() === selectedYear &&
        date.getMonth() === monthIndex
      );
    });

    // Aggregate amounts by category
    const categoryMap = {};
    filtered.forEach(txn => {
      if (txn.category) {
        categoryMap[txn.category] = (categoryMap[txn.category] || 0) + txn.amount;
      }
    });

    // Transform into array for recharts
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [transactions, selectedMonth, selectedYear]);

  // Calculate total & highest category
  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);
  const highestCategory = data.reduce(
    (max, item) => (item.value > max.value ? item : max),
    { name: '', value: 0 }
  );

  return (
    <div>
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
        <div>Total Expense: ₹{totalExpense.toFixed(2)}</div>
        <div>
          Highest Spent On: {highestCategory.name || 'N/A'} (₹{highestCategory.value.toFixed(2)})
        </div>
      </div>
    </div>
  );
}
