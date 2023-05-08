import Head from "next/head";
import { useState, useContext } from "react";

import { URI, setupGoto } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function CalibrateGoto() {
  const connectionCtx = useContext(ConnectionContext);

  const [status, setStatus] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);

  function gotoCalibratation() {
    setConnecting(true);
    let lat = connectionCtx.latitude;
    let lon = connectionCtx.longitude;
    if (typeof lat !== "number") {
      setStatus("Error: Latitude and longitude are not set.");
      return;
    }
    if (typeof lon !== "number") {
      setStatus("Error: Latitude and longitude are not set.");
      return;
    }

    setStatus(null);

    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      setConnecting(false);

      if (typeof lat === "number" && typeof lon === "number") {
        setupGoto(socket, lat, lon);
      }
    });

    socket.addEventListener("message", (event) => {
      setConnecting(false);

      let message = JSON.parse(event.data);
      setStatus(message);
    });

    socket.addEventListener("error", (err) => {
      setConnecting(false);

      console.log("Error", err);
      setStatus("Error: " + JSON.stringify(err));
    });
  }

  return (
    <>
      <Head>
        <title>Calibrate Goto</title>
      </Head>
      <h1>Calibrate Goto</h1>
      <h2>Instructions</h2>
      <ol>
        <li className="mb-2">Focus the Dwarf II</li>
        <li className="mb-2">
          Point the telescope towards an area of the sky where stars, planets,
          or the Moon are visible.
        </li>
        <li className="mb-2">
          <button className="btn btn-primary me-3" onClick={gotoCalibratation}>
            Calibrate
          </button>
          {connecting && <span>Connecting...</span>}
        </li>
      </ol>
      {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
    </>
  );
}
