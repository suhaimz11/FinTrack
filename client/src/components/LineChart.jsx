import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart({ dataPoints }) {
  const data = {
    labels: dataPoints.map((item) => item.date),
    datasets: [
      {
        label: 'Balance Over Time',
        data: dataPoints.map((item) => item.balance),
        fill: true,
        backgroundColor: 'rgba(0, 119, 255, 0.1)',
        borderColor: '#0077ff',
        tension: 0.3,
        pointBackgroundColor: '#0077ff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ height: '200px', marginTop: '1rem' }}>
      <Line data={data} options={options} />
    </div>
  );
}
