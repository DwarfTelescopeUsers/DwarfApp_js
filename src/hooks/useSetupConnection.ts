import { useContext, useEffect } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import {
  expiredSession,
  deleteSettings,
  fetchConnectionStatusDB,
  fetchCoordinatesDB,
} from "@/db/db_utils";
import { checkConnectionLoop } from "@/lib/connection_status";

export function useSetupConnection() {
  let connectionCtx = useContext(ConnectionContext);

  useEffect(() => {
    let timer: any;

    if (expiredSession()) {
      console.log("expiredSession true");
      deleteSettings();
      connectionCtx.deleteSettings();
    } else {
      checkConnectionLoop(connectionCtx);
      // fetch values from DB and set connectionCtx
      if (connectionCtx.connectionStatus === undefined) {
        let statusDB = fetchConnectionStatusDB();
        if (statusDB !== undefined) {
          connectionCtx.setConnectionStatus(statusDB.connectionStatus);
        }
      }
      if (connectionCtx.latitude === undefined) {
        let coors = fetchCoordinatesDB();
        if (coors.latitude) {
          connectionCtx.setLatitude(coors.latitude);
          connectionCtx.setLongitude(coors.longitude);
        }
      }

      // continously check connection status
      if (connectionCtx.connectionStatus) {
        timer = setInterval(() => {
          checkConnectionLoop(connectionCtx, timer);
        }, 60 * 1000);
      }
    }

    return () => {
      console.log("unmount: delete checkConnectionLoop timer");
      clearInterval(timer);
    };
  }, [connectionCtx]);
}
