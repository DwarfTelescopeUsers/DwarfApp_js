import { shutDownCmd, socketSend } from "@/lib/dwarf2_api";

// 7.11 Shut down
export function shutDown(socket: WebSocket) {
  let options = {
    interface: shutDownCmd,
  };
  socketSend(socket, options);
}
