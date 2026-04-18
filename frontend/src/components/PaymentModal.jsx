import React from 'react';
import { usePayment } from '../hooks/usePayment';
import '../styles/PaymentModal.css';

const PaymentModal = ({ onClose, onSuccess }) => {
  const { initiatePayment, isProcessing, error } = usePayment();

  const handlePay = (amount) => {
    initiatePayment(amount, () => {
      onSuccess(amount);
      onClose();
    });
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Extend Your Session</h2>
        <p>Choose an option to extend your SeeU session time.</p>
        
        {error && <div className="error-message">{error}</div>}

        <div className="payment-options">
          <button 
            disabled={isProcessing} 
            onClick={() => handlePay(50)}
          >
            + 30 minutes (₹50)
          </button>
          <button 
            disabled={isProcessing} 
            onClick={() => handlePay(100)}
          >
            + 60 minutes (₹100)
          </button>
        </div>

        <button className="close-button" onClick={onClose} disabled={isProcessing}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
