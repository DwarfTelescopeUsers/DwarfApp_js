import Head from "next/head";
import { useEffect, useState } from "react";

import {
  URI,
  cameraStatus,
  statusTelephotoCmd,
  wideangleURL,
  telephotoURL,
} from "@/lib/dwarf_api";

export default function Camerass() {
  const [connectionStatus, setConnectionStatus] = useState<number | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  function checkConnection() {
    const socket = new WebSocket(URI);
    socket.addEventListener("open", () => {
      cameraStatus(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === statusTelephotoCmd) {
        setConnectionStatus(200);
      } else {
        setConnectionStatus(500);
      }
    });

    socket.addEventListener("error", (err) => {
      console.log(err);
      setConnectionStatus(500);
    });
  }

  if (connectionStatus === 200) {
    return (
      <>
        <Head>
          <title>Dwarf II Cameras</title>
        </Head>
        <main className="container">
          <h1>Dwarf II Cameras</h1>
          <h2>Wide-angle Camera</h2>
          <iframe
            id="wideangle"
            title="wide angle camera"
            width="1000"
            height="600"
            src={wideangleURL}
            style={{ objectFit: "contain" }}
          ></iframe>

          <h2>Telephoto Camera</h2>

          <iframe
            id="telephoto"
            title="telephoto camera"
            width="1000"
            height="600"
            src={telephotoURL}
            style={{ objectFit: "contain" }}
          ></iframe>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dwarf II Cameras</title>
      </Head>
      <main className="container">
        <h1>Dwarf II Cameras</h1>

        <p>You must connected to the Dwarf II in order to view the cameras.</p>
      </main>
    </>
  );
}
