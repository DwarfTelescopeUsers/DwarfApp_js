import {
  telephotoCamera,
  calibrateGotoCmd,
  startGotoCmd,
  binning2x2,
  fileTiff,
  takeAstroPhotoCmd,
  takeAstroDarkFramesCmd,
  darkGainDefault,
  utcURL,
  stopAstroPhotoCmd,
  rawPreviewContinousSuperimpose,
  queryShotFieldCmd,
  setRAWPreviewCmd,
  socketSend,
  now,
} from "@/lib/dwarf2_api";

// 4.1.1 UTC+0 time
export function formatUtcUrl() {
  return `${utcURL}${now()}`;
}

// 4.1.2 correction
export function calibrateGoto(
  socket: WebSocket,
  latitude: number,
  longitude: number
) {
  let options = {
    interface: calibrateGotoCmd,
    camId: telephotoCamera,
    lon: longitude,
    lat: latitude,
    date: now(),
    path: "DWARF_GOTO_timestamp",
  };
  socketSend(socket, options);
}

// 4.1.3 Start goto
export function startGoto(
  socket: WebSocket,
  planet: null | number,
  rightAscension: number,
  declination: number,
  latitude: number,
  longitude: number
): void {
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

// 4.1.4 Take raw pictures
export function takeAstroPhoto(
  socket: WebSocket,
  rightAscension: number,
  declination: number,
  exposureTime: number,
  gain: number,
  binning = binning2x2,
  count: number = 1,
  fileFormat = fileTiff
) {
  let options = {
    interface: takeAstroPhotoCmd,
    camId: telephotoCamera,
    target: "NULL",
    RA: rightAscension,
    DEC: declination,
    exp: exposureTime,
    gain: gain,
    binning: binning,
    count: count,
    name: `Astro ${now()}`,
    overlayCount: 1,
    format: fileFormat,
  };
  socketSend(socket, options);
}

// 4.1.7 Stop taking RAW images
export function stopAstroPhoto(socket: WebSocket) {
  let options = {
    interface: stopAstroPhotoCmd,
  };
  socketSend(socket, options);
}

// 4.1.9 Switch the RAW preview source
export function updateRawPreviewSource(
  socket: WebSocket,
  source = rawPreviewContinousSuperimpose
) {
  // 0:Continuous superposition graph
  // 1:Single 15s exposure graph
  // 2:Single sheet according to exposure time (more than 15s) composite image
  let options = {
    interface: setRAWPreviewCmd,
    camId: telephotoCamera,
    source,
  };
  socketSend(socket, options);
}

// 4.1.10 Taking dark field
// BUG: response is {interface: 11003, value: 100, code: 0} when darks already exists
export function takeAstroDarks(
  socket: WebSocket,
  binning: number,
  exposure: number,
  count = 40
) {
  let options = {
    interface: takeAstroDarkFramesCmd,
    camId: telephotoCamera,
    count,
    name: `DWARF_DARK ${now()}`,
    binning: binning,
    darkGain: darkGainDefault,
    darkExposure: exposure,
  };
  socketSend(socket, options);
}

// 4.1.11 Query the shot field
export function queryShotField(socket: WebSocket, binning: number) {
  let options = {
    interface: queryShotFieldCmd,
    camId: telephotoCamera,
    binning: binning,
  };
  socketSend(socket, options);
}
