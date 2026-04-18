import { useState, useRef, useEffect } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { getZegoToken } from '../utils/api';

export const useZegoCall = (roomId, userId, userName) => {
  const [zg, setZg] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Initialize ZegoEngine and join room
  useEffect(() => {
    let zegoEngine = null;

    const initZego = async () => {
      try {
        const { appID, token } = await getZegoToken(userId, roomId);

        zegoEngine = new ZegoExpressEngine(appID, 'wss://webdir.zego.im/ws');
        setZg(zegoEngine);

        // Room state update callback
        zegoEngine.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
          if (state === 'CONNECTED') {
            setIsJoined(true);
          } else if (state === 'DISCONNECTED') {
            setIsJoined(false);
          }
        });

        // Publisher stream update callback
        zegoEngine.on('publisherStateUpdate', (result) => {
          // Add logs or handle publisher states
        });

        // Player stream update callback
        zegoEngine.on('playerStateUpdate', (result) => {
            // Add logs or handle player states
        });

        zegoEngine.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
          if (updateType === 'ADD') {
            // Play remote stream
            const streamID = streamList[0].streamID;
            const targetStream = await zegoEngine.startPlayingStream(streamID);
            setRemoteStream(targetStream);
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = targetStream;
            }
          } else if (updateType === 'DELETE') {
            // Stop playing remote stream
            zegoEngine.stopPlayingStream(streamList[0].streamID);
            setRemoteStream(null);
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = null;
            }
          }
        });

        // Login to room
        await zegoEngine.loginRoom(roomId, token, { userID: userId, userName }, { userUpdate: true });

        // Create local stream and publish
        const lStream = await zegoEngine.createStream({ camera: { audio: true, video: true } });
        setLocalStream(lStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = lStream;
        }

        const streamID = `${roomId}_${userId}_main`;
        await zegoEngine.startPublishingStream(streamID, lStream);
      } catch (err) {
        console.error('Failed to init ZEGOCLOUD:', err);
        setError('Failed to initialize video call. Please check your connection and configuration.');
      }
    };

    if (roomId && userId) {
      initZego();
    }

    return () => {
      if (zegoEngine) {
        if (localStream) {
          zegoEngine.destroyStream(localStream);
        }
        zegoEngine.logoutRoom(roomId);
        setZg(null);
      }
    };
  }, [roomId, userId, userName]);

  // Controls
  const toggleMute = () => {
    if (zg && localStream) {
      zg.muteMicrophone(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (zg && localStream) {
      zg.mutePublishStreamVideo(localStream, !isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    if (!zg) return;
    try {
      if (isScreenSharing) {
        // Stop screen share and switch back to camera
        const newStream = await zg.createStream({ camera: { audio: true, video: true } });
        // Update the publisher with new stream (pseudo-impl for simplicity)
        zg.destroyStream(localStream);
        const streamID = `${roomId}_${userId}_main`;
        await zg.startPublishingStream(streamID, newStream);
        setLocalStream(newStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = newStream;
        }
        setIsScreenSharing(false);
        setIsMuted(false);
        setIsVideoOff(false);
      } else {
        // Start screen share
        const newStream = await zg.createStream({ screen: { audio: true, video: true } });
        zg.destroyStream(localStream);
        const streamID = `${roomId}_${userId}_main`;
        await zg.startPublishingStream(streamID, newStream);
        setLocalStream(newStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = newStream;
        }
        setIsScreenSharing(true);
      }
    } catch (err) {
      console.error('Failed to toggle screen share:', err);
    }
  };

  const leaveRoom = () => {
    if (zg) {
      if (localStream) {
        zg.destroyStream(localStream);
      }
      zg.logoutRoom(roomId);
    }
  };

  return {
    localVideoRef,
    remoteVideoRef,
    isMuted,
    isVideoOff,
    isScreenSharing,
    isJoined,
    error,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    leaveRoom
  };
};
