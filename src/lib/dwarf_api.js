export const URI = "ws://192.168.88.1:9900";
export const wideangleURL = "http://192.168.88.1:8092/thirdstream";
export const telephotoURL = "http://192.168.88.1:8092/mainstream";
export const rawPreviewURL = "http://192.168.88.1:8092/rawstream";

// camera
const turnOnCameraCmd = 10000;
const turnOffCameraCmd = 10017;

export const statusTelephotoCmd = 10215;
const statusWideangleCmd = 10217;

export const cameraTelephoto = 0;
export const cameraWideangle = 1;

// astro photo
const takeAstroPhotoCmd = 10011;

// photo
const takePhotoCmd = 10006;
const photoSingleShot = 0;
const photoContinuous = 1;

// focus
const autofocusCmd = 10211;
const autofocusGlobal = 0;
const autofocusArea = 1;

// goto
const setupGotoCmd = 11205;
const startGotoCmd = 11203;
const Mercury = 0;
const Venus = 1;
const Mars = 2;
const Jupiter = 3;
const Saturn = 4;
const Uranus = 5;
const Neptune = 6;
const Moon = 7;

// exposure
const setExposureModeCmd = 10001;
const setExposureValueCmd = 10003;

// gain
const setGainModeCmd = 10004;
const setGainValueCmd = 10005;

// IR
const setIRCmd = 10203;
const IRCut = 0;
const IRPass = 3;

// binning
const binning1x1 = 0;
const binning2x2 = 1;

// file format
const fileFits = 0;
const fileTiff = 1;

// raw preview
const setRawPreviewCmd = 10020;
const rawPreviewContinousSuperimpose = 0;
const rawPreviewSingle15 = 1;
const rawPreviewSingleComposite = 2;

function now() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

export function turnOnCamera(socket, camera = cameraTelephoto) {
  console.log("turn on camera...");
  socketSend(socket, { interface: turnOnCameraCmd, camId: camera });
}

export function turnOffCamera(socket, camera = cameraTelephoto) {
  console.log("turn off camera...");
  let options = { interface: turnOffCameraCmd, camId: camera };
  socketSend(socket, options);
}

export function cameraStatus(socket, camera = cameraTelephoto) {
  console.log("camera status...");
  let command;
  if (camera === cameraTelephoto) {
    command = statusTelephotoCmd;
  } else {
    command = statusWideangleCmd;
  }
  let options = { interface: command, camId: camera };
  socketSend(socket, options);
}

export function takePhoto(
  socket,
  camera = cameraTelephoto,
  photoMode = photoSingleShot,
  count = 2,
  name = `Photo ${new Date()}`
) {
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
  socket,
  camera,
  focusMode = autofocusArea,
  x = 0,
  y = 0
) {
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

export function setupGoto(socket, latitude, longitude) {
  console.log("setup goto...");
  let options = {
    interface: setupGotoCmd,
    camId: cameraTelephoto,
    lon: longitude,
    lat: latitude,
    date: now(),
    path: "DWARF_GOTO_timestamp",
  };
  socketSend(socket, options);
}

export function startGoto(
  socket,
  planet,
  rightAscension,
  declination,
  longitude,
  latitude
) {
  console.log("start goto...");
  let options = {
    interface: startGotoCmd,
    camId: cameraTelephoto,
    lon: longitude,
    lat: latitude,
    date: now(),
    path: "DWARF_GOTO_timestamp",
  };
  if (planet !== undefined) {
    options.planet = planet;
  } else {
    options.ra = rightAscension;
    options.dec = declination;
  }
  socketSend(socket, options);
}

export function setExposureMode(
  socket,
  camera = cameraTelephoto,
  mode = "manual"
) {
  console.log("set exposure mode...");
  let modeId;
  if (camera === cameraTelephoto) {
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

export function setExposure(socket, camera = cameraTelephoto, exposureTime) {
  console.log("set exposure value...");
  let options = {
    interface: setExposureValueCmd,
    camId: camera,
    value: exposureTime,
  };
  socketSend(socket, options);
}

export function setGainMode(socket, camera = cameraTelephoto, mode = "manual") {
  console.log("set gain mode...");

  let modeId = mode === "manual" ? 1 : 0;
  let options = {
    interface: setGainModeCmd,
    camId: camera,
    mode: modeId,
  };
  socketSend(socket, options);
}

export function setGain(socket, camera = cameraTelephoto, gainValue) {
  console.log("set gain value...");
  let options = {
    interface: setGainValueCmd,
    camId: camera,
    value: gainValue,
  };
  socketSend(socket, options);
}

export function setIR(socket, irValue = IRCut) {
  console.log("set IR value...");
  let options = {
    interface: setIRCmd,
    camId: cameraTelephoto,
    value: irValue,
  };
  socketSend(socket, options);
}

export function takeAstroPhoto(
  socket,
  rightAscension,
  declination,
  exposureTime,
  gainValue,
  binningValue = binning2x2,
  count,
  fileFormat = fileTiff
) {
  console.log("take astro photo...");
  let options = {
    interface: takeAstroPhotoCmd,
    camId: cameraTelephoto,
    // target: NULL,
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

export function setRawPreview(
  socket,
  previewMode = rawPreviewContinousSuperimpose
) {
  console.log("set RAW preview...");
  let options = {
    interface: setRawPreviewCmd,
    camId: cameraTelephoto,
    source: previewMode,
  };
  socketSend(socket, options);
}

function socketSend(socket, command) {
  socket.send(JSON.stringify(command));
}
