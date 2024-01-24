import React from 'react';

const spinnerStyle = {
  border: '5px solid #f3f3f3', /* Light grey */
  borderTop: '5px solid #3498db', /* Blue */
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 2s linear infinite'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
};

const LoadingSpinner = () => {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
    </div>
  );
};

export default LoadingSpinner;