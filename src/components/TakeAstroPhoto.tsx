import { useContext } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import { takeAstroPhoto, URI } from "@/lib/dwarf_api";
import styles from "@/components/TakeAstroPhoto.module.css";

export default function TakeAstroPhoto() {
  let connectionCtx = useContext(ConnectionContext);

  function takeAstroPhotoHandler() {
    const socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      let ra = 16.708;
      let dec = 36.414;

      takeAstroPhoto(
        socket,
        ra,
        dec,
        connectionCtx.exposure as number,
        connectionCtx.gain as number,
        connectionCtx.binning as number,
        1
      );
    });

    socket.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      console.log("message", message);
    });

    socket.addEventListener("error", (err) => {
      console.log("Error", err);
    });
  }
  return (
    <div>
      <h1>Take Astro Photo</h1>
      <button
        className={`btn btn-primary ${styles.shootButton}`}
        onClick={takeAstroPhotoHandler}
      ></button>
    </div>
  );
}
