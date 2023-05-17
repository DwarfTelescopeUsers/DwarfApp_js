import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { ConnectionContext } from "@/stores/ConnectionContext";
import CameraStatus from "@/components/CameraSettings";
import SetISPSettings from "@/components/SetISPSettings";
import ManualGoto from "@/components/ManualGoto";
import { useSetupConnection } from "@/hooks/useSetupConnection";
import CalibrateGoto from "@/components/CalibrateGoto";
import StatusBar from "@/components/shared/StatusBar";
import Focus from "@/components/Focus";
import Accordian from "@/components/shared/Accordian";
import DwarfCameras from "@/components/DwarfCameras";
import TakeAstroPhoto from "@/components/TakeAstroPhoto";

export default function AstroPhoto() {
  useSetupConnection();
  let connectionCtx = useContext(ConnectionContext);

  if (
    connectionCtx.connectionStatus === undefined ||
    connectionCtx.connectionStatus === false
  ) {
    return (
      <>
        <Head>
          <title>Astro Photos</title>
        </Head>
        <StatusBar />

        <h1>Astro Photos</h1>

        <p>
          You need to <Link href="/setup-scope">connect</Link> this site to
          Dwarf II.
        </p>
      </>
    );
  }

  if (connectionCtx.latitude === undefined) {
    return (
      <>
        <Head>
          <title>Astro Photos</title>
        </Head>
        <StatusBar />

        <h1>Astro Photos</h1>
        <p>
          You need to <Link href="/setup-scope">set your location</Link> before
          taking astro photos.
        </p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Setup Scope</title>
      </Head>
      <StatusBar />

      <h1>Astro Photos</h1>
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
            Astro
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SetISPSettings />
          <hr />
          <Focus />
          <hr />
          <CalibrateGoto />
          <hr />
          <ManualGoto />
          <hr />
          <TakeAstroPhoto />
        </div>
      </div>
      <div></div>
    </>
  );
}
