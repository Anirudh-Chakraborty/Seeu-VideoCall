import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useZegoCall } from '../hooks/useZegoCall';
import { useTimer } from '../hooks/useTimer';
import Timer from './Timer';
import VideoControls from './VideoControls';
import PaywallOverlay from './PaywallOverlay';
import PaymentModal from './PaymentModal';
import '../styles/VideoRoom.css';

const VideoRoom = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const duration = location.state?.duration || 30; // default 30 min

  // Use a pseudo-random user ID for demo purposes
  const userId = `user_${Math.floor(Math.random() * 100000)}`;
  const userName = `User ${userId.slice(-4)}`;

  const {
    localVideoRef,
    remoteVideoRef,
    isMuted,
    isVideoOff,
    isScreenSharing,
    error: callError,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    leaveRoom
  } = useZegoCall(meetingId, userId, userName);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Timer configuration
  const handleTimerExpire = () => {
    // Show paywall when timer runs out
  };

  const { timeLeft, isExpired, addTime, formatTime } = useTimer(duration, handleTimerExpire);
  
  const isWarn = timeLeft > 0 && timeLeft <= 300; // Warn when 5 mins or less left

  const handleLeave = () => {
    leaveRoom();
    navigate('/');
  };

  const handlePaymentSuccess = (amount) => {
    // 50 INR = 30 minutes, 100 INR = 60 minutes
    const extension = amount === 50 ? 30 : 60;
    addTime(extension);
  };

  if (callError) {
    return <div className="video-error">{callError}</div>;
  }

  return (
    <div className="video-room-container">
      {/* Local Video - PiP style */}
      <div className="local-video-container">
        <video ref={localVideoRef} autoPlay playsInline muted className="local-video" />
      </div>

      {/* Remote Video - Full screen background */}
      <div className="remote-video-container">
        <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
        {/* Placeholder if no remote user */}
        {!remoteVideoRef.current?.srcObject && (
          <div className="waiting-message">Waiting for others to join...</div>
        )}
      </div>

      {/* Timer overlay */}
      <Timer formattedTime={formatTime()} isWarn={isWarn} />

      {/* Controls */}
      <VideoControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onLeave={handleLeave}
      />

      {/* Paywall & Extensions */}
      {isExpired && !showPaymentModal && (
        <PaywallOverlay onPayClick={() => setShowPaymentModal(true)} />
      )}

      {showPaymentModal && (
        <PaymentModal 
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default VideoRoom;
