import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createReactOidc } from "oidc-spa/react";

export const { OidcProvider, useOidc, getOidc } = createReactOidc({
  // NOTE: If you don't have the params right away see note below.
  issuerUri: "https://app.phasetwo.io/auth/realms/p2examples",
  clientId: "reactjs-example",
  /**
   * Vite:  `publicUrl: import.meta.env.BASE_URL`
   * CRA:   `publicUrl: process.env.PUBLIC_URL`
   * Other: `publicUrl: "/"` (Usually)
   */
  publicUrl: process.env.BASE_URL,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <OidcProvider fallback={<>Checking authentication ⌛️</>}>
      <App />
    </OidcProvider>
  </React.StrictMode>
);
