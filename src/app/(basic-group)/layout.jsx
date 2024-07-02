import React from "react";

// === COMPONENT === ///
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <div className="layout-wrapper">
        <SideBar />
        <div className="content-wrapper">{children}</div>
      </div>
    </>
  );
}
