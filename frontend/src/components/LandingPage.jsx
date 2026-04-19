import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeeting, joinMeeting } from '../utils/api';
import { CheckCircle, PiggyBank, Lightbulb, Zap } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [meetingId, setMeetingId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const duration = 30; // Defaulting duration as per new UI

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

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <h2>SeeU</h2>
        </div>
        <div className="nav-links">
          <a href="#" className="active">Meetings</a>
          <a href="#">Recordings</a>
          <a href="#">Schedule</a>
        </div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={handleCreate} disabled={isJoining}>New Meeting</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <h1 className="hero-title">
          <span className="brand-highlight">SeeU</span> — Meet Instantly, Talk Seamlessly
        </h1>

        {error && <div className="error-alert">{error}</div>}

        <div className="hero-actions">
          <button className="primary-hero-btn" onClick={handleCreate} disabled={isJoining}>
            New Meeting
          </button>

          <div className="join-input-group">
            <input 
              type="text" 
              placeholder="Enter meeting code" 
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') handleJoin() }}
            />
            <button className="join-btn" onClick={handleJoin} disabled={isJoining || !meetingId}>
              Join
            </button>
          </div>
        </div>

        <div className="hero-badges">
          <span><CheckCircle size={16} /> HD Video</span>
          <span><CheckCircle size={16} /> End-to-end Encrypted</span>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2>Why Video Conferencing?</h2>
          <p>Elevate your digital interactions with tools designed for clarity and focus.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card bg-blue">
            <div className="icon-wrapper circle-blue">
              <PiggyBank className="icon-orange" size={24} />
            </div>
            <h3>No infra or travel costs</h3>
            <p>Save on operational overhead by moving your headquarters to the cloud. Connect globally without the carbon footprint.</p>
          </div>

          <div className="feature-card bg-yellow">
            <div className="icon-wrapper circle-yellow">
              <Lightbulb className="icon-brown" size={24} />
            </div>
            <h3>Help ideas take shape</h3>
            <p>Visual cues and real-time collaboration help your team innovate faster and with more clarity than ever before.</p>
          </div>

          <div className="feature-card bg-orange">
             <div className="icon-wrapper circle-orange">
              <Zap className="icon-brown" size={24} />
            </div>
            <h3>Get started instantly</h3>
            <p>No complex onboarding. Send a link, click to join, and start talking. It's that simple, by design.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
