import React, { createContext, useState } from "react";

import { ConnectionContextType } from "@/types";

type ProviderProps = {
  children: React.ReactNode;
};

export const ConnectionContext = createContext<ConnectionContextType>(
  {} as ConnectionContextType
);

export function ConnectionContextProvider({ children }: ProviderProps) {
  const [connectionStatus, setConnectionStatus] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  let context = {
    connectionStatus,
    setConnectionStatus,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };
  return (
    <ConnectionContext.Provider value={context}>
      {children}
    </ConnectionContext.Provider>
  );
}

export default ConnectionContext;
