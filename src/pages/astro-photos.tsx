import { useState, useContext, useEffect, useCallback } from "react";

import AstroDarks from "@/components/AstroDarks";
import CameraStatus from "@/components/CameraStatus";
import SetISPSettings from "@/components/SetISPSettings";
import ExecuteGoto from "@/components/ExecuteGoto";
import { URI, cameraStatus, statusTelephotoCmd } from "@/lib/dwarf_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { fetchISPSettingsDB } from "@/db/db_utils";
import { roundExposure } from "@/lib/math_utils";

export default function AstroPhoto() {
  const [cameraStatusData, setCameraStatusData] = useState<any>(null);

  let connectionCtx = useContext(ConnectionContext);

  const getCameraStatus = useCallback(() => {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      cameraStatus(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === statusTelephotoCmd) {
        setCameraStatusData(message);
        connectionCtx.setGain(message.gain);
        connectionCtx.setExposure(roundExposure(message.exp));
        connectionCtx.setIr(message.ir);

        // TODO: get binning from telescope if DL adds set binning command to api
        let status = fetchISPSettingsDB();
        let binning = 0;
        if (status) {
          binning = Number(status.binning);
        }
        connectionCtx.setBinning(binning);
      }
      console.log("ok", message);
    });

    socket.addEventListener("error", (message) => {
      setCameraStatusData(message);
      console.log("err", message);
    });
    // NOTE: don't pass in connectionCtx as dependency so getCameraStatus is only
    // called once on page load
  }, []); // eslint-disable-line

  useEffect(() => {
    console.log("useEffect");
    getCameraStatus();
  }, [getCameraStatus]);

  return (
    <div>
      <h1>Astro Photos</h1>

      <CameraStatus
        cameraStatusData={cameraStatusData}
        getCameraStatus={getCameraStatus}
      />
      <hr></hr>

      <SetISPSettings />

      <hr></hr>

      <AstroDarks />

      <hr></hr>
      <ExecuteGoto />
    </div>
  );
}
