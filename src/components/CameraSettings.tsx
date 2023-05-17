import { useState, useContext, useEffect } from "react";

import {
  saveBinningDB,
  saveGainDB,
  saveGainModeDB,
  saveExposureDB,
  saveExposureModeDB,
  saveIRDB,
} from "@/db/db_utils";
import {
  wsURL,
  statusTelephotoCmd,
  statusWideangleCmd,
  queryShotFieldCmd,
  cameraSettings,
  queryShotField,
} from "@/lib/dwarf2_api";
import { ConnectionContext } from "@/stores/ConnectionContext";
import { roundExposure } from "@/lib/math_utils";
import Accordian from "@/components/shared/Accordian";

export default function CameraStatus() {
  let connectionCtx = useContext(ConnectionContext);

  const [cameraSettingsData, setCameraStatusData] = useState<any>(null);
  const [shotFieldData, setShotFieldData] = useState<any>(null);

  const getCameraStatus = (saveSettings = false) => {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start cameraSettings...");
      cameraSettings(socket);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (
        message.interface === statusTelephotoCmd ||
        message.interface === statusWideangleCmd
      ) {
        console.log("cameraSettings:", message);
        setCameraStatusData(message);

        if (saveSettings) {
          connectionCtx.setGain(message.gain);
          saveGainDB(message.gain);
          connectionCtx.setGainMode(message.gainMode);
          saveGainModeDB(message.gainMode);

          connectionCtx.setExposure(roundExposure(message.exp));
          saveExposureDB(roundExposure(message.exp));
          connectionCtx.setExposureMode(message.expMode);
          saveExposureModeDB(message.expMode);

          connectionCtx.setIR(message.ir);
          saveIRDB(message.ir);

          connectionCtx.setBinning(message.binning);
          saveBinningDB(message.binning);
        }
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (message) => {
      console.log("cameraSettings error:", message);
    });
  };

  const getShotField = () => {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start queryShotField...");
      queryShotField(socket, connectionCtx.binning || 1);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === queryShotFieldCmd) {
        setShotFieldData(message);
        console.log("queryShotField:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (message) => {
      setShotFieldData(message);
      console.log("queryShotField error:", message);
    });
  };

  useEffect(() => {
    getCameraStatus(true);
    setTimeout(() => {
      getShotField();
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Accordian text="Display all settings">
        <p>ISP Parameters</p>
        {cameraSettingsData && (
          <pre>{JSON.stringify(cameraSettingsData, null, 2)}</pre>
        )}
        <p>Shot Field</p>
        {shotFieldData && <pre>{JSON.stringify(shotFieldData, null, 2)}</pre>}
        <button
          className=" btn btn-primary mb-3"
          onClick={() => getCameraStatus()}
        >
          Refresh
        </button>{" "}
        - fetch settings from Dwarf II
        <button
          className=" btn btn-primary"
          onClick={() => getCameraStatus(true)}
        >
          Sync
        </button>{" "}
        - fetch settings from Dwarf II, update this app
      </Accordian>
    </>
  );
}
