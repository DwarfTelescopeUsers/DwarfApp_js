import { useContext } from "react";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function StatusBar() {
  let connectionCtx = useContext(ConnectionContext);

  let connection = connectionCtx.connectionStatus
    ? "Connected"
    : "Not Connected";
  let coords =
    `Lat: ${connectionCtx.latitude?.toFixed(5)}, ` +
    `Lon: ${connectionCtx.longitude?.toFixed(5)}`;
  let gain = `Gain: ${connectionCtx.gain}`;
  let exp = `Exp: ${connectionCtx.exposure} sec`;
  let ir = `IR: ${connectionCtx.ir === 0 ? "Cut" : "Pass"}`;
  let binning = `IR: ${connectionCtx.binning === 0 ? "1x1" : "2x2"}`;

  return (
    <div className=" mb-2 mt-2">
      <span>{connection}</span>
      <span className="ms-4"> {coords}</span>
      <span className="ms-4">{gain}</span>
      <span className="ms-4">{exp}</span>
      <span className="ms-4">{ir}</span>
      <span className="ms-4">{binning}</span>
    </div>
  );
}
