import {
  startMotionCmd,
  stopMotionCmd,
  setSpeedCmd,
  setDirectionCmd,
  setSubdivideCmd,
  socketSend,
} from "@/lib/dwarf2_api";

// 5.1 Start
export function startMotion(
  socket: WebSocket,
  motor: number,
  mode: number,
  mStep: number,
  speed: number,
  direction: number,
  pulse: number,
  accelStep: number
) {
  // motor: 1:spin 2:pitch
  // mode: 1:continuous mode 2:pulse mode
  // mStep: 1 2 4 8 16 32 64 128 256
  // speed: range:0-65536（1-50000&&<1000*mStep）
  // direction: 0:anticlockwise 1:clockwise
  // pulse: range:>=2（mStep<=32）>=5(mStep>32)
  // accelStep: 0-1000
  let options = {
    interface: startMotionCmd,
    id: motor,
    mode,
    mStep,

    speed,
    accelStep,

    direction,

    pulse,
  };
  socketSend(socket, options);
}

// 5.2 Stop
export function stopMotion(
  socket: WebSocket,
  motor: number,
  decelStep: number
) {
  // motor: 1:spin 2:pitch
  // decelStep: 0-1000
  let options = {
    interface: stopMotionCmd,
    id: motor,
    decelStep,
  };
  socketSend(socket, options);
}

// 5.3 Set speed
export function setSpeed(
  socket: WebSocket,
  motor: number,
  speed: number,
  accelStep: number,
  trend: number
) {
  // speed: 0-50000
  // accelStep: 0-1000
  // trend: 0:decelerate 1:accelerate
  let options = {
    interface: setSpeedCmd,
    id: motor,
    speed,
    accelStep,
    trend,
  };
  socketSend(socket, options);
}

// 5.4 Set direction
export function setDirection(
  socket: WebSocket,
  motor: number,
  direction: number
) {
  // direction: 0:anticlockwise 1:clockwise
  let options = {
    interface: setDirectionCmd,
    id: motor,
    direction,
  };
  socketSend(socket, options);
}

// 5.5 Set subdivide
export function setSubdivide(socket: WebSocket, motor: number, mStep: number) {
  // 1 2 4 8 16 32 64 128 256
  let options = {
    interface: setSubdivideCmd,
    id: motor,
    mStep,
  };
  socketSend(socket, options);
}
