import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App.jsx";
import "./index.css";

const authConfig = {
  clientID: "GHcb9xQJmiK64BIorJ52ViIyr38a",
  baseUrl: "https://localhost:9443",
  signInRedirectURL: "https://ocbc-bank-demo-app.vercel.app/",
  signOutRedirectURL: "https://ocbc-bank-demo-app.vercel.app/",
  scope: ["openid", "profile", "email"],
  storage: "sessionStorage",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
