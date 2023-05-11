import React, { createContext, useState } from "react";

import { ConnectionContextType } from "@/types";

type ProviderProps = {
  children: React.ReactNode;
};

export const ConnectionContext = createContext<ConnectionContextType>(
  {} as ConnectionContextType
);

export function ConnectionContextProvider({ children }: ProviderProps) {
  const [connectionStatus, setConnectionStatus] = useState<
    boolean | undefined
  >();
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [gain, setGain] = useState<number | undefined>();
  const [exposure, setExposure] = useState<number | undefined>();
  const [ir, setIr] = useState<number | undefined>();
  const [binning, setBinning] = useState<number | undefined>();
  const [initialConnectionTime, setInitialConnectionTime] = useState<
    number | undefined
  >();

  function deleteSettings() {
    setLatitude(undefined);
    setLongitude(undefined);
    setConnectionStatus(undefined);
    setInitialConnectionTime(undefined);
  }

  let context = {
    connectionStatus,
    setConnectionStatus,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    gain,
    setGain,
    exposure,
    setExposure,
    ir,
    setIr,
    binning,
    setBinning,
    deleteSettings,
    initialConnectionTime,
    setInitialConnectionTime,
  };
  return (
    <ConnectionContext.Provider value={context}>
      {children}
    </ConnectionContext.Provider>
  );
}

export default ConnectionContext;
