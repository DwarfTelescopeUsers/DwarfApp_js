import {
  telephotoCamera,
  setExposureModeCmd,
  setExposureValueCmd,
  setGainModeCmd,
  setGainValueCmd,
  IRCut,
  setIRCmd,
  autofocusArea,
  autofocusCmd,
  setBrightnessValueCmd,
  setContrastValueCmd,
  setSaturationValueCmd,
  setHueValueCmd,
  setSharpnessValueCmd,
  setWhiteBalanceModeCmd,
  setWhiteBalanceScenceCmd,
  whiteBalanceScenesValueID,
  setWhiteBalanceColorCmd,
  socketSend,
  modeManual,
} from "@/lib/dwarf2_api";

// 3.3.1 brightness
export function setBrightness(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // telephoto values: 0-255 default：128
  // wideangle values: -64-64 default：0
  let options = {
    interface: setBrightnessValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.2 contrast
export function setContrast(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // telephoto values: 0-255 default：128
  // wideangle values: 0-95 default：0
  let options = {
    interface: setContrastValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.3 saturation
export function setSaturation(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // telephoto values: 0-255 default：128
  // wideangle values: 0-100 default：80
  let options = {
    interface: setSaturationValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.4 hue
export function setHue(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // telephoto values: 0-255 default：128
  // wideangle values: -2000-2000 default：0
  let options = {
    interface: setHueValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.5 sharpness
export function setSharpness(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // telephoto values: 0-100 default：50
  // wideangle values: 1-7 default：2
  let options = {
    interface: setSharpnessValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.6 Set exposure mode
export function setExposureMode(
  socket: WebSocket,
  camera = telephotoCamera,
  mode = modeManual
): void {
  let options = {
    interface: setExposureModeCmd,
    camId: camera,
    mode: mode,
  };
  socketSend(socket, options);
}

// 3.3.7 Set exposure value
export function setExposure(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // Long focal camera:0.0000-15.0000
  // Wide-angle camera：0.0003-1.0
  let options = {
    interface: setExposureValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.8 Set gain mode
export function setGainMode(
  socket: WebSocket,
  camera = telephotoCamera,
  mode = modeManual
): void {
  let options = {
    interface: setGainModeCmd,
    camId: camera,
    mode: mode,
  };
  socketSend(socket, options);
}

// 3.3.9 Set gain value
export function setGain(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // Long focal camera:0-240
  // Wide-angle camera:64-8000
  let options = {
    interface: setGainValueCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.10 Start autofocus
export function autoFocus(
  socket: WebSocket,
  camera = telephotoCamera,
  mode = autofocusArea,
  x = 0,
  y = 0
): void {
  // centerX: 0-1920
  // centerY: 0-1080
  let options = {
    interface: autofocusCmd,
    camId: camera,
    mode,
    centerX: x,
    centerY: y,
  };
  socketSend(socket, options);
}

// 3.3.11 Set the white balance mode
export function setWhiteBalanceMode(
  socket: WebSocket,
  camera = telephotoCamera,
  mode = modeManual
): void {
  let options = {
    interface: setWhiteBalanceModeCmd,
    camId: camera,
    mode: mode,
  };
  socketSend(socket, options);
}

// 3.3.12 Set the white balance scene
export function setWhiteBalanceScene(
  socket: WebSocket,
  mode = whiteBalanceScenesValueID["incandescent lamp"]
): void {
  let options = {
    interface: setWhiteBalanceScenceCmd,
    camId: telephotoCamera,
    mode,
  };
  socketSend(socket, options);
}

// 3.3.13 Set the white balance color temperature parameter
export function setWhiteBalanceColor(
  socket: WebSocket,
  camera = telephotoCamera,
  value: number
): void {
  // Long focal camera: 2800-7500
  // Wide-angle camera: 2800-6000
  let options = {
    interface: setWhiteBalanceColorCmd,
    camId: camera,
    value,
  };
  socketSend(socket, options);
}

// 3.3.14 IR_CUT
export function setIR(socket: WebSocket, value = IRCut): void {
  let options = {
    interface: setIRCmd,
    camId: telephotoCamera,
    value,
  };
  socketSend(socket, options);
}
