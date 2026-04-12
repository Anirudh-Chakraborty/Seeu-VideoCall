import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function Room() {

  const { id } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {

    const loadJitsi = () => {

      const domain = "8x8.vc";

      const options = {
        roomName: `${import.meta.env.VITE_APPID}/${id}`,
        width: "100%",
        height: "100%",
        parentNode: containerRef.current,

        configOverwrite: {
            prejoinPageEnabled: false,
            startWithAudioMuted: true,
            startWithVideoMuted: true,
        },

        interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false
    }
      };

      new window.JitsiMeetExternalAPI(domain, options);
    };

    if (!window.JitsiMeetExternalAPI) {

      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = loadJitsi;

      document.body.appendChild(script);

    } else {
      loadJitsi();
    }

  }, [id]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div ref={containerRef} style={{ height: "100%" }} />
    </div>
  );
}

export default Room;