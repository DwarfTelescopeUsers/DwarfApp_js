import {
  wideangleURL,
  telephotoURL,
  turnOnCamera,
  URI,
  cameraTelephoto,
  cameraWideangle,
} from "@/lib/dwarf_api";

export default function DwarfCameras() {
  function turnOnBothCameras() {
    let socket = new WebSocket(URI);
    console.log(" turnOnBothCameras");

    socket.addEventListener("open", () => {
      turnOnCamera(socket, cameraTelephoto);
      turnOnCamera(socket, cameraWideangle);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log(message);
    });

    socket.addEventListener("error", (error) => {
      console.log(error);
    });
  }

  turnOnBothCameras();

  return (
    <>
      <h2>Wide-angle Camera</h2>
      <iframe
        id="wideangle"
        title="wide angle camera"
        width="1000"
        height="600"
        src={wideangleURL}
        style={{ objectFit: "contain" }}
      ></iframe>

      <h2>Telephoto Camera</h2>

      <iframe
        id="telephoto"
        title="telephoto camera"
        width="1000"
        height="600"
        src={telephotoURL}
        style={{ objectFit: "contain" }}
      ></iframe>
    </>
  );
}
