import React from 'react';

const Timer = ({ formattedTime, isWarn }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '30px',
      left: '30px',
      backgroundColor: isWarn ? '#ef4444' : 'rgba(0,0,0,0.6)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      zIndex: 100,
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {formattedTime}
    </div>
  );
};

export default Timer;
