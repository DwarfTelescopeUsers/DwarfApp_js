"use client";
import Head from "next/head";

import ConnectCamera from "@/components/ConnectCamera";
import SetLocation from "@/components/SetLocation";

export default function SetupScope() {
  return (
    <>
      <Head>
        <title>Setup Scope</title>
      </Head>
      <h1>Setup Scope</h1>

      <ConnectCamera />

      <hr />

      <SetLocation />
    </>
  );
}
