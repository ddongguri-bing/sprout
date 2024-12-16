import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
);
