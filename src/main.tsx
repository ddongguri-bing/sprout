import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import socials from "./constants";

const expires = new Date();
expires.setMinutes(expires.getMinutes() + 60);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={socials.GOOGLE_CLIENT_ID}>
      <CookiesProvider defaultSetOptions={{ path: "/", expires }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
