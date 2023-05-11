import { telephotoURL } from "@/lib/dwarf_api";
import { ConnectionContextType } from "@/types";

export function checkConnectionLoop(
  connectionCtx: ConnectionContextType,
  timer?: any
) {
  // if we can't connect to camera in 2 seconds, reset setConnectionStatus
  fetch(telephotoURL, { signal: AbortSignal.timeout(2000) })
    .then(() => {
      console.log("connection ok");
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("checkConnectionLoop error");
        if (timer) {
          clearInterval(timer);
        }

        connectionCtx.setConnectionStatus(undefined);
        localStorage.removeItem("connectionStatus");
      }
    });
}
