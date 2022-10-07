import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const { title, body, id } = post;

  const handleCardClick = () => {
    navigate(`/${id}`);
  };

  return (
    <StyledCard onClick={handleCardClick} title={title} bordered={false}>
      <p data-testid="post-body">{body}</p>
    </StyledCard>
  );
};

export default PostItem;

const StyledCard = styled(Card)`
  cursor: pointer;
  margin: 0 10px;
  min-height: 100%;
`;
