import { useState, useContext } from "react";

import { wsURL, calibrateGoto } from "@/lib/dwarf2_api";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function CalibrateGoto() {
  const connectionCtx = useContext(ConnectionContext);
  let showStatus = false;

  const [status, setStatus] = useState<any[]>([]);
  const [connecting, setConnecting] = useState(false);

  function calibrateGotoHandler() {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      setConnecting(true);

      if (connectionCtx.latitude && connectionCtx.longitude) {
        calibrateGoto(socket, connectionCtx.latitude, connectionCtx.longitude);
      }
    });

    socket.addEventListener("message", (event) => {
      setConnecting(false);
      let message = JSON.parse(event.data);
      console.log("calibrateGoto:", message);
      setStatus((prev) => prev.concat(message));
    });

    socket.addEventListener("error", (err) => {
      setConnecting(false);
      console.log("calibrateGoto error:", err);
    });
  }

  return (
    <>
      <h2>Calibrate Goto</h2>
      <p></p>
      <ol>
        <li className="mb-2">
          Point the telescope lens towards an area of the sky where stars,
          planets, or the Moon are visible.
        </li>
        <li className="mb-2">
          Click Calibrate to begin the calibration process.
        </li>
        <li className="mb-2">
          You must view the progress of the calibration on the Dwarf II mobile
          app.
        </li>
      </ol>
      <p>
        API Note: The API does not currently return info about whether the
        calibration is ok or failed.
      </p>
      <button className="btn btn-primary" onClick={calibrateGotoHandler}>
        Calibrate
      </button>

      {connecting && <span>Connecting...</span>}
      {showStatus &&
        status.map((s, i) => <pre key={i}>{JSON.stringify(s, null, 2)}</pre>)}
    </>
  );
}

/*
// TODO: not enough info to tell the progress of the calibration

{
  "interface": 11003,
  "value": 98,
  "code": 0
}
{
  "motorId": 2,
  "interface": 10110,
  "direction": 1,
  "distance": 17756,
  "code": 0
}
{
  "motorId": 2,
  "interface": 10100,
  "limit": 0,
  "code": -22
}
{
  "motorId": 2,
  "interface": 10111,
  "direction": 1,
  "position": 1600,
  "code": 0
}
{
  "motorId": 1,
  "interface": 10110,
  "direction": 0,
  "distance": 32759,
  "code": 0
}
{
  "motorId": 1,
  "interface": 10100,
  "limit": 0,
  "code": -22
}
{
  "motorId": 1,
  "interface": 10111,
  "direction": 0,
  "position": 1600,
  "code": 0
}
{
  "motorId": 1,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 2,
  "interface": 10100,
  "code": 0
}
{
  "motorId": 1,
  "interface": 10100,
  "code": 0
}
*/
