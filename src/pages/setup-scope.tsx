"use client";
import Head from "next/head";

import ConnectCamera from "@/components/ConnectCamera";
import SetLocation from "@/components/SetLocation";
import AstroDarks from "@/components/AstroDarks";
import { useSetupConnection } from "@/hooks/useSetupConnection";

export default function SetupScope() {
  useSetupConnection();

  return (
    <>
      <Head>
        <title>Setup Scope</title>
      </Head>
      <h1>Setup Scope</h1>
      <ConnectCamera />
      <hr />
      <SetLocation />
      <hr />
      <AstroDarks />
    </>
  );
}
