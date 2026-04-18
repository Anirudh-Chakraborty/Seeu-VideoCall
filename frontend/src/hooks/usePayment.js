import { useState } from 'react';
import { createOrder, verifyPayment } from '../utils/api';
import { RAZORPAY_KEY_ID } from '../utils/constants';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async (amount, onSuccess) => {
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create order on the backend
      const { order } = await createOrder(amount);

      // 2. Initialize Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SeeU Video Call',
        description: 'Time extension',
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on the backend
            const verification = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            if (verification.success) {
              onSuccess();
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError(err.message || 'Payment verification error');
          }
        },
        prefill: {
          name: 'SeeU User',
          email: 'user@seeu.test',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError(response.error.description);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || 'Failed to initiate payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return { initiatePayment, isProcessing, error };
};
