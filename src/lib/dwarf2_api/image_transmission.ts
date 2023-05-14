import {
  telephotoCamera,
  binning2x2,
  turnOnCameraCmd,
  turnOffCameraCmd,
  previewImageQuality,
  socketSend,
} from "@/lib/dwarf2_api";

// 3.1.1 Turn on the camera
export function turnOnCamera(
  socket: WebSocket,
  binning = binning2x2,
  camera = telephotoCamera
): void {
  socketSend(socket, {
    interface: turnOnCameraCmd,
    camId: camera,
    binning: binning,
  });
}

// 3.1.2 Turn off the camera
export function turnOffCamera(
  socket: WebSocket,
  camera = telephotoCamera
): void {
  let options = { interface: turnOffCameraCmd, camId: camera };
  socketSend(socket, options);
}

// 3.1.4 Set preview image quality
export function setPreviewImageQuality(
  socket: WebSocket,
  previewQuality: number
) {
  // previewQuality value: 30-85
  let options = {
    interface: previewImageQuality,
    value: previewQuality,
  };
  socketSend(socket, options);
}
