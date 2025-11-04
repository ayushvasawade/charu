"use client";

import React from "react";
import Loader from "./Loader";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Loader />
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
