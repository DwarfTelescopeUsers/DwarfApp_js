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
  const [binning, setBinning] = useState<number | undefined>();
  const [initialConnectionTime, setInitialConnectionTime] = useState<
    number | undefined
  >();
  const [fileFormat, setFileFormat] = useState<number | undefined>();
  const [declination, setDeclination] = useState<number | undefined>();
  const [IR, setIR] = useState<number | undefined>();
  const [RA, setRA] = useState<number | undefined>();

  function deleteSettings() {
    setConnectionStatus(undefined);
    setLatitude(undefined);
    setLongitude(undefined);
    setGain(undefined);
    setIR(undefined);
    setBinning(undefined);
    setInitialConnectionTime(undefined);
    setFileFormat(undefined);
    setRA(undefined);
    setDeclination(undefined);
  }

  let context = {
    connectionStatus,
    setConnectionStatus,
    IR,
    setIR,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    gain,
    setGain,
    exposure,
    setExposure,
    binning,
    setBinning,
    RA,
    setRA,
    deleteSettings,
    initialConnectionTime,
    setInitialConnectionTime,
    fileFormat,
    setFileFormat,
    declination,
    setDeclination,
  };
  return (
    <ConnectionContext.Provider value={context}>
      {children}
    </ConnectionContext.Provider>
  );
}

export default ConnectionContext;
