import { olderThanHours } from "@/lib/math_utils";

export function fetchCoordinatesDB() {
  let lat = localStorage.getItem("latitude");
  let lon = localStorage.getItem("longitude");
  if (typeof lat === "string" && typeof lon === "string") {
    return { latitude: Number(lat), longitude: Number(lon) };
  } else {
    return {};
  }
}

export function saveCoordinatesDB(latitude: number, longitude: number) {
  localStorage.setItem("latitude", latitude.toString());
  localStorage.setItem("longitude", longitude.toString());
}

export function fetchConnectionStatusDB() {
  let status = localStorage.getItem("connectionStatus");
  if (status) {
    return { connectionStatus: status === "true" };
  }
}

export function saveConnectionStatusDB(status: boolean) {
  if (status) {
    localStorage.setItem("initialConnectionTime", Date.now().toString());
  }
  localStorage.setItem("connectionStatus", status ? "true" : "false");
}

export function saveISPSettingsDB(options: any) {
  localStorage.setItem("ispSettings", options);
}

export function fetchISPSettingsDB() {
  let settings = localStorage.getItem("ispSettings");
  if (settings) {
    return JSON.parse(settings);
  }
}

export function saveRaDecDB(RA: number, declination: number): void {
  localStorage.setItem("RA", RA.toString());
  localStorage.setItem("declination", declination.toString());
}

export function fetchRaDecDB() {
  let RA = localStorage.getItem("RA");
  let dec = localStorage.getItem("declination");
  if (typeof RA === "string" && typeof dec === "string") {
    return { RA: Number(RA), declination: Number(dec) };
  } else {
    return {};
  }
}

export function expiredSession() {
  let prevTime = localStorage.getItem("initialConnectionTime");
  if (prevTime) {
    return olderThanHours(Number(prevTime), 12);
  }
}

export function deleteSettings() {
  [
    "latitude",
    "longitude",
    "connectionStatus",
    "ispSettings",
    "initialConnectionTime",
  ].forEach((item) => localStorage.removeItem(item));
}
