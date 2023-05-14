import {
  telephotoCamera,
  statusTelephotoCmd,
  statusWideangleCmd,
  statusIRTelephotoCmd,
  statusWorkingStateTelephotoCmd,
  socketSend,
} from "@/lib/dwarf2_api";

// 3.4.1 Get telephoto ISP parameters
// 3.4.4 Returns the wide-angle ISP parameter
export function cameraSettings(
  socket: WebSocket,
  camera = telephotoCamera
): void {
  let command;
  if (camera === telephotoCamera) {
    command = statusTelephotoCmd;
  } else {
    command = statusWideangleCmd;
  }
  let options = { interface: command, camId: camera };
  socketSend(socket, options);
}

// 3.4.2 Get telephoto IRCUT state (when shooting raw)
export function iRSettings(socket: WebSocket): void {
  let options = { interface: statusIRTelephotoCmd, camId: telephotoCamera };
  socketSend(socket, options);
}

// 3.4.3 Returns to the telephoto working state
export function cameraWorkingState(socket: WebSocket): void {
  let options = {
    interface: statusWorkingStateTelephotoCmd,
    camId: telephotoCamera,
  };
  socketSend(socket, options);
}
