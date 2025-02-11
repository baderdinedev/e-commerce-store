import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  text-align: center;
  padding: 20px;
`;

const IconWrapper = styled.div`
  font-size: 8rem;
  color: #ff6b6b;
  margin-bottom: 20px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  color: #fff;
  background-color: #1e88e5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1565c0;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <IconWrapper>
        <FiShoppingCart />
      </IconWrapper>
      <Title>404 - Page Not Found</Title>
      <Message>
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </Message>
      <HomeButton onClick={handleGoHome}>Go Back to Home</HomeButton>
    </Container>
  );
};

export default Error404;