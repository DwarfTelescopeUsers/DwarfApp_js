import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { ConnectionContext } from "@/stores/ConnectionContext";
import CameraSettings from "@/components/CameraSettings";
import SetISPSettingsPhoto from "@/components/SetISPSettingsPhoto";
import { useSetupConnection } from "@/hooks/useSetupConnection";
import StatusBar from "@/components/shared/StatusBar";
import Focus from "@/components/Focus";
import DwarfCameras from "@/components/DwarfCameras";
import TakePhoto from "@/components/TakePhoto";
import { telephotoCamera } from "@/lib/dwarf2_api";

export default function Photo() {
  useSetupConnection();
  let connectionCtx = useContext(ConnectionContext);

  if (
    connectionCtx.connectionStatus === undefined ||
    connectionCtx.connectionStatus === false
  ) {
    return (
      <>
        <Head>
          <title>Photos</title>
        </Head>
        <StatusBar mode="photo" />

        <h1>Photos</h1>

        <p>
          You need to <Link href="/setup-scope">connect</Link> this site to
          Dwarf II.
        </p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Setup Scope</title>
      </Head>
      <StatusBar mode="photo" />

      <h1>Photos</h1>
      {connectionCtx.connectionStatus}

      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Menu
      </button>

      <DwarfCameras />

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Photo
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SetISPSettingsPhoto camera={telephotoCamera} />
          <CameraSettings />
          <hr />
          <Focus />
          <hr />
          <TakePhoto />
        </div>
      </div>
      <div></div>
    </>
  );
}
