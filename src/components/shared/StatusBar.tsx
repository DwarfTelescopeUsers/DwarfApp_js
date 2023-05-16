import { useContext } from "react";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function StatusBar() {
  let connectionCtx = useContext(ConnectionContext);

  let connection = connectionCtx.connectionStatus
    ? "Connected"
    : "Not Connected";
  let coords =
    `Lat: ${connectionCtx.latitude?.toFixed(4) || "--"}, ` +
    `Lon: ${connectionCtx.longitude?.toFixed(4) || "--"}`;
  let gain = connectionCtx.gain == undefined ? "--" : connectionCtx.gain;
  let exp =
    connectionCtx.exposure === undefined
      ? "--"
      : `${connectionCtx.exposure} sec`;
  let IR =
    connectionCtx.IR === undefined
      ? "--"
      : `${connectionCtx.IR === 0 ? "Cut" : "Pass"}`;
  let binning =
    connectionCtx.binning === undefined
      ? "--"
      : `${connectionCtx.binning === 0 ? "1x1" : "2x2"}`;
  let raDec =
    `RA: ${connectionCtx.RA?.toFixed(4) || "--"}, ` +
    `Dec: ${connectionCtx.declination?.toFixed(4) || "--"}`;

  let fileFormat =
    connectionCtx.fileFormat === undefined ? "--" : connectionCtx.fileFormat;

  return (
    <div className=" mb-2 mt-2">
      {/* {JSON.stringify(connectionCtx, null, 2)} */}
      <span>{connection}</span>
      <span className="ms-4"> {coords}</span>
      <span className="ms-4">{raDec}</span>
      <br />
      <span>Gain: {gain}</span>
      <span className="ms-4">Exp: {exp}</span>
      <span className="ms-4">IR: {IR}</span>
      <span className="ms-4">Binning: {binning}</span>
      <span className="ms-4">Format: {fileFormat}</span>
    </div>
  );
}
