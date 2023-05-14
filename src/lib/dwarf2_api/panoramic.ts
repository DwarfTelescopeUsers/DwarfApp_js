import { startPanoCmd, stopPanoCmd, socketSend, now } from "@/lib/dwarf2_api";

// 4.3.1 Start panorama
export function startPano(
  socket: WebSocket,
  numRows: number,
  numColumns: number,
  mStep1: number,
  mStep2: number,
  speed1: number,
  speed2: number,
  pulse1: number,
  pulse2: number,
  accelStep1: number,
  accelStep2: number
) {
  // mStep 1 2 4 8 16 32 64 128 256
  // speed 0-1000*mStep
  // pulse >=2
  // accelStep 0-1000
  let options = {
    interface: startPanoCmd,
    row: numRows,
    col: numColumns,
    mStep1,
    mStep2,
    speed1,
    speed2,
    pulse1,
    pulse2,
    imgPath: `DWARF_PANORAMA_${now()}`,
    accelStep1,
    accelStep2,
  };
  socketSend(socket, options);
}

// 4.3.2 Stop panorama
export function stopPano(socket: WebSocket) {
  let options = {
    interface: stopPanoCmd,
  };
  socketSend(socket, options);
}
