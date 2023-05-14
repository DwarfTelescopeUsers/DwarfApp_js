import {
  telephotoCamera,
  photoSingleShot,
  takePhotoCmd,
  startRecordingCmd,
  stopRecordingCmd,
  startTimelapseCmd,
  stopTimelapseCmd,
  socketSend,
} from "@/lib/dwarf2_api";

// 3.2.1 Photograph
export function takePhoto(
  socket: WebSocket,
  camera = telephotoCamera,
  photoMode = photoSingleShot,
  count = 1,
  name = `Photo ${new Date()}`
): void {
  let options = {
    interface: takePhotoCmd,
    camId: camera,
    mode: photoMode,
    count: count,
    name: name,
  };
  socketSend(socket, options);
}

// 3.2.2 Start recording
export function startVideo(
  socket: WebSocket,
  name = `Video ${new Date()}`
): void {
  let options = {
    interface: startRecordingCmd,
    camId: telephotoCamera,
    name: name,
  };
  socketSend(socket, options);
}

// 3.2.3 Stop recording
export function stopVideo(socket: WebSocket): void {
  let options = {
    interface: stopRecordingCmd,
    camId: telephotoCamera,
  };
  socketSend(socket, options);
}

// 3.2.4 Start time lapse photography
export function startTimeLapse(
  socket: WebSocket,
  intervalTime: number,
  outTime: number,
  name = `Video ${new Date()}`
): void {
  // intervalTime value: 1s-60s
  let options = {
    interface: startTimelapseCmd,
    camId: telephotoCamera,
    interval: intervalTime,
    outTime: outTime,
    name: name,
  };
  socketSend(socket, options);
}

// 3.2.5 Stop time-lapse photography
export function stopTimeLapse(socket: WebSocket): void {
  let options = {
    interface: stopTimelapseCmd,
    camId: telephotoCamera,
  };
  socketSend(socket, options);
}
