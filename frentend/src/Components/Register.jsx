import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Typography } from "@mui/material";
import { FiUserPlus } from "react-icons/fi";

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e88e5, #ff6d00);
  padding: 20px;
`;

const RegisterBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 16px;
    width: 100%;

    .MuiInputBase-root {
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.8);
    }
  }
`;

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    background: #1e88e5;
    color: white;
    box-shadow: 0 4px 10px rgba(30, 136, 229, 0.3);
    
    &:hover {
      background: #1565c0;
      transform: translateY(-2px);
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 50px;
  color: white;
  margin-bottom: 15px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering with:", name, email, password, confirmPassword);
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <IconWrapper>
          <FiUserPlus />
        </IconWrapper>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
          Create an Account
        </Typography>
        <Typography variant="body2" color="white" gutterBottom>
          Join us and start your journey
        </Typography>
        <form onSubmit={handleRegister}>
          <StyledTextField
            label="Full Name"
            variant="outlined"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledTextField
            label="Email"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledTextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <RegisterButton type="submit">Sign Up</RegisterButton>
        </form>
        <Typography variant="body2" color="white" mt={2}>
          Already have an account? <a href="/login" style={{ color: "#ffcc80" }}>Login</a>
        </Typography>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;