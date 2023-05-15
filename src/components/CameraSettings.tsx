import { useState, useContext, useEffect, useCallback } from "react";

import {
  wsURL,
  statusTelephotoCmd,
  queryShotFieldCmd,
  cameraSettings,
  queryShotField,
} from "@/lib/dwarf2_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { roundExposure } from "@/lib/math_utils";

export default function CameraStatus() {
  let connectionCtx = useContext(ConnectionContext);

  const [cameraSettingsData, setCameraStatusData] = useState<any>(null);
  const [shotFieldData, setShotFieldData] = useState<any>(null);

  const getCameraStatus = useCallback(() => {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start cameraSettings...");
      cameraSettings(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === statusTelephotoCmd) {
        setCameraStatusData(message);
        connectionCtx.setGain(message.gain);
        connectionCtx.setExposure(roundExposure(message.exp));
        connectionCtx.setIR(message.ir);

        connectionCtx.setBinning(connectionCtx.binning || 1);
      }
      console.log("cameraStatus:", message);
      getShotField();
    });

    socket.addEventListener("error", (message) => {
      setCameraStatusData(message);
      console.log("cameraStatus error:", message);
    });
    // NOTE: don't pass in connectionCtx as dependency so getCameraStatus is only
    // called once on page load
  }, []); // eslint-disable-line

  const getShotField = () => {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start queryShotField...");
      queryShotField(socket, connectionCtx.binning || 1);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === queryShotFieldCmd) {
        setShotFieldData(message);
      }
      console.log("queryShotField:", message);
    });

    socket.addEventListener("error", (message) => {
      setShotFieldData(message);
      console.log("queryShotField error:", message);
    });
  };

  // fire getCameraStatus on page load so we can set the form values
  useEffect(() => {
    getCameraStatus();
  }, [getCameraStatus]);

  return (
    <>
      <h3>Telephoto camera status</h3>
      <button className="btn btn-primary mb-3" onClick={getCameraStatus}>
        Update
      </button>
      {cameraSettingsData && (
        <pre>{JSON.stringify(cameraSettingsData, null, 2)}</pre>
      )}
      {shotFieldData && <pre>{JSON.stringify(shotFieldData, null, 2)}</pre>}
    </>
  );
}
