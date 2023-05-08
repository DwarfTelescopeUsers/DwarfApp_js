export type ConnectionContextType = {
  connectionStatus: number | null;
  setConnectionStatus: React.Dispatch<React.SetStateAction<number | null>>;
  latitude: number | null;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  longitude: number | null;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
};
