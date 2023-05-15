import { useContext, useEffect } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import {
  expiredSession,
  deleteSettings,
  fetchConnectionStatusDB,
  fetchCoordinatesDB,
  fetchRaDecDB,
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
          connectionCtx.setConnectionStatus(statusDB);
        }
      }
      if (connectionCtx.latitude === undefined) {
        let coors = fetchCoordinatesDB();
        if (coors.latitude) {
          connectionCtx.setLatitude(coors.latitude);
          connectionCtx.setLongitude(coors.longitude);
        }
      }
      if (connectionCtx.RA === undefined) {
        let data = fetchRaDecDB();
        if (data.RA) {
          connectionCtx.setRA(data.RA);
          connectionCtx.setDeclination(data.declination);
        }
      }

      // continously check connection status
      if (connectionCtx.connectionStatus) {
        timer = setInterval(() => {
          checkConnectionLoop(connectionCtx, timer);
        }, 90 * 1000);
      }
    }

    return () => {
      console.log("unmount: delete checkConnectionLoop timer");
      clearInterval(timer);
    };
  }, [connectionCtx]);
}
