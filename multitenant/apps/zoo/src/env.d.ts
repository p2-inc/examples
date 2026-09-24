interface ImportMetaEnv {
  readonly VITE_OIDC_ISSUER_URI: string;
  readonly VITE_OIDC_CLIENT_ID: string;
  readonly VITE_OIDC_USE_MOCK?: string;
  readonly VITE_OIDC_SPA_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
