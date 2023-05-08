import Head from "next/head";
import { useContext } from "react";

import { wideangleURL, telephotoURL } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function Camerass() {
  const connectionCtx = useContext(ConnectionContext);

  if (connectionCtx.connectionStatus === 200) {
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
