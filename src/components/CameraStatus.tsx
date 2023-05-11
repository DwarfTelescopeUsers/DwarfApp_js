import { useState, useContext, useEffect, useCallback } from "react";

import {
  URI,
  cameraStatus,
  statusTelephotoCmd,
  queryShotField,
  queryShotFieldCmd,
} from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { roundExposure } from "@/lib/math_utils";

export default function CameraStatus() {
  let connectionCtx = useContext(ConnectionContext);

  const [cameraStatusData, setCameraStatusData] = useState<any>(null);
  const [shotFieldData, setShotFieldData] = useState<any>(null);

  const getCameraStatus = useCallback(() => {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      cameraStatus(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === statusTelephotoCmd) {
        setCameraStatusData(message);
        connectionCtx.setGain(message.gain);
        connectionCtx.setExposure(roundExposure(message.exp));
        connectionCtx.setIr(message.ir);

        connectionCtx.setBinning(connectionCtx.binning || 1);
      }
      console.log("ok", message);
      getShotField();
    });

    socket.addEventListener("error", (message) => {
      setCameraStatusData(message);
      console.log("err", message);
    });
    // NOTE: don't pass in connectionCtx as dependency so getCameraStatus is only
    // called once on page load
  }, []); // eslint-disable-line

  const getShotField = () => {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      queryShotField(socket, connectionCtx.binning || 1);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === queryShotFieldCmd) {
        setShotFieldData(message);
      }
      console.log("ok", message);
    });

    socket.addEventListener("error", (message) => {
      setShotFieldData(message);
      console.log("err", message);
    });
  };

  // fire getCameraStatus on page load so we can set the form values
  useEffect(() => {
    getCameraStatus();
  }, [getCameraStatus]);

  return (
    <>
      <h2>Telephoto camera status</h2>
      <button className="btn btn-primary" onClick={getCameraStatus}>
        Get Status
      </button>
      {cameraStatusData && (
        <pre>{JSON.stringify(cameraStatusData, null, 2)}</pre>
      )}
      {shotFieldData && <pre>{JSON.stringify(shotFieldData, null, 2)}</pre>}
    </>
  );
}
