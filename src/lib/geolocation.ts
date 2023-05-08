const geoOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function successHandler(
  position: GeolocationPosition,
  callback: (coords: GeolocationCoordinates) => void
): void {
  const coords = position.coords;
  callback(coords);
}

function errorHandler(err: any): void {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export function getCoordinates(
  callback: (coords: GeolocationCoordinates) => void
) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      successHandler(position, callback);
    },
    errorHandler,
    geoOptions
  );
}
