import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialDurationMinutes, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialDurationMinutes * 60);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(initialDurationMinutes * 60);
    setIsExpired(false);
  }, [initialDurationMinutes]);

  useEffect(() => {
    if (timeLeft <= 0 && !isExpired) {
      setIsExpired(true);
      if (onExpire) onExpire();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeLeft, isExpired, onExpire]);

  const addTime = (minutes) => {
    setTimeLeft((prev) => prev + minutes * 60);
    setIsExpired(false);
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return { timeLeft, isExpired, addTime, formatTime };
};
