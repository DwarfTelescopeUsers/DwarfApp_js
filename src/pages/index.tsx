import Head from "next/head";
import { useContext } from "react";
import { useState } from "react";
import Link from "next/link";

import { URI, cameraStatus, statusTelephotoCmd } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function Home() {
  let connectionCtx = useContext(ConnectionContext);

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
        connectionCtx.setConnectionStatus(200);
      }
    });

    socket.addEventListener("error", () => {
      setConnecting(false);

      connectionCtx.setConnectionStatus(500);
    });
  }

  function renderConnectionStatus() {
    if (connecting) {
      return <span>Connecting...</span>;
    }
    if (connectionCtx.connectionStatus === null) {
      return <></>;
    }
    if (connectionCtx.connectionStatus === 500) {
      return <span>Connection failed.</span>;
    }

    return <span>Connection successful.</span>;
  }

  function renderCoordinates() {
    if (
      typeof connectionCtx.latitude === "number" &&
      typeof connectionCtx.longitude === "number"
    ) {
      return (
        <p>
          Latitude: {connectionCtx.latitude}, Longitude:{" "}
          {connectionCtx.longitude}
        </p>
      );
    }
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
          <Link href="/set-location">Set location</Link>
          {renderCoordinates()}
        </li>
        <li className="mb-2">
          <button onClick={checkConnection} className="btn btn-primary me-3">
            Connect to Dwarf II
          </button>
          {renderConnectionStatus()}
        </li>

        {connectionCtx.connectionStatus === 200 && (
          <li className="mb-2">
            <Link href="/cameras">View Cameras</Link>
          </li>
        )}
        {connectionCtx.connectionStatus === 200 && (
          <li className="mb-2">
            <Link href="/calibrate-goto">Calibrate Goto</Link>
          </li>
        )}
      </ol>
    </>
  );
}
