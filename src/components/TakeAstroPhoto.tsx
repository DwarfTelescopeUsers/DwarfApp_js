import { useContext } from "react";
import type { ChangeEvent } from "react";

import { ConnectionContext } from "@/stores/ConnectionContext";
import { takeAstroPhoto, wsURL, takeAstroPhotoCmd } from "@/lib/dwarf2_api";
import styles from "@/components/TakeAstroPhoto.module.css";
import { saveRADB, saveDecDB } from "@/db/db_utils";
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

  function changeDeclinationHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setDeclination(value);
    saveDecDB(value);
  }

  function changeRAHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") return;

    let value = Number(e.target.value);
    connectionCtx.setRA(value);
    saveRADB(value);
  }

  return (
    <div>
      <h1>Take Astro Photo</h1>

      <form>
        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="ra" className="form-label">
              Right Acension
            </label>
          </div>
          <div className="col-sm-8">
            <input
              pattern="^-?\d*(\.\d+)?$"
              className="form-control"
              id="ra"
              name="ra"
              placeholder="-12.3456"
              required
              onChange={(e) => changeRAHandler(e)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="declination" className="form-label">
              Declination
            </label>
          </div>
          <div className="col-sm-8">
            <input
              pattern="^-?\d*(\.\d+)?$"
              className="form-control"
              id="declination"
              name="declination"
              placeholder="56.7890"
              required
              onChange={(e) => changeDeclinationHandler(e)}
            />
          </div>
        </div>
      </form>

      <button
        className={`btn btn-primary ${styles.shootButton}`}
        onClick={takeAstroPhotoHandler}
      ></button>
    </div>
  );
}
