export type ConnectionContextType = {
  connectionStatus: boolean | undefined;
  setConnectionStatus: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  latitude: number | undefined;
  setLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  longitude: number | undefined;
  setLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  gain: number | undefined;
  setGain: React.Dispatch<React.SetStateAction<number | undefined>>;
  exposure: number | undefined;
  setExposure: React.Dispatch<React.SetStateAction<number | undefined>>;
  ir: number | undefined;
  setIr: React.Dispatch<React.SetStateAction<number | undefined>>;
  binning: number | undefined;
  setBinning: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export type CoordinatesData = {
  latitude?: number;
  longitude?: number;
};
