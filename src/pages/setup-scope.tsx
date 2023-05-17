"use client";
import Head from "next/head";

import ConnectCamera from "@/components/ConnectCamera";
import SetLocation from "@/components/SetLocation";
import AstroDarks from "@/components/AstroDarks";
import { useSetupConnection } from "@/hooks/useSetupConnection";
import StatusBar from "@/components/shared/StatusBar";

export default function SetupScope() {
  useSetupConnection();

  return (
    <div>
      <Head>
        <title>Setup Scope</title>
      </Head>
      <StatusBar mode="setup" />

      <ConnectCamera />
      <hr />
      <SetLocation />
      <hr />
      <AstroDarks />
    </div>
  );
}
