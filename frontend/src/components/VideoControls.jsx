import React from 'react';
import { Mic, MicOff, Video, VideoOff, MonitorUp } from 'lucide-react';

const VideoControls = ({
  isMuted,
  isVideoOff,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onLeave
}) => {
  return (
    <div className="video-controls" style={{
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#1f2937',
      borderRadius: '50px',
      position: 'absolute',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <button
        onClick={onToggleMute}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isMuted ? '#ef4444' : '#374151',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      
      <button
        onClick={onToggleVideo}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isVideoOff ? '#ef4444' : '#374151',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
      </button>

      <button
        onClick={onToggleScreenShare}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isScreenSharing ? '#3b82f6' : '#374151',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        <MonitorUp size={24} />
      </button>

      <button
        onClick={onLeave}
        style={{
          padding: '0 25px',
          height: '50px',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: '#ef4444',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}
      >
        Leave Call
      </button>
    </div>
  );
};

export default VideoControls;
