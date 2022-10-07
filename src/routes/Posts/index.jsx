import { Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import HeadingUnderline from "../../components/HeadingUnderline";
import PostItem from "../../components/Posts/PostItem";
import { API_ENDPOINTS } from "../../services/api/apiEndpoints";
import {
  Container,
  LoaderContainer,
  ColoredContainer,
} from "../../common/styled";
import axios from "axios";

const Posts = () => {
  const [isLoadingPosts, toggleLoadingPosts] = useState(null);
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    if (allPosts?.length && isLoadingPosts) {
      toggleLoadingPosts(false);
    }
  }, [allPosts, isLoadingPosts]);

  const fetchAllPosts = async () => {
    try {
      toggleLoadingPosts(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/${API_ENDPOINTS.GET_ALL_POSTS}`
      );
      if (response?.data?.length) {
        setAllPosts(response?.data);
      }
    } catch (err) {
      toggleLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (isLoadingPosts) {
    return (
      <LoaderContainer>
        <Spin tip="Fetching posts. Please wait..." />
      </LoaderContainer>
    );
  }

  return (
    <ColoredContainer>
      <Container>
        <HeadingUnderline title="Posts" />
        <Row>
          {(allPosts ?? []).map((post) => (
            <Col
              data-testid="post-col"
              style={{ marginBottom: "10px" }}
              key={post.id}
              lg={6}
            >
              <PostItem post={post} />
            </Col>
          ))}
        </Row>
      </Container>
    </ColoredContainer>
  );
};

export default Posts;
