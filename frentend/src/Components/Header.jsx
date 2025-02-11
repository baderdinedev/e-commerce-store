import React, { useState } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { FiShoppingCart, FiUser, FiMenu, FiHome, FiInfo, FiPhone, FiShoppingBag } from "react-icons/fi";

const StyledAppBar = styled(AppBar)`
  && {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12px);
  }
`;

const Logo = styled(Typography)`
  && {
    flex-grow: 1;
    font-weight: bold;
    font-size: 1.5rem;
    color: #1e88e5;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
  }
`;

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    width: 250px;
    background: #f9f9f9;
  }
`;

const StyledList = styled(List)`
  && {
    padding: 20px;
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    border-radius: 8px;
    transition: all 0.3s;
    &:hover {
      background: rgba(30, 136, 229, 0.1);
      transform: scale(1.02);
    }
    &:active {
      background: rgba(30, 136, 229, 0.2);
    }
  }
`;

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <FiMenu size={24} color="#1e88e5" />
        </IconButton>
        <Logo variant="h6">My Store</Logo>
        <IconButton color="inherit">
          <Badge badgeContent={2} color="secondary">
            <FiShoppingCart size={24} color="#1e88e5" />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <FiUser size={24} color="#1e88e5" />
        </IconButton>
      </Toolbar>
      <StyledDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <StyledList>
          <StyledListItem button>
            <ListItemIcon><FiHome size={20} color="#1e88e5" /></ListItemIcon>
            <ListItemText primary="Home" />
          </StyledListItem>
          <StyledListItem button>
            <ListItemIcon><FiShoppingBag size={20} color="#1e88e5" /></ListItemIcon>
            <ListItemText primary="Shop" />
          </StyledListItem>
          <StyledListItem button>
            <ListItemIcon><FiPhone size={20} color="#1e88e5" /></ListItemIcon>
            <ListItemText primary="Contact" />
          </StyledListItem>
          <StyledListItem button>
            <ListItemIcon><FiInfo size={20} color="#1e88e5" /></ListItemIcon>
            <ListItemText primary="About" />
          </StyledListItem>
        </StyledList>
      </StyledDrawer>
    </StyledAppBar>
  );
};

export default Header;