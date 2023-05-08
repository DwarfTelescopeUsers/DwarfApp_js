import Head from "next/head";
import { useState } from "react";

import { URI, cameraStatus, statusTelephotoCmd } from "@/lib/dwarf_api";

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
      if (message.interface === statusTelephotoCmd) {
        setConnectionStatus(200);
      } else {
        setConnectionStatus(500);
      }
    });

    socket.addEventListener("error", (err) => {
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

  return (
    <>
      <Head>
        <title>Dwarf II Demo</title>
      </Head>
      <main className="container">
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
            <a href="/set-location" className="btn btn-primary">
              Set location
            </a>
          </li>
          <li className="mb-2">
            <button onClick={checkConnection} className="btn btn-primary me-3">
              Connect to Dwarf II
            </button>
            {renderConnectionStatus()}
          </li>
        </ol>
      </main>
    </>
  );
}
