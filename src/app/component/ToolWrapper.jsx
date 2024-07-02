"use client";

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Dropdown,
  Space,
  message,
  Select,
} from "antd";
import { SearchOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import ModalPostManagement from "./ModalPostManagement";
import { STORAGE } from "../utils/util";
import { POST_TYPE } from "../context/constant";

const ToolWrapper = ({ reFetch, setQuery, isEdit, currentPost, setIsEdit }) => {
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);

  useEffect(() => {
    if (isEdit) setOpenModalCreate(true);
  }, [isEdit]);

  const showModal = () => {
    if (!STORAGE.GET("userId"))
      return message.error("กรุณาเข้าสู่ระบบก่อนทำการสร้างโพส");
    setOpenModalCreate(true);
  };

  const handleSubmitBlog = () => {
    setOpenModalCreate(false);
    if (isEdit) setIsEdit(false);
  };

  const handleCancel = () => {
    setOpenModalCreate(false);
    if (isEdit) setIsEdit(false);
  };

  return (
    <Row gutter={[8, 0]}>
      <Col md={17} xs={8}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          style={{
            backgroundColor: "#BBC2C0",
            color: "#5B5B5B",
            width: "100%",
            height: "40px",
          }}
        />
      </Col>
      <Col
        md={4}
        xs={8}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Select
          allowClear
          placeholder="Community"
          className="filter-commu-post"
          onChange={(e) => setQuery(e)}
          options={POST_TYPE}
        />
      </Col>
      <Col md={3} xs={8} style={{ textAlign: "right" }}>
        <Button
          type="primary"
          style={{
            backgroundColor: "#49A569",
            height: "40px",
            fontWeight: "500",
            padding: "0px 20px",
            fontSize: "16px",
            width: "100%",
          }}
          onClick={showModal}
        >
          Create <PlusOutlined />
        </Button>
      </Col>

      <ModalPostManagement
        isOpen={isOpenModalCreate}
        handleSubmitBlog={handleSubmitBlog}
        handleCancel={handleCancel}
        reFetch={reFetch}
        isEdit={isEdit}
        currentPost={currentPost}
      />
    </Row>
  );
};

export default ToolWrapper;
