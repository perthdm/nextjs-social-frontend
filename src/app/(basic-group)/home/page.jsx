"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Avatar } from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import PostWrapper from "../../component/PostWrapper";
import Post from "../../component/Post";
import ToolWrapper from "../../component/ToolWrapper";
import { PAGE_NAME } from "../../context/constant";
import UserService from "../../services/UserService";

const Comment = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Row>
        <Col md={1} xs={2}>
          <Avatar size={38} icon={<UserOutlined />} />
        </Col>
        <Col
          md={23}
          xs={22}
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "1.25rem",
          }}
        >
          <span
            style={{
              color: "#191919",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Wittawat98
          </span>

          <span
            style={{
              color: "#939494",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            12h ago
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={1} xs={2} />
        <Col md={23} xs={22} style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "#101828" }}>
            Lorem ipsum dolor sit amet consectetur. Purus cursus bel est a
            pretium quam imprediet. Tristique auctor sed semper nibh odio
            iaculis sed aliquet. Amet mollis eget morbi geugiat mi risus eu.
            Tortor sed sagitis convallis auctor.
          </span>
        </Col>
      </Row>
    </div>
  );
};

const HomePage = () => {
  const [postList, setPostList] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAllBlog();
  }, []);

  useEffect(() => {
    let temp = [...postList];
    if (!query) {
      setPreviewData(temp);
    } else {
      setPreviewData(temp.filter((t) => t.type === query));
    }
  }, [query]);

  useEffect(() => {
    if (currentPost?.post?.id) console.log(currentPost);
  }, [currentPost]);

  const fetchAllBlog = () => {
    UserService.getAllBlog()
      .then(({ data }) => {
        setPostList(data);
        setPreviewData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickPost = (post) => {
    setCurrentPost(post);
  };

  return (
    <>
      {!currentPost ? (
        <div
          className="content-container"
          style={{ backgroundColor: "#bbc2c0" }}
        >
          <ToolWrapper reFetch={fetchAllBlog} setQuery={setQuery} />

          <PostWrapper
            postList={previewData}
            from={PAGE_NAME.HOME}
            handleClickPost={handleClickPost}
          />
        </div>
      ) : (
        <div style={{ backgroundColor: "white", height: "100%" }}>
          <div className="content-container">
            <Button
              icon={<ArrowLeftOutlined />}
              style={{
                margin: "0 0 15px 15px",
                borderRadius: "18px",
                height: "36px",
                width: "36px",
                backgroundColor: "#D8E9E4",
                color: "#243831",
                borderColor: "#D8E9E4",
              }}
              onClick={() => {
                setCurrentPost(null);
              }}
            />
            <Post item={currentPost} />

            <div style={{ padding: "5px 15px" }}>
              <Button
                style={{
                  borderColor: "#49A569",
                  color: "#49A569",
                  fontWeight: "500",
                  borderRadius: "7px",
                  height: "40px",
                }}
              >
                Add Comment
              </Button>
            </div>

            <div style={{ padding: "5px 15px", marginTop: "1rem" }}>
              {Array.from({ length: 5 }).map(() => {
                return <Comment />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
