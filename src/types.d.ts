export type ConnectionContextType = {
  connectionStatus: number | undefined;
  setConnectionStatus: React.Dispatch<React.SetStateAction<number | undefined>>;
  latitude: number | undefined;
  setLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  longitude: number | undefined;
  setLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export type CoordinatesData = {
  latitude?: number;
  longitude?: number;
};
