import { useState } from "react";

import {
  wsURL,
  telephotoCamera,
  telephotoURL,
  wideangleCamera,
  wideangleURL,
  turnOnCameraCmd,
  turnOffCameraCmd,
  binning2x2,
  turnOnCamera,
  turnOffCamera,
} from "@/lib/dwarf2_api";
import styles from "@/components/DwarfCameras.module.css";

export default function DwarfCameras() {
  const [telephotoCameraStatus, setTelephotoCameraStatus] = useState("on");
  const [wideangleCameraStatus, setWideangleCameraStatus] = useState("on");

  function turnOnCameraHandler(cameraId: number) {
    let socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start turnOnCamera...");
      turnOnCamera(socket, binning2x2, cameraId);
    });

    socket.addEventListener("message", (event) => {
      cameraId === telephotoCamera
        ? setTelephotoCameraStatus("on")
        : setWideangleCameraStatus("on");

      let message = JSON.parse(event.data);
      if (message.interface === turnOnCameraCmd) {
        console.log("turnOnCamera:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (error) => {
      console.log("turnOnCamera error:", error);
    });
  }

  function turnOffCameraHandler(cameraId: number) {
    let socket = new WebSocket(wsURL);

    socket.addEventListener("open", () => {
      console.log("start turnOffCamera...");
      turnOffCamera(socket, cameraId);
    });

    socket.addEventListener("message", (event) => {
      cameraId === telephotoCamera
        ? setTelephotoCameraStatus("off")
        : setWideangleCameraStatus("off");

      let message = JSON.parse(event.data);
      if (message.interface === turnOffCameraCmd) {
        console.log("turnOffCamera:", message);
      } else {
        console.log(message);
      }
    });

    socket.addEventListener("error", (error) => {
      console.log("turnOffCamera error:", error);
    });
  }

  function cameraToggleHandler(cameraId: number) {
    if (cameraId === telephotoCamera) {
      if (telephotoCameraStatus === "on") {
        turnOffCameraHandler(telephotoCamera);
        setTelephotoCameraStatus("off");
      } else {
        turnOnCameraHandler(telephotoCamera);
        setTelephotoCameraStatus("on");
      }
    } else {
      if (wideangleCameraStatus === "on") {
        turnOffCameraHandler(wideangleCamera);
        setWideangleCameraStatus("off");
      } else {
        turnOnCameraHandler(wideangleCamera);
        setWideangleCameraStatus("on");
      }
    }
  }

  return (
    <>
      <h2 className="mt-4">
        Telephoto Camera{" "}
        <button
          className="btn btn-primary"
          onClick={() => cameraToggleHandler(telephotoCamera)}
        >
          {telephotoCameraStatus === "on" && "Turn Off"}
          {telephotoCameraStatus === "off" && "Turn On"}
        </button>
      </h2>
      {/*  eslint-disable @next/next/no-img-element */}
      <img
        src={telephotoURL}
        alt="livestream for Dwarf 2 telephoto camera"
        className={styles.resize}
      ></img>

      <h2 className="mt-4">
        Wide-angle Camera{" "}
        <button
          className="btn btn-primary"
          onClick={() => cameraToggleHandler(wideangleCamera)}
        >
          {wideangleCameraStatus === "on" && "Turn Off"}
          {wideangleCameraStatus === "off" && "Turn On"}
        </button>
      </h2>

      {/*  eslint-disable @next/next/no-img-element */}
      <img
        src={wideangleURL}
        alt="livestream for Dwarf 2 wide angle camera"
        className={styles.resize}
      ></img>
    </>
  );
}
