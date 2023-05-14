import {
  traceInitCmd,
  startTrackingCmd,
  stopTrackingCmd,
  telephotoCamera,
  socketSend,
} from "@/lib/dwarf2_api";

// 4.2.1 Trace initialization
export function startTrace(socket: WebSocket) {
  let options = { interface: traceInitCmd };
  socketSend(socket, options);
}

// 4.2.2 Start tacking
export function startTracking(
  socket: WebSocket,
  x: number,
  y: number,
  width: number,
  height: number
) {
  // x 0-1920
  // y 0-1080
  // w 0-1920
  // h 0-1080
  let options = {
    interface: startTrackingCmd,
    camId: telephotoCamera,
    x,
    y,
    w: width,
    h: height,
  };
  socketSend(socket, options);
}

// 4.2.3 Stop tracking
export function stopTracking(socket: WebSocket) {
  let options = {
    interface: stopTrackingCmd,
  };
  socketSend(socket, options);
}
