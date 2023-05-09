import { useState } from "react";

import { URI, cameraStatus, statusTelephotoCmd } from "@/lib/dwarf_api";

export default function CameraStatus() {
  const [cameraStatusData, setCameraStatusData] = useState<any>(null);

  function getCameraStatus() {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      cameraStatus(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === statusTelephotoCmd) {
        setCameraStatusData(message);
      }
      console.log("ok", message);
    });

    socket.addEventListener("error", (message) => {
      setCameraStatusData(message);

      console.log("err", message);
    });
  }

  return (
    <>
      <h2>Telephoto camera status</h2>
      <button className="btn btn-primary" onClick={getCameraStatus}>
        Get Status
      </button>
      {cameraStatusData && (
        <pre>{JSON.stringify(cameraStatusData, null, 2)}</pre>
      )}
    </>
  );
}
