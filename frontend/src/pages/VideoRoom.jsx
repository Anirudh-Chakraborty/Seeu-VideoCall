import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Users, MessageSquare } from "lucide-react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoRoom() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let zp;

    const myMeeting = async (element) => {
      try {
        const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID, 10);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

        // Note: For production, token generation should happen securely on the backend
        // We use generateKitTokenForTest for quick integration using the updated env vars
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID, 
          serverSecret, 
          meetingId, 
          Date.now().toString(), 
          "User_" + Date.now().toString().slice(8)
        );

        zp = ZegoUIKitPrebuilt.create(kitToken);
        
        zp.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: 'Meeting link',
              url: window.location.origin + window.location.pathname,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Standard group call style
          },
          showPreJoinView: false, // Jump right in since we have a nice landing page
          onJoinRoom: () => {
             setLoading(false);
          },
          onLeaveRoom: () => {
            navigate('/');
          }
        });
        
        // Safety timeout to disable loader if onJoinRoom delays
        setTimeout(() => setLoading(false), 2000);
      } catch (err) {
        console.error("ZegoCloud initialization failed:", err);
      }
    };

    if (containerRef.current) {
      // Create a clean container for React Strict Mode to avoid duplicate join attempts
      containerRef.current.innerHTML = '';
      myMeeting(containerRef.current);
    }

    return () => {
      // Attempt cleanup of Zego instance when component unmounts
      if (zp && typeof zp.destroy === 'function') {
         zp.destroy();
      }
    }
  }, [meetingId, navigate]);

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-slate-900 border-b border-slate-800 text-slate-200 shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            SeeU Workspace
          </div>
          <div className="px-3 py-1 rounded-md bg-slate-800 text-xs text-slate-400 font-mono">
            ID: {meetingId}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Users className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 relative overflow-hidden bg-black flex items-center justify-center p-0">
         {loading && (
           <div className="absolute inset-0 z-10 bg-black flex flex-col items-center justify-center text-slate-400">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
             Connecting to ZEGOCLOUD Secure Environment...
           </div>
         )}
         
         {/* ZegoCloud UIKit injects its dynamic iframe and canvas here */}
         <div 
           ref={containerRef} 
           className="w-full h-full z-20" 
         />
      </main>
      
      {/* We removed the custom footer because ZegoCloud automatically provides an excellent 
          toolbar covering video, mic, screenshare, chat, and leave call features natively. */}
    </div>
  );
}
