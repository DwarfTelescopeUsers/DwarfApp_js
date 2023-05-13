import { useState } from "react";
import Link from "next/link";

import {
  URI,
  telephotoCamera,
  telephotoURL,
  wideangleCamera,
  wideangleURL,
  turnOnCamera,
  turnOnCameraCmd,
  turnOffCamera,
  turnOffCameraCmd,
} from "@/lib/dwarf_api";
import styles from "@/components/DwarfCameras.module.css";

export default function DwarfCameras() {
  const [telephotoCameraStatus, setTelephotoCameraStatus] = useState("on");
  const [wideangleCameraStatus, setWideangleCameraStatus] = useState("on");

  function turnOnCameraHandler(cameraId: number) {
    let socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      turnOnCamera(socket, cameraId);
    });

    socket.addEventListener("message", (event) => {
      cameraId === telephotoCamera
        ? setTelephotoCameraStatus("on")
        : setWideangleCameraStatus("on");

      let message = JSON.parse(event.data);
      if (message.interface === turnOnCameraCmd) {
        console.log("turnOnCamera:", message);
      }
    });

    socket.addEventListener("error", (error) => {
      console.log("turnOnCamera error:", error);
    });
  }

  function turnOffCameraHandler(cameraId: number) {
    let socket = new WebSocket(URI);

    socket.addEventListener("open", () => {
      turnOffCamera(socket, cameraId);
    });

    socket.addEventListener("message", (event) => {
      cameraId === telephotoCamera
        ? setTelephotoCameraStatus("off")
        : setWideangleCameraStatus("off");

      let message = JSON.parse(event.data);
      if (message.interface === turnOffCameraCmd) {
        console.log("turnOffCamera:", message);
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
      <Link href={telephotoURL} className="mt-1">
        {telephotoURL}
      </Link>

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
      <Link href={wideangleURL} className="mt-1">
        {wideangleURL}
      </Link>
    </>
  );
}
