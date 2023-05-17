import type { ChangeEvent } from "react";
import { useContext } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import {
  saveBinningDB,
  saveGainDB,
  saveGainModeDB,
  saveFileFormatDB,
  saveExposureDB,
  saveExposureModeDB,
  saveIRDB,
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
  setIR,
  setIRCmd,
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
      setIRCmd,
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
      } else if (type === "IR") {
        setIR(socket, value);
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

  function changeBinningHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setBinning(value);
    saveBinningDB(value);
    // TODO: save binning to telescope if DL adds interface to api
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

  function changeFileFormatHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setFileFormat(value);
    saveFileFormatDB(value);
    // TODO: save file format to telescope if DL adds interface to api
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

  function changeIRHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setIR(value);
    saveIRDB(value);
    updateTelescope("IR", value);
  }

  const allowedExposures = [
    0.0005, 0.001, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15,
  ];

  const allowedGains = range(0, 150, 10);

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

          <div className="row mb-3">
            <div className="col-sm-4">
              <label htmlFor="ir" className="form-label">
                IR
              </label>
            </div>
            <div className="col-sm-8">
              <select
                id="ir"
                name="ir"
                onChange={(e) => changeIRHandler(e)}
                value={connectionCtx.IR?.toString()}
              >
                <option value="">Select</option>
                <option value="0">Cut</option>
                <option value="3">Pass</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-4">
              <label htmlFor="binning" className="form-label">
                Binning
              </label>
            </div>
            <div className="col-sm-8">
              <select
                id="binning"
                name="binning"
                onChange={(e) => changeBinningHandler(e)}
                value={connectionCtx.binning?.toString()}
              >
                <option value="">Select</option>
                <option value="0">1x1</option>
                <option value="1">2x2</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-4">
              <label htmlFor="fileFormat" className="form-label">
                File Format
              </label>
            </div>
            <div className="col-sm-8">
              <select
                id="fileFormat"
                name="fileFormat"
                onChange={(e) => changeFileFormatHandler(e)}
                value={connectionCtx.fileFormat?.toString()}
              >
                <option value="">Select</option>
                <option value="0">FITS</option>
                <option value="1">TIFF</option>
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
