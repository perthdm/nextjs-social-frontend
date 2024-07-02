"use client";

import React from "react";
import { Row, Col, Avatar, Tag, Space } from "antd";
import {
  StarOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PAGE_NAME } from "../context/constant";

const Post = ({ item, handleClickPost, from }) => {
  const selectPost = () => {
    handleClickPost(item);
  };

  const deltePost = () => {
    handleClickPost(item, "delete");
  };

  const postStyled = {
    post: from
      ? { borderBottom: "1px solid #bbc2c0" }
      : { borderBottom: "0px" },
    postTitle: from ? { fontSize: "18px" } : { fontSize: "22px" },
  };

  return (
    <div className="post" style={postStyled.post}>
      <Row gutter={[10, 10]}>
        <Col span={20}>
          <div style={{ marginRight: "12px", position: "relative" }}>
            <Avatar
              size={38}
              icon={<UserOutlined />}
              style={{ marginRight: "12px" }}
            />

            <div className="avatar-status" />

            <span style={{ color: "#939494", fontSize: "18px" }}>
              {item?.user_created?.username}
            </span>
          </div>
        </Col>
        <Col span={4}>
          <div style={{ textAlign: "right" }}>
            {from === PAGE_NAME.OUR_BLOG ? (
              <Space size="middle">
                <EditOutlined className="our-blog-icon" onClick={selectPost} />

                <DeleteOutlined
                  className="our-blog-icon"
                  onClick={deltePost}
                />
              </Space>
            ) : (
              <StarOutlined
                style={{
                  color: "#939494",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </Col>
        <Col span={24}>
          <Tag className="tag-normal">{item.type}</Tag>
        </Col>

        <Col span={24}>
          <p
            style={{
              color: "#101828",
              fontWeight: "bold",
              ...postStyled.postTitle,
            }}
          >
            {item.title}
          </p>
        </Col>

        <Col span={24}>
          <div className="preview-content">{item.content}</div>
        </Col>

        <Col span={24}>
          <div
            className="comment"
            onClick={from === PAGE_NAME.HOME ? selectPost : () => {}}
          >
            <MessageOutlined /> {item?.commentCount} Comments
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Post;
