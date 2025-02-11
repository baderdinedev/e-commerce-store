import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e88e5, #ff6d00);
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} My Store. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};


export default Footer