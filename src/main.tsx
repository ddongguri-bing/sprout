import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
