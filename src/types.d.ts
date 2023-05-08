export type ConnectionContextType = {
  connectionStatus: number | null;
  setConnectionStatus: React.Dispatch<React.SetStateAction<number | null>>;
};
