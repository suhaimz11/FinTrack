import React from 'react';

export default function TransactionTable() {
  return (
    <div style={{
      background: '#fff',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflowX: 'auto'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Title</th>
            <th style={cellStyle}>Category</th>
            <th style={cellStyle}>Type</th>
            <th style={cellStyle}>Amount</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>--</td>
            <td style={cellStyle}>--</td>
            <td style={cellStyle}>--</td>
            <td style={cellStyle}>--</td>
            <td style={cellStyle}>--</td>
            <td style={cellStyle}>--</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  textAlign: 'left'
};
