"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Input, Select, message } from "antd";
import UserService from "../services/UserService";
import { STORAGE } from "../utils/util";
import { POST_TYPE } from "../context/constant";

const ModalPostManagement = ({
  isEdit,
  isOpen,
  handleCancel,
  handleSubmitBlog,
  reFetch,
  currentPost,
}) => {
  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    if (isEdit) setPostDetail(currentPost);
  }, [isEdit]);

  const handleCreatePost = () => {
    if (!postDetail?.type) return message.error("กรุณาเลือกประเภทของโพส");

    if (!isEdit) {
      let reqData = {
        userId: STORAGE.GET("userId"),
        ...postDetail,
      };

      UserService.createPost(reqData)
        .then(() => {
          handleSubmitBlog();
          reFetch();
        })
        .catch((err) => {
          message.error(err?.message);
        });
    } else {
      let reqData = {
        title: postDetail?.title,
        content: postDetail?.content,
        type: postDetail?.type,
      };

      UserService.editPost(postDetail?._id, reqData)
        .then(() => {
          handleSubmitBlog();
          reFetch();
        })
        .catch((err) => {
          message.error(err?.message);
        });
    }
  };

  const handleChangeData = (e) => {
    if (e?.target) {
      let { value, name } = e?.target;
      setPostDetail((prev) => ({ ...prev, [name]: value }));
    } else {
      setPostDetail((prev) => ({ ...prev, type: e }));
    }
  };

  const handleCloseModal = () => {
    setPostDetail({});
    handleCancel();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleCreatePost}
      onCancel={handleCloseModal}
      footer={[
        <Button
          key="cancel"
          style={{
            borderColor: "#49A569",
            color: "#49A569",
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          style={{
            backgroundColor: "#49A569",
            borderColor: "#49A569",
            color: "white",
          }}
          onClick={handleCreatePost}
        >
          {isEdit ? "Comfirm" : "Post"}
        </Button>,
      ]}
      destroyOnClose={true}
    >
      <h2 style={{ marginBottom: "1rem" }}>
        {isEdit ? "Edit Post" : "Create Post"}
      </h2>
      <Row gutter={[16, 16]}>
        <Col md={10} xs={24}>
          <Select
            className="select-commu-post"
            placeholder="Choose a community"
            style={{ width: "100%" }}
            onChange={handleChangeData}
            options={POST_TYPE}
            value={postDetail?.type}
          />
        </Col>
        <Col span={24}>
          <Input
            value={postDetail?.title}
            placeholder="Title"
            name="title"
            onChange={handleChangeData}
          />
        </Col>
        <Col span={24}>
          <Input.TextArea
            value={postDetail?.content}
            onChange={handleChangeData}
            name="content"
            placeholder="What's on your mind"
            autoSize={{ minRows: 8 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPostManagement;
