import { useContext } from "react";
import { ConnectionContext } from "@/stores/ConnectionContext";

export default function StatusBar() {
  let connectionCtx = useContext(ConnectionContext);

  let connection = connectionCtx.connectionStatus
    ? "Connected"
    : "Not Connected";
  let coords =
    `Lat: ${connectionCtx.latitude?.toFixed(5) || "--"}, ` +
    `Lon: ${connectionCtx.longitude?.toFixed(5) || "--"}`;
  let gain = connectionCtx.gain == undefined ? "--" : connectionCtx.gain;
  let exp =
    connectionCtx.exposure === undefined
      ? "--"
      : `${connectionCtx.exposure} sec`;
  let ir =
    connectionCtx.ir === undefined
      ? "--"
      : `${connectionCtx.ir === 0 ? "Cut" : "Pass"}`;
  let binning =
    connectionCtx.binning === undefined
      ? "--"
      : `${connectionCtx.binning === 0 ? "1x1" : "2x2"}`;
  let raDec =
    `RA: ${connectionCtx.ra || "--"}, ` +
    `Dec: ${connectionCtx.declination || "--"}`;

  return (
    <div className=" mb-2 mt-2">
      <span>{connection}</span>
      <span className="ms-4"> {coords}</span>
      <span className="ms-4">{raDec}</span>
      <br />
      <span>Gain: {gain}</span>
      <span className="ms-4">Exp: {exp}</span>
      <span className="ms-4">IR: {ir}</span>
      <span className="ms-4">Binning: {binning}</span>
    </div>
  );
}
