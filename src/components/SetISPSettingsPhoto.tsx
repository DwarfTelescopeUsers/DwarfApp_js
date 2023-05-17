import type { ChangeEvent } from "react";
import { useContext } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import {
  saveGainDB,
  saveGainModeDB,
  saveExposureDB,
  saveExposureModeDB,
} from "@/db/db_utils";

import {
  wsURL,
  telephotoCamera,
  setExposure,
  setExposureValueCmd,
  setExposureMode,
  setExposureModeCmd,
  setGain,
  setGainValueCmd,
  setGainMode,
  setGainModeCmd,
  modeManual,
  modeAuto,
  exposureTelephotoModeAuto,
  exposureWideangleModeAuto,
} from "@/lib/dwarf2_api";
import { range } from "@/lib/math_utils";

type PropType = {
  camera: number;
};
export default function SetISPSettings(props: PropType) {
  let { camera } = props;
  let connectionCtx = useContext(ConnectionContext);

  function updateTelescope(type: string, value: number) {
    const socket = new WebSocket(wsURL);
    let camera = telephotoCamera;
    let commands = [
      setExposureModeCmd,
      setExposureValueCmd,
      setGainValueCmd,
      setGainModeCmd,
    ];

    socket.addEventListener("open", () => {
      console.log(`start set ${type}...`);
      if (type === "exposure") {
        setExposure(socket, camera, value);
      } else if (type === "exposureMode") {
        setExposureMode(socket, camera, value);
      } else if (type === "gain") {
        setGain(socket, camera, value);
      } else if (type === "gainMode") {
        setGainMode(socket, camera, value);
      }
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (commands.includes(message.interface)) {
        console.log(`set ${type}:`, message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (message) => {
      console.log(`set ${type} error:`, message);
    });
  }

  function changeExposureHandler(e: ChangeEvent<HTMLSelectElement>) {
    let targetValue = e.target.value;
    if (targetValue === "") return;

    if (targetValue === "auto") {
      let mode =
        camera === telephotoCamera
          ? exposureTelephotoModeAuto
          : exposureWideangleModeAuto;

      connectionCtx.setExposureMode(mode);
      saveExposureModeDB(mode);
      updateTelescope("exposureMode", mode);
    } else {
      let mode = modeManual;
      connectionCtx.setExposureMode(mode);
      saveExposureModeDB(mode);
      updateTelescope("exposureMode", mode);

      setTimeout(() => {
        let value = Number(targetValue);
        connectionCtx.setExposure(value);
        saveExposureDB(value);
        updateTelescope("exposure", value);
      }, 500);
    }
  }

  function changeGainHandler(e: ChangeEvent<HTMLSelectElement>) {
    let targetValue = e.target.value;
    if (targetValue === "") return;

    if (targetValue === "auto") {
      connectionCtx.setGainMode(modeAuto);
      saveGainModeDB(modeAuto);
      updateTelescope("gainMode", modeAuto);
    } else {
      connectionCtx.setGainMode(modeManual);
      saveGainModeDB(modeManual);
      updateTelescope("gainMode", modeManual);

      setTimeout(() => {
        let value = Number(targetValue);
        connectionCtx.setGain(value);
        saveGainDB(value);
        updateTelescope("gain", value);
      }, 1000);
    }
  }

  const allowedExposures = [
    0.0005, 0.001, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 3, 4, 5,
  ];

  const allowedGains = range(0, 240, 10);

  let displayGain = connectionCtx.gainMode === 1 ? connectionCtx.gain : "auto";
  let displayExp =
    connectionCtx.exposureMode === 1 ? connectionCtx.exposure : "auto";

  if (camera === telephotoCamera) {
    return (
      <div>
        <h2>Telephoto Camera Settings</h2>

        <form>
          <div className="row mb-3">
            <div className="col-sm-4">
              <label htmlFor="gain" className="form-label">
                Gain
              </label>
            </div>
            <div className="col-sm-8">
              <select
                id="gain"
                name="gain"
                onChange={(e) => changeGainHandler(e)}
                value={displayGain}
              >
                <option value="">Select</option>
                <option value="auto">Auto</option>
                {allowedGains.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-4">
              <label htmlFor="exposure" className="form-label">
                Exposure (sec)
              </label>
            </div>
            <div className="col-sm-8">
              <select
                id="exposure"
                name="exposure"
                onChange={(e) => changeExposureHandler(e)}
                value={displayExp}
              >
                <option value="">Select</option>
                <option value="auto">Auto</option>
                {allowedExposures.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return <p>TODO: Wideangle Camera</p>;
  }
}
