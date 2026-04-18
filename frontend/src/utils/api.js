import { API_BASE_URL } from './constants';

export const getZegoToken = async (userId, roomId) => {
  const response = await fetch(`${API_BASE_URL}/meeting/zego-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, roomId }),
  });
  if (!response.ok) throw new Error('Failed to fetch ZEGOCLOUD token');
  return response.json();
};

export const createMeeting = async () => {
  const response = await fetch(`${API_BASE_URL}/meeting/create`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to create meeting');
  return response.json();
};

export const joinMeeting = async (meetingId) => {
  const response = await fetch(`${API_BASE_URL}/meeting/join/${meetingId}`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to join meeting');
  return response.json();
};

export const createOrder = async (amount, currency = 'INR') => {
  const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency }),
  });
  if (!response.ok) throw new Error('Failed to create order');
  return response.json();
};

export const verifyPayment = async (orderId, paymentId, signature) => {
  const response = await fetch(`${API_BASE_URL}/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    }),
  });
  if (!response.ok) throw new Error('Payment verification failed');
  return response.json();
};
