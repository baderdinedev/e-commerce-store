import React from "react";
import styled from "styled-components";
import { FaAmazon, FaApple, FaGoogle } from "react-icons/fa"; // React Icons
import { ShoppingCart, LocalShipping } from "@mui/icons-material"; // Material-UI Icons

// Styled Components
const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 5%;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LeftSection = styled.div`
  max-width: 50%;
  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
`;

const SponsorshipIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, #1e88e5, #1565c0);
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      {/* Left Section */}
      <LeftSection>
        <Title>Welcome to Our Online Store</Title>
        <Description>
          Discover the best products at unbeatable prices. Shop now and enjoy fast delivery!
        </Description>
        <SponsorshipIcons>
          <IconCircle>
            <FaAmazon size={24} color="#FF9900" />
          </IconCircle>
          <IconCircle>
            <FaApple size={24} color="#000" />
          </IconCircle>
          <IconCircle>
            <FaGoogle size={24} color="#4285F4" />
          </IconCircle>
          <IconCircle>
            <ShoppingCart fontSize="large" color="primary" />
          </IconCircle>
          <IconCircle>
            <LocalShipping fontSize="large" color="secondary" />
          </IconCircle>
        </SponsorshipIcons>
      </LeftSection>

      {/* Right Section */}
      <RightSection>
        <ImageBox>
          <img
            src="https://via.placeholder.com/200x300.png?text=Product+1"
            alt="Product 1"
          />
        </ImageBox>
        <ImageBox>
          <img
            src="https://via.placeholder.com/200x300.png?text=Product+2"
            alt="Product 2"
          />
        </ImageBox>
      </RightSection>
    </HeroContainer>
  );
};

export default HeroSection;