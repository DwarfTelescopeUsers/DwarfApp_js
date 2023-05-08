import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

import {
  URI,
  cameraStatus,
  statusTelephotoCmd,
  setupGoto,
} from "@/lib/dwarf_api";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);

  function checkConnection() {
    setConnecting(true);

    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      cameraStatus(socket);
    });

    socket.addEventListener("message", (event) => {
      setConnecting(false);

      let message = JSON.parse(event.data);
      console.log(message);
      if (message.interface === statusTelephotoCmd) {
        setConnectionStatus(200);
      }
    });

    socket.addEventListener("error", () => {
      setConnecting(false);

      setConnectionStatus(500);
    });
  }

  function renderConnectionStatus() {
    if (connecting) {
      return <span>Connecting...</span>;
    }
    if (connectionStatus === null) {
      return <></>;
    }
    if (connectionStatus === 500) {
      return <span>Connection failed.</span>;
    }

    return <span>Connection successful.</span>;
  }

  function gotoCalibratation() {
    let lat = localStorage.getItem("latitude");
    let lon = localStorage.getItem("longitude");
    if (!lat || !lon) {
      return;
    }
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      setupGoto(socket, lat, lon);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log(message);
    });

    socket.addEventListener("error", (err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Head>
        <title>Dwarf II Demo</title>
      </Head>
      <h1>Dwarf II Demo</h1>
      <p>
        This website connects to the Dwarf II telescope via the Dwarf II API.
        The Dwarf II API and this website are very much in beta phase, so this
        website has limited functionality.
      </p>
      <h2>Instructions</h2>
      <ol>
        <li className="mb-2">
          In order for this site to connect to the Dwarf II, both the Dwarf II
          and the website must use the Dwarf II wifi. Use the Dwarf II mobile
          app to connect to the telescope using the Dwarf II wifi. Visit this
          site on a device that is connected to the Dwarf II wifi.
        </li>
        <li className="mb-2">
          <Link href="/set-location" className="btn btn-primary">
            Set location
          </Link>
        </li>
        <li className="mb-2">
          <button onClick={checkConnection} className="btn btn-primary me-3">
            Connect to Dwarf II
          </button>
          {renderConnectionStatus()}
        </li>
        <li>
          <Link
            href="/cameras"
            className={`btn btn-primary ${
              connectionStatus === 200 ? "" : "disabled"
            } `}
          >
            View Cameras
          </Link>
        </li>
        <li className="mb-2">
          <button onClick={gotoCalibratation} className="btn btn-primary me-3">
            Goto Calibratation
          </button>
        </li>
      </ol>
    </>
  );
}
