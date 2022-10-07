import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { axiosService } from "../../services/api";
import { API_ENDPOINTS } from "../../services/api/apiEndpoints";
import { Container, LoaderContainer } from "../../common/styled";
import HeadingUnderline from "../../components/HeadingUnderline";
import { PostDetailContainer } from "./styled";
import { LeftOutlined } from "@ant-design/icons";

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isLoadingPost, toggleLoadingPost] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    if (postDetail && userdata && isLoadingPost) {
      toggleLoadingPost(false);
    }
  }, [postDetail, isLoadingPost, userdata]);

  useEffect(() => {
    const fetchpostDetail = async () => {
      try {
        toggleLoadingPost(true);
        const response = await axiosService.get(
          `${API_ENDPOINTS.GET_POST_DETAIL_BY_ID}/${postId}`
        );
        if (response?.data) {
          setPostDetail(response?.data);
          const userdetails = await axiosService.get(
            `${API_ENDPOINTS.GET_USER_BY_ID}/${response?.data?.userId}`
          );
          if (userdetails?.data) {
            setUserdata(userdetails?.data);
          }
        }
      } catch (err) {
        toggleLoadingPost(false);
      }
    };

    fetchpostDetail();
  }, [postId]);

  const handleGoBackClick = () => {
    navigate("/");
  };

  if (isLoadingPost) {
    return (
      <LoaderContainer>
        <Spin tip="Fetching post detail. Please wait..." />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <PostDetailContainer>
        <IconContainer onClick={handleGoBackClick}>
          <LeftOutlined />
          <span>&nbsp;&nbsp;Go Back</span>
        </IconContainer>
        <HeadingUnderline title={postDetail?.title} />
        <LeftAlignedText>{postDetail?.body}</LeftAlignedText>
        <Spacer />
        <hr />
        <UserDetailsText>
          Posted By <strong>{userdata?.name}</strong>
        </UserDetailsText>
        <UserDetailsText>{userdata?.email}</UserDetailsText>
        <UserDetailsText>{userdata?.phone}</UserDetailsText>
        <UserDetailsText>
          {userdata?.address?.suite ?? ""} {userdata?.address?.street ?? ""}{" "}
          {userdata?.address?.city ?? ""}
        </UserDetailsText>
      </PostDetailContainer>
    </Container>
  );
};

export default PostDetails;

const LeftAlignedText = styled.p`
  text-align: left;
`;

const Spacer = styled.div`
  min-height: 200px;
  width: 1px;
`;

const UserDetailsText = styled(LeftAlignedText)`
  margin-bottom: 5px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;
