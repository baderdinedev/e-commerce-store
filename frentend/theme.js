import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Supports dark mode toggle
    primary: {
      main: "#1E88E5", // Modern blue for trust & professionalism
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF6D00", // Vibrant orange for CTA buttons
      contrastText: "#ffffff",
    },
    background: {
      default: "#F5F5F5", // Light grey for clean UI
      paper: "#FFFFFF", // White background for cards
    },
    text: {
      primary: "#212121", // Dark grey for readability
      secondary: "#757575", // Muted grey for secondary text
    },
    success: {
      main: "#4CAF50", // Green for success messages
    },
    error: {
      main: "#E53935", // Red for errors
    },
    warning: {
      main: "#FB8C00", // Orange for warnings
    },
    info: {
      main: "#1E88E5", // Blue for info messages
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Modern & readable font
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    button: {
      textTransform: "none", // Modern look without all caps
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Smooth rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          fontWeight: "bold",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
