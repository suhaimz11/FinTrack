import React from 'react';

export default function FinTrackLogo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <circle cx="32" cy="32" r="30" stroke="#1e90ff" strokeWidth="4" fill="white" />
      <polyline
        points="16 40 28 28 38 38 48 20"
        stroke="#1e90ff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="20" r="3" fill="#ffc800" />
    </svg>
  );
}
