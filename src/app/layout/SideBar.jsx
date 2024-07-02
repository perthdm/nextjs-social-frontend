"use client";

import Link from "next/link";
import { HomeOutlined, FormOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const styledNav = (name) => {
    if (name === pathname) return { fontWeight: "bold" };
  };

  return (
    <ul className="side-bar">
      <li>
        <HomeOutlined style={{ fontWeight: "bold" }} />
        <Link href={"/home"} style={styledNav("/home")}>
          Home
        </Link>
      </li>
      <li>
        <FormOutlined />
        <Link href={"/ourblog"} style={styledNav("/ourblog")}>
          Our Blog
        </Link>
      </li>
    </ul>
  );
};

export default SideBar;
