import React from 'react';
import '../styles/PaywallOverlay.css';

const PaywallOverlay = ({ onPayClick }) => {
  return (
    <div className="paywall-overlay">
      <div className="paywall-content">
        <div className="time-up-icon">⏱️</div>
        <h2>Time's Up!</h2>
        <p>Your session duration has expired.</p>
        <p>To continue the video call, please extend your time.</p>
        
        <button className="extend-button" onClick={onPayClick}>
          Extend Session
        </button>
      </div>
    </div>
  );
};

export default PaywallOverlay;
