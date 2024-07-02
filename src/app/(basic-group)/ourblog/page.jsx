"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "antd";
import ToolWrapper from "../../component/ToolWrapper";
import PostWrapper from "../../component/PostWrapper";
import { STORAGE } from "../../utils/util";
import UserService from "../../services/UserService";
import { PAGE_NAME } from "../../context/constant";

const OurblogPage = () => {
  const [postList, setPostList] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenConfirmDel, setIsOpenComfirmDel] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchMyBlog();
  }, []);

  useEffect(() => {
    let temp = [...postList];
    if (!query) {
      setPreviewData(temp);
    } else {
      setPreviewData(temp.filter((t) => t.type === query));
    }
  }, [query]);

  const fetchMyBlog = () => {
    UserService.getMyBlog()
      .then(({ data }) => {
        setPostList(data);
        setPreviewData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickPost = (post, type) => {
    if (type === "delete") {
      setIsOpenComfirmDel(true);
    } else {
      setIsEdit(true);
    }

    setCurrentPost(post);
  };

  const handleCloseDelete = () => {
    setIsOpenComfirmDel(false);
    setCurrentPost({});
  };

  const handleDelete = () => {
    if (currentPost?._id) {
      UserService.deleteBlog(currentPost?._id)
        .then(() => {
          fetchMyBlog();
          handleCloseDelete();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="content-container" style={{ backgroundColor: "#bbc2c0" }}>
      <ToolWrapper
        reFetch={fetchMyBlog}
        setQuery={setQuery}
        currentPost={currentPost}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {STORAGE.GET("userId") ? (
        <PostWrapper
          postList={previewData}
          handleClickPost={handleClickPost}
          from={PAGE_NAME.OUR_BLOG}
        />
      ) : (
        <div
          style={{
            height: "160px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            marginTop: "2rem",
          }}
        >
          <span style={{ fontSize: "20px" }}>
            กรุณาเข้าสู่ระบบเพื่อใช้งาน . .
          </span>
        </div>
      )}

      <Modal
        width={400}
        footer={null}
        open={isOpenConfirmDel}
        destroyOnClose={true}
        closable={false}
        centered={true}
      >
        <div style={{ marginTop: "0.5rem" }}>
          <center>
            <h3>Please conmfirm if you wish to delete the post</h3>
          </center>
          <center>
            Are you sure you want to delete the post? Once delted, it can't be
            recovered
          </center>
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
          <Col md={{ span: 12, order: 2 }} xs={{ span: 24, order: 1 }}>
            <Button
              style={{
                backgroundColor: "#F23536",
                borderColor: "#F23536",
                color: "white",
                width: "100%",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Col>

          <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 2 }}>
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#DADADA",
                color: "#5B5B5B",
                width: "100%",
              }}
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default OurblogPage;
