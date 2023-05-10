import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";

import { URI, setupGoto } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { CoordinatesData } from "@/types";
import { fetchCoordinates, isNumber } from "@/db/data_utils";

export default function CalibrateGoto() {
  const connectionCtx = useContext(ConnectionContext);

  const [status, setStatus] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [coordinates, setCoordinates] = useState<CoordinatesData>();

  useEffect(() => {
    setCoordinates(fetchCoordinates(connectionCtx));
  }, [connectionCtx]);

  function gotoCalibratation() {
    setConnecting(true);
    let lat = coordinates?.latitude;
    let lon = coordinates?.longitude;
    if (lat === undefined) {
      setStatus("Error: Latitude and longitude are not set.");
      return;
    }
    if (lon === undefined) {
      setStatus("Error: Latitude and longitude are not set.");
      return;
    }

    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      setConnecting(false);

      if (isNumber(lat) && isNumber(lon)) {
        setupGoto(socket, lat as number, lon as number);
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
        <li className="mb-2">
          <Link href="/setup-scope">Set the location</Link> for this website.
        </li>
        <li className="mb-2">
          Focus the Dwarf II using the mobile app from Dwarf Labs.
        </li>
        <li className="mb-2">
          Point the telescope lens towards an area of the sky where stars,
          planets, or the Moon are visible.
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
