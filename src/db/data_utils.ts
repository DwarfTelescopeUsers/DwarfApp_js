import { fetchCoordinatesDB } from "@/db/db_utils";
import { ConnectionContextType, CoordinatesData } from "@/types";

export function fetchCoordinates(
  connectionCtx: ConnectionContextType
): CoordinatesData | undefined {
  let data: CoordinatesData = {};

  let coordsDB = fetchCoordinatesDB();

  if (isNumber(connectionCtx.latitude)) {
    data.latitude = connectionCtx.latitude;
  } else if (isNumber(coordsDB.latitude)) {
    data.latitude = coordsDB.latitude;
  }

  if (isNumber(connectionCtx.longitude)) {
    data.longitude = connectionCtx.longitude;
  } else if (isNumber(coordsDB.longitude)) {
    data.longitude = coordsDB.longitude;
  }

  if (Object.keys(data).length > 0) {
    return data;
  }
}

export function isNumber(item: any): boolean {
  return typeof item === "number";
}
