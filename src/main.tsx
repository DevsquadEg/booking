import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./store/AuthContext/AuthContext.tsx";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FavoriteProvider } from "./store/AuthContext/FavoriteContext.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./services/theme.ts";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme("light")}>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
