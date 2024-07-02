"use client";

import React from "react";
import { Row, Col } from "antd";
import Post from "./Post";

const PostWrapper = ({ postList, handleClickPost, from }) => {
  return (
    <Row className="post-wrapper-container">
      {postList.map((item) => {
        return (
          <Col key={item._id} span={24}>
            <Post item={item} handleClickPost={handleClickPost} from={from} />
          </Col>
        );
      })}
    </Row>
  );
};

export default PostWrapper;
