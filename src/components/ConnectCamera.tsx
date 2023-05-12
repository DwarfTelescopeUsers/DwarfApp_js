import { useContext, useState } from "react";

import { URI, cameraStatus, statusTelephotoCmd } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { saveConnectionStatusDB } from "@/db/db_utils";

export default function ConnectCamera() {
  let connectionCtx = useContext(ConnectionContext);

  const [connecting, setConnecting] = useState(false);

  function checkConnection() {
    setConnecting(true);

    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      cameraStatus(socket);
    });

    // close socket is request takes too long
    let closeSocketTimer = setTimeout(() => {
      setConnecting(false);
      connectionCtx.setConnectionStatus(false);
      saveConnectionStatusDB(false);
      socket.close();
    }, 3000);

    socket.addEventListener("message", (event) => {
      clearTimeout(closeSocketTimer);
      setConnecting(false);

      let message = JSON.parse(event.data);
      console.log(message);
      if (message.interface === statusTelephotoCmd) {
        connectionCtx.setConnectionStatus(true);
        connectionCtx.setInitialConnectionTime(Date.now());
        saveConnectionStatusDB(true);
      }
    });

    socket.addEventListener("error", () => {
      clearTimeout(closeSocketTimer);
      setConnecting(false);
      connectionCtx.setConnectionStatus(false);
      saveConnectionStatusDB(false);
    });
  }

  function renderConnectionStatus() {
    if (connecting) {
      return <span>Connecting...</span>;
    }
    if (connectionCtx.connectionStatus === undefined) {
      return <></>;
    }
    if (connectionCtx.connectionStatus === false) {
      return <span>Connection failed.</span>;
    }

    return <span>Connection successful.</span>;
  }

  return (
    <div>
      <h2>1. Connect to Dwarf II</h2>

      <p>
        In order for this site to connect to the Dwarf II, both the Dwarf II and
        the website must use the Dwarf II wifi.
      </p>

      <ol>
        <li className="mb-2">
          Use the Dwarf II mobile app to connect to the telescope using the
          Dwarf II wifi.
        </li>
        <li className="mb-2">
          Visit this site on a device that is connected to the Dwarf II wifi.
        </li>
        <li className="mb-2">
          Click Connect. This site will try to connect to Dwarf II.
        </li>
      </ol>

      <button className="btn btn-primary me-3" onClick={checkConnection}>
        Connect
      </button>
      {renderConnectionStatus()}
    </div>
  );
}
