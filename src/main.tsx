import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import ThemeLayout from "./layouts/ThemeLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeLayout>
        <App />
      </ThemeLayout>
    </BrowserRouter>
  </StrictMode>
);
