import { useState, useContext } from "react";

import { URI, setupGoto } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function CalibrateGoto() {
  const connectionCtx = useContext(ConnectionContext);

  const [status, setStatus] = useState<any[]>([]);
  const [connecting, setConnecting] = useState(false);

  function gotoCalibratation() {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      setConnecting(true);

      if (connectionCtx.latitude && connectionCtx.longitude) {
        setupGoto(socket, connectionCtx.latitude, connectionCtx.longitude);
      }
    });

    socket.addEventListener("message", (event) => {
      setConnecting(false);
      let message = JSON.parse(event.data);
      console.log("message", message);
      setStatus((prev) => prev.concat(message));
    });

    socket.addEventListener("error", (err) => {
      setConnecting(false);
      console.log("Error", err);
      setStatus((prev) => prev.concat(JSON.stringify(err)));
    });
  }

  return (
    <>
      <h1>Calibrate Goto</h1>
      <h2>Instructions</h2>
      <ol>
        <li className="mb-2">
          Focus the Dwarf II using the mobile app from Dwarf Labs.
        </li>
        <li className="mb-2">
          Point the telescope lens towards an area of the sky where stars,
          planets, or the Moon are visible.
        </li>
        <li className="mb-2">
          Click Calibrate to begin the calibration process.
        </li>
      </ol>
      <button
        className="btn btn-secondary"
        disabled
        onClick={gotoCalibratation}
      >
        Calibrate
      </button>

      <span className="ms-3">Coming soon...</span>
      {connecting && <span>Connecting...</span>}
      {status.length > 0 && <pre>{JSON.stringify(status, null, 2)}</pre>}
    </>
  );
}

/*
[
  {
    "motorId": 2,
    "interface": 10110,
    "direction": 1,
    "distance": 1602,
    "code": 0
  },
  {
    "motorId": 2,
    "interface": 10100,
    "limit": 0,
    "code": -22
  },
  {
    "motorId": 2,
    "interface": 10111,
    "direction": 1,
    "position": 1600,
    "code": 0
  },
  {
    "interface": 11003,
    "value": 100,
    "code": 0
  }
]
*/
