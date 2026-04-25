import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeeting, joinMeeting } from '../utils/api';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [meetingId, setMeetingId] = useState('');
  const [duration, setDuration] = useState(30);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    setIsJoining(true);
    setError('');
    try {
      const { meetingId: newMeetingId } = await createMeeting();
      navigate(`/room/${newMeetingId}`, { state: { duration } });
    } catch (err) {
      setError('Failed to create meeting');
    } finally {
      setIsJoining(false);
    }
  };

  const handleJoin = async () => {
    if (!meetingId) {
      setError('Please enter a meeting ID');
      return;
    }
    
    setIsJoining(true);
    setError('');
    try {
      const response = await joinMeeting(meetingId);
      if (response.success) {
        navigate(`/room/${meetingId}`, { state: { duration } });
      } else {
        setError('Invalid Meeting ID');
      }
    } catch (err) {
      setError('Failed to join meeting');
    } finally {
      setIsJoining(false);
    }
  };

  const durations = [5, 30, 60, 90];

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>SeeU Video Call</h1>
        <p className="subtitle">High Quality, Secure Meetings</p>

        {error && <div className="error-alert">{error}</div>}

        <div className="duration-selector">
          <h3>Select Session Duration (Minutes)</h3>
          <div className="duration-buttons">
            {durations.map((mins) => (
              <button
                key={mins}
                className={duration === mins ? 'selected' : ''}
                onClick={() => setDuration(mins)}
              >
                {mins}
              </button>
            ))}
          </div>
        </div>

        <div className="actions">
          <div className="create-section">
            <button 
              className="primary-btn" 
              onClick={handleCreate} 
              disabled={isJoining}
            >
              Start New Meeting
            </button>
          </div>

          <div className="divider"><span>OR</span></div>

          <div className="join-section">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
            />
            <button 
              className="secondary-btn" 
              onClick={handleJoin} 
              disabled={isJoining || !meetingId}
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
