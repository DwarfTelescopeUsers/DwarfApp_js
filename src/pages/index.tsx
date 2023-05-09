import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";

import { CoordinatesData } from "@/types";
import { URI, cameraStatus, statusTelephotoCmd } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { fetchCoordinates, fetchConnectionStatus } from "@/db/data_utils";
import { saveConnectionStatusDB } from "@/db/db_utils";

export default function Home() {
  let connectionCtx = useContext(ConnectionContext);

  const [connecting, setConnecting] = useState(false);
  const [coordinates, setCoordinates] = useState<CoordinatesData>();
  const [connectionStatus, setConnectionStatus] = useState<boolean>();

  useEffect(() => {
    setCoordinates(fetchCoordinates(connectionCtx));
    setConnectionStatus(fetchConnectionStatus(connectionCtx));
  }, [connectionCtx]);

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
        connectionCtx.setConnectionStatus(true);
        saveConnectionStatusDB(true);
      }
    });

    socket.addEventListener("error", () => {
      setConnecting(false);
      connectionCtx.setConnectionStatus(false);
      saveConnectionStatusDB(false);
    });
  }

  function renderConnectionStatus() {
    if (connecting) {
      return <span>Connecting...</span>;
    }
    if (connectionStatus === undefined) {
      return <></>;
    }
    if (connectionStatus === false) {
      return <span>Connection failed.</span>;
    }

    return <span>Connection successful.</span>;
  }

  function renderCoordinates() {
    if (coordinates) {
      return (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
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
          {coordinates && renderCoordinates()}
        </li>
        <li className="mb-2">
          <button onClick={checkConnection} className="btn btn-primary me-3">
            Connect to Dwarf II
          </button>
          {renderConnectionStatus()}
        </li>

        {connectionStatus && (
          <li className="mb-2">
            <Link href="/cameras">View Cameras</Link>
          </li>
        )}
        {connectionStatus && (
          <li className="mb-2">
            <Link href="/calibrate-goto">Calibrate Goto</Link>
          </li>
        )}
      </ol>
    </>
  );
}
