export function now(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

export function socketSend(
  socket: WebSocket,
  command: { [k: string]: any }
): void {
  console.log("send", command);
  socket.send(JSON.stringify(command));
}
