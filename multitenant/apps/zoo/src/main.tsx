import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { createReactOidc } from 'oidc-spa/react';
import { ApiProvider } from './app/api';
import { REALM } from '@multitenant/api-manager';

const client = '<CLIENT>';

export const { OidcProvider, useOidc, getOidc } = createReactOidc({
  // NOTE: If you don't have the params right away see note below.
  issuerUri: `https://app.phasetwo.io/auth/realms/${REALM}`,
  clientId: client,
  /**
   * Vite:  `publicUrl: import.meta.env.BASE_URL`
   * CRA:   `publicUrl: process.env.PUBLIC_URL`
   * Other: `publicUrl: "/"` (Usually)
   */
  publicUrl: '/',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <OidcProvider fallback={<>Checking authentication ⌛️</>}>
      <ApiProvider>
        <App />
      </ApiProvider>
    </OidcProvider>
  </StrictMode>
);
