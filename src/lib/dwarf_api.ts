/* eslint no-unused-vars: 0 */

const IP = "192.168.88.1";
export const URI = `ws://${IP}:9900`;
export const wideangleURL = `http://${IP}:8092/thirdstream`;
export const telephotoURL = `http://${IP}:8092/mainstream`;
export const rawPreviewURL = `http://${IP}:8092/rawstream`;

// ===============
// 3.1 image transmission
// ===============

// camera
export const turnOnCameraCmd = 10000;
export const turnOffCameraCmd = 10017;

export const telephotoCamera = 0;
export const wideangleCamera = 1;

// ===============
// 3.2 photo and video
// ===============

// photo
const takePhotoCmd = 10006;
const photoSingleShot = 0;
const photoContinuous = 1;

// video
const startRecordingCmd = 10007;
const stopRecordingCmd = 10009;

// timelapse photos
const startTimelapseCmd = 10018;
const stopTimelapseCmd = 10019;

// ===============
// 3.3 ISP settings
// ===============

// brightness
const setBrightnessValueCmd = 10204;

// contrast
const setContrastValueCmd = 10205;

// saturation
const setSaturationValueCmd = 10206;

// hue
const setHueValueCmd = 10207;

// sharpness
const setSharpnessValueCmd = 10208;

// exposure
const setExposureModeCmd = 10001;
const setExposureValueCmd = 10003;

// gain
const setGainModeCmd = 10004;
const setGainValueCmd = 10005;

// autofocus
const autofocusCmd = 10211;
const autofocusGlobal = 0;
const autofocusArea = 1;

// whitebalance
const setWBModeCmd = 10212;
const setWBScenceCmd = 10213;
const setWBColorCmd = 10214;

// IR
const setIRCmd = 10203;
const IRCut = 0;
const IRPass = 3;

// ===============
// 3.4 status
// ===============

// telephoto
export const statusTelephotoCmd = 10215;
const statusIRTelephotoCmd = 10216;
const statusWorkingStateTelephotoCmd = 10022;

// wideangle
const statusWideangleCmd = 10217;

// ===============
// 4.1 Astro
// ===============

// goto
const calibrateGotoCmd = 11205;

const startGotoCmd = 11203;

const Mercury = 0;
const Venus = 1;
const Mars = 2;
const Jupiter = 3;
const Saturn = 4;
const Uranus = 5;
const Neptune = 6;
const Moon = 7;

// RAW astro photo
const takeAstroPhotoCmd = 10011;
const stopAstroPhotoCmd = 10015;

export const binning1x1 = 0;
export const binning2x2 = 1;

const fileFits = 0;
const fileTiff = 1;

// raw preview
const setRawPreviewCmd = 10020;
const rawPreviewContinousSuperimpose = 0;
const rawPreviewSingle15 = 1;
const rawPreviewSingleComposite = 2;

// astro dark frames
const takeAstroDarkFramesCmd = 10026;

// query shot field
export const queryShotFieldCmd = 10027;

// ===============
// 4.2 tracking
// ===============

const traceInitCmd = 11200;
const startTrackingCmd = 11201;
const stopTrackingCmd = 11202;

// ===============
// 4.3 panoromic
// ===============

const startPanoCmd = 10103;
const stopPanoCmd = 10106;

// ===============
// 5 motion control
// ===============

const startMotionCmd = 10100;
const stopMotionCmd = 10101;
const setSpeedCmd = 10107;
const setDirectionCmd = 10108;
const setSubdivideCmd = 10109;

// ===============
// 7.1 system status
// ===============

const systemStatusCmd = 11407;

// ===============
// 7.2 microsd card status
// ===============

const microsdStatusCmd = 11405;
const microsdAvailableCmd = 11409;

// ===============
// 7.4 dwarf status
// ===============

const dwarfSoftwareVersionCmd = 11410;
const dwarfChargingStatusCmd = 11011;

// ===============
// 7.11 shut down
// ===============

const shutDownCmd = 11004;

function now(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

export function turnOnCamera(
  socket: WebSocket,
  camera = telephotoCamera
): void {
  console.log("turn on camera...");
  socketSend(socket, { interface: turnOnCameraCmd, camId: camera });
}

export function turnOffCamera(
  socket: WebSocket,
  camera = telephotoCamera
): void {
  console.log("turn off camera...");
  let options = { interface: turnOffCameraCmd, camId: camera };
  socketSend(socket, options);
}

export function cameraStatus(
  socket: WebSocket,
  camera = telephotoCamera
): void {
  console.log("camera status...");
  let command;
  if (camera === telephotoCamera) {
    command = statusTelephotoCmd;
  } else {
    command = statusWideangleCmd;
  }
  let options = { interface: command, camId: camera };
  socketSend(socket, options);
}

export function takePhoto(
  socket: WebSocket,
  camera = telephotoCamera,
  photoMode = photoSingleShot,
  count = 2,
  name = `Photo ${new Date()}`
): void {
  console.log("take photos...");
  let options = {
    interface: takePhotoCmd,
    camId: camera,
    mode: photoMode,
    count: count,
    name: name,
  };
  socketSend(socket, options);
}

export function autoFocus(
  socket: WebSocket,
  camera = telephotoCamera,
  focusMode = autofocusArea,
  x = 0,
  y = 0
): void {
  console.log("autofocus...");
  let options = {
    interface: autofocusCmd,
    camId: camera,
    mode: focusMode,
    centerX: x,
    centerY: y,
  };
  socketSend(socket, options);
}

export function calibrateGoto(
  socket: WebSocket,
  latitude: number,
  longitude: number
) {
  console.log("setup goto...");
  let options = {
    camId: telephotoCamera,
    lon: longitude,
    lat: latitude,
    date: now(),
    path: "DWARF_GOTO_timestamp",
  };
  socketSend(socket, options);
}

export function startGoto(
  socket: WebSocket,
  planet: null | number,
  rightAscension: number,
  declination: number,
  latitude: number,
  longitude: number
): void {
  console.log("start goto...");
  let options = {
    interface: startGotoCmd,
    camId: telephotoCamera,
    lon: longitude,
    lat: latitude,
    date: now(),
    path: "DWARF_GOTO_timestamp",
  } as { [k: string]: any };

  if (planet !== undefined && planet !== null) {
    options.planet = planet;
  } else {
    options.ra = rightAscension;
    options.dec = declination;
  }
  socketSend(socket, options);
}

export function setExposureModeD2(
  socket: WebSocket,
  camera = telephotoCamera,
  mode = "manual"
): void {
  console.log("set exposure mode...");
  let modeId;
  if (camera === telephotoCamera) {
    modeId = mode === "manual" ? 1 : 0;
  } else {
    modeId = mode === "manual" ? 1 : 3;
  }

  let options = {
    interface: setExposureModeCmd,
    camId: camera,
    mode: modeId,
  };
  socketSend(socket, options);
}

export function setExposureD2(
  socket: WebSocket,
  camera = telephotoCamera,
  exposureTime: number
): void {
  console.log("set exposure value...");
  let options = {
    interface: setExposureValueCmd,
    camId: camera,
    value: exposureTime,
  };
  socketSend(socket, options);
}

export function setGainModeD2(
  socket: WebSocket,
  camera = telephotoCamera,
  mode = "manual"
): void {
  console.log("set gain mode...");

  let modeId = mode === "manual" ? 1 : 0;
  let options = {
    interface: setGainModeCmd,
    camId: camera,
    mode: modeId,
  };
  socketSend(socket, options);
}

export function setGainD2(
  socket: WebSocket,
  camera = telephotoCamera,
  gainValue: number
): void {
  console.log("set gain value...");
  let options = {
    interface: setGainValueCmd,
    camId: camera,
    value: gainValue,
  };
  socketSend(socket, options);
}

export function setIRD2(socket: WebSocket, ir = IRCut): void {
  console.log("set IR value...");
  let options = {
    interface: setIRCmd,
    camId: telephotoCamera,
    value: ir,
  };
  socketSend(socket, options);
}

export function takeAstroPhoto(
  socket: WebSocket,
  rightAscension: number,
  declination: number,
  exposureTime: number,
  gainValue: number,
  binningValue = binning2x2,
  count: number,
  fileFormat = fileTiff
) {
  console.log("take astro photo...");
  let options = {
    interface: takeAstroPhotoCmd,
    camId: telephotoCamera,
    target: "NULL",
    RA: rightAscension,
    DEC: declination,
    exp: exposureTime,
    gain: gainValue,
    binning: binningValue,
    count: count,
    name: `IMG_${now()}`,
    overlayCount: 1,
    format: fileFormat,
  };
  socketSend(socket, options);
}

export function setRawPreviewD2(
  socket: WebSocket,
  previewMode = rawPreviewContinousSuperimpose
): void {
  console.log("set RAW preview...");
  let options = {
    interface: setRawPreviewCmd,
    camId: telephotoCamera,
    source: previewMode,
  };
  socketSend(socket, options);
}

// TODO: not working
// response is {interface: 11003, value: 100, code: 0} when darks already exists
export function takeAstroDarks(
  socket: WebSocket,
  binning: number,
  gain: number,
  exposure: number
) {
  console.log("take astro darks...");
  let options = {
    interface: takeAstroDarkFramesCmd,
    camId: telephotoCamera,
    count: 40,
    name: `DWARF_DARK_${now()}`,
    binning: binning,
    darkGain: gain,
    darkExposure: exposure,
  };
  socketSend(socket, options);
}

export function queryShotField(socket: WebSocket, binning: number) {
  console.log("query shot field...");
  let options = {
    interface: queryShotFieldCmd,
    camId: telephotoCamera,
    binning: binning,
  };
  socketSend(socket, options);
}

export function shutDown(socket: WebSocket) {
  console.log("query shot field...");
  let options = {
    interface: shutDownCmd,
  };
  socketSend(socket, options);
}

function socketSend(socket: WebSocket, command: { [k: string]: any }): void {
  console.log("send", command);
  socket.send(JSON.stringify(command));
}
