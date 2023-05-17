import {
  takePhoto,
  wsURL,
  takePhotoCmd,
  telephotoCamera,
} from "@/lib/dwarf2_api";
import styles from "@/components/TakeAstroPhoto.module.css";

export default function TakePhoto() {
  function takePhotoHandler() {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start takePhoto...");

      takePhoto(socket, telephotoCamera);
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      if (message.interface === takePhotoCmd) {
        console.log("takePhoto:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (err) => {
      console.log("takePhoto error:", err);
    });
  }
  return (
    <div>
      <h1>Take Photo</h1>
      <button
        className={`btn btn-primary ${styles.shootButton}`}
        onClick={takePhotoHandler}
      ></button>
    </div>
  );
}
