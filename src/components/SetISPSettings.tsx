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

    if (formGain && formExposure && formIr && formBinning) {
      saveISPSettingsDB(
        JSON.stringify({
          gain: Number(formGain),
          exposure: Number(formExposure),
          ir: Number(formIr),
          binning: Number(formBinning),
        })
      );
      connectionCtx.setGain(Number(formGain));
      connectionCtx.setExposure(Number(formExposure));
      connectionCtx.setIr(Number(formIr));
      connectionCtx.setIr(Number(formBinning));

      // NOTE: connectionCtx.gain, etc doesn't give the latest values, so
      // we need to pass in the form data to updateTelescope
      // TODO: save binning to telescope if DL adds set binning command to api
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

  return (
    <div>
      <h2>Settings</h2>
      <form className="col-sm-8" onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="col-sm-2">
            <label htmlFor="gain" className="form-label">
              Gain (0 - 240)
            </label>
          </div>
          <div className="col-sm-10">
            <input
              type="number"
              id="gain"
              name="gain"
              className="form-control"
              min={0}
              max={240}
              step={10}
              defaultValue={connectionCtx.gain}
              required
            ></input>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-2">
            <label htmlFor="exposure" className="form-label">
              Exposure time (0.5 - 15 seconds)
            </label>
          </div>
          <div className="col-sm-10">
            <input
              type="number"
              id="exposure"
              name="exposure"
              className="form-control"
              min={0}
              max={15}
              step={0.01}
              defaultValue={connectionCtx.exposure}
              required
            ></input>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-2">
            <label htmlFor="ir" className="form-label">
              IR
            </label>
          </div>
          <div className="col-sm-10">
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
          <div className="col-sm-2">
            <label htmlFor="binning" className="form-label">
              Binning
            </label>
          </div>
          <div className="col-sm-10">
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

        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}
