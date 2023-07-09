import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const authServerUrl = "https://euc1.auth.ac/auth/";
const realm = "shared-deployment-001";
const client = "reg-example-1";

const oidcConfig = {
  authority: `${authServerUrl}realms/${realm}`,
  client_id: client,
  redirect_uri: "http://localhost:3000/authenticated",
  onSigninCallback: (args: any) =>
    window.history.replaceState({}, document.title, window.location.pathname),
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
