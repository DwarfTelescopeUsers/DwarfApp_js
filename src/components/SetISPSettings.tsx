import type { FormEvent, ChangeEvent } from "react";
import { useContext } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import { saveISPSettingsDB } from "@/db/db_utils";
import {
  URI,
  cameraTelephoto,
  setExposureD2,
  setExposureModeD2,
  setGainModeD2,
  setGainD2,
  setIRD2,
} from "@/lib/dwarf_api";

export default function SetISPSettings() {
  let connectionCtx = useContext(ConnectionContext);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formGain = formData.get("gain");
    const formExposure = formData.get("exposure");
    const formIr = formData.get("ir");
    const formBinning = formData.get("binning");
    const formFileFormat = formData.get("fileFormat");

    if (formGain && formExposure && formIr && formBinning && formFileFormat) {
      saveISPSettingsDB(
        JSON.stringify({
          gain: Number(formGain),
          exposure: Number(formExposure),
          ir: Number(formIr),
          binning: Number(formBinning),
          fileFormat: Number(formFileFormat),
        })
      );
      connectionCtx.setGain(Number(formGain));
      connectionCtx.setExposure(Number(formExposure));
      connectionCtx.setIr(Number(formIr));
      connectionCtx.setIr(Number(formBinning));

      // NOTE: connectionCtx.gain, etc doesn't give the latest values, so
      // we need to pass in the form data to updateTelescope

      // TODO: save binning, file format to telescope if DL adds
      // set binning , set , file format command to api
      updateTelescope(Number(formGain), Number(formExposure), Number(formIr));
    }
  }

  function updateTelescope(gain: number, exposure: number, ir: number) {
    const socket = new WebSocket(URI);
    let camera = cameraTelephoto;

    socket.addEventListener("open", () => {
      setExposureModeD2(socket, camera, "manual");
      setGainModeD2(socket, camera, "manual");
      setExposureD2(socket, camera, exposure);
      setGainD2(socket, camera, gain);
      setIRD2(socket, ir);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log(message);
    });

    socket.addEventListener("error", (message) => {
      console.log("err", message);
    });
  }

  function changeIRHandler(e: ChangeEvent<HTMLSelectElement>) {
    connectionCtx.setIr(Number(e.target.value));
  }

  function changeBinningHandler(e: ChangeEvent<HTMLSelectElement>) {
    connectionCtx.setBinning(Number(e.target.value));
  }

  function changeExposureHandler(e: ChangeEvent<HTMLSelectElement>) {
    connectionCtx.setExposure(Number(e.target.value));
  }

  function changeGainHandler(e: ChangeEvent<HTMLInputElement>) {
    connectionCtx.setGain(Number(e.target.value));
  }

  function changeFileFormatHandler(e: ChangeEvent<HTMLSelectElement>) {
    connectionCtx.setFileFormat(Number(e.target.value));
  }

  const allowedExposures = [
    0.001, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15,
  ];

  return (
    <div>
      <h2>Camera Settings</h2>
      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="gain" className="form-label">
              Gain
            </label>
          </div>
          <div className="col-sm-8">
            <input
              type="range"
              id="gain"
              name="gain"
              className="form-control"
              min={0}
              max={240}
              step={10}
              defaultValue={connectionCtx.gain}
              onChange={(e) => changeGainHandler(e)}
              required
            ></input>
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
              value={connectionCtx.ir?.toString()}
            >
              <option value={"0"}>Cut</option>
              <option value={"3"}>Pass</option>
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
              <option value={"0"}>1x1</option>
              <option value={"1"}>2x2</option>
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
              <option value={"0"}>FITS</option>
              <option value={"1"}>TIFF</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}
