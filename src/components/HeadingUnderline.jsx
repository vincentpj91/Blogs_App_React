import { Row } from "antd";
import React from "react";
import styled from "styled-components";

const BlogsHeading = styled.span`
  font-family: Poppins;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: 0em;
  margin-bottom: 10px;
  text-align: center;
  color: black;
  @media (max-width: 767px) {
    font-size: 25px;
    margin-bottom: 5px;
  }
`;

const BlogsHeadingUnderline = styled.div.attrs({
  "data-testid": "page-title",
})`
  height: 5px;
  width: 80px;
  border-radius: 2.5px;
  background: #f9ae00;
  margin-bottom: 30px;
`;

const HeadingUnderline = ({ title }) => {
  return (
    <>
      <Row justify="center">
        <BlogsHeading>{title}</BlogsHeading>
      </Row>
      <Row justify="center">
        <BlogsHeadingUnderline />
      </Row>
    </>
  );
};

export default HeadingUnderline;
