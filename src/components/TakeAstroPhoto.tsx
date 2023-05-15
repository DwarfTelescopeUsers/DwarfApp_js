import { useContext } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import { takeAstroPhoto, wsURL, takeAstroPhotoCmd } from "@/lib/dwarf2_api";
import styles from "@/components/TakeAstroPhoto.module.css";

export default function TakeAstroPhoto() {
  let connectionCtx = useContext(ConnectionContext);

  function takeAstroPhotoHandler() {
    const socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start takeAstroPhoto...");

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
      if (message.interface === takeAstroPhotoCmd) {
        console.log("takeAstroPhoto:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (err) => {
      console.log("takeAstroPhoto error:", err);
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
