"use client";

import React, { useState } from "react";
import { Row, Col, Input, Button, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { STORAGE } from "../utils/util";
import UserService from "../services/UserService";

const SignInPage = () => {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!username)
      return message.error("กรุณากรอก Username เพื่อทำการเข้าสู่ระบบ");

    let response = await UserService.signIn({ username });

    if (response) {
      let { data } = response;
      STORAGE.SET("username", data.username);
      STORAGE.SET("userId", data._id);
      router.push("/home");
    }
  };

  return (
    <Row style={{ backgroundColor: "#243831" }}>
      <Col
        className="signin-container"
        xs={{ span: 24, order: 2 }}
        md={{ span: 15, order: 1 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row gutter={[0, 16]} style={{ width: "40%" }}>
          <h1 style={{ marginBottom: "1rem" }}>Sign in</h1>
          <Col span={24}>
            <Input
              placeholder="Username"
              style={{ height: "38px" }}
              onChange={({ target: { value } }) => {
                setUsername(value);
              }}
            />
          </Col>
          <Col span={24}>
            <Button
              onClick={handleSignIn}
              style={{
                width: "100%",
                backgroundColor: "#49A569",
                borderColor: "#49A569",
                color: "white",
                height: "38px",
                fontWeight: 500,
              }}
            >
              Sign In
            </Button>
          </Col>
        </Row>
      </Col>
      <Col
        className="brand-container"
        span={12}
        xs={{ span: 24, order: 1 }}
        md={{ span: 9, order: 2 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2B5F44",
          flexDirection: "column",
        }}
      >
        <Image
          alt="next-logo"
          src={`/images/logo.png`}
          width={280}
          height={280}
        />
        <h1>a Brand</h1>
      </Col>
    </Row>
  );
};

export default SignInPage;
