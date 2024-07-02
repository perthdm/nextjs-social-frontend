"use client";

import React from "react";
import { Avatar, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { STORAGE } from "../utils/util";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const username = STORAGE.GET("username");
  const router = useRouter();

  return (
    <header className="header-content">
      <h3 style={{ position: "absolute", left: "1.5rem" }}>a Board</h3>

      {!username ? (
        <Button className="bt-signin" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      ) : (
        <div className="user-box">
          {username}{" "}
          <Avatar
            size={38}
            icon={<UserOutlined />}
            style={{ marginLeft: "6px", backgroundColor: "#49A569", color:"white" }}
          />
        </div>
      )}

      <MenuOutlined className="nav-mobile-burger" />
    </header>
  );
};

export default Header;
