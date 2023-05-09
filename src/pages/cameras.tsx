import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import {
  wideangleURL,
  telephotoURL,
  URI,
} from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { fetchConnectionStatus } from "@/db/data_utils";

export default function Cameras() {
  const connectionCtx = useContext(ConnectionContext);
  const [connectionStatus, setConnectionStatus] = useState<boolean>();

  useEffect(() => {
    setConnectionStatus(fetchConnectionStatus(connectionCtx));
  }, [connectionCtx]);

  if (connectionStatus) {
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
      <h1>Dwarf II Cameras</h1>

      <p>You must connected to the Dwarf II in order to view the cameras.</p>
    </>
  );
}
