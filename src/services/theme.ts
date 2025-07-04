import { createTheme } from "@mui/material/styles";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            primary: {
              main: "#1976d2",
            },
            text: {
              primary: "#000000",
              secondary: "#555555",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            primary: {
              main: "#90caf9",
            },
            text: {
              primary: "#ffffff",
              secondary: "#aaaaaa",
            },
          }),
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

export default theme;
