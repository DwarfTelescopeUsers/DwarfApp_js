import type { ChangeEvent } from "react";
import { useContext } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import {
  saveBinningDB,
  saveGainDB,
  saveFileFormatDB,
  saveExposureDB,
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
} from "@/lib/dwarf2_api";
import { range } from "@/lib/math_utils";

export default function SetISPSettings() {
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
        setExposureMode(socket, camera, "manual");
        setExposure(socket, camera, value);
      } else if (type === "gain") {
        setGainMode(socket, camera, "manual");
        setGain(socket, camera, value);
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
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setExposure(value);
    saveExposureDB(value);
    updateTelescope("exposure", value);
  }

  function changeFileFormatHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setFileFormat(value);
    saveFileFormatDB(value);
    // TODO: save file format to telescope if DL adds interface to api
  }

  function changeGainHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setGain(value);
    saveGainDB(value);
    updateTelescope("gain", value);
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

  return (
    <div>
      <h2>Camera Settings</h2>

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
              value={connectionCtx.gain}
            >
              <option selected value="">
                Select
              </option>
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
              value={connectionCtx.exposure}
            >
              <option selected value="">
                Select
              </option>
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
              <option selected value="">
                Select
              </option>
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
              <option selected value="">
                Select
              </option>
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
              <option selected value="">
                Select
              </option>
              <option value="0">FITS</option>
              <option value="1">TIFF</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
