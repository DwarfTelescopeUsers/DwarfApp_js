import React from "react";

import Nav from "@/components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="container">{children}</main>
    </>
  );
}
