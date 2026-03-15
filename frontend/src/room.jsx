import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function Room() {

  const { id } = useParams();
  const jitsiContainerRef = useRef(null);

  useEffect(() => {

    const loadJitsi = () => {

      const domain = "meet.jit.si";

      const options = {
        roomName: id,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
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
      <div ref={jitsiContainerRef} style={{ height: "100%" }} />
    </div>
  );
}

export default Room;