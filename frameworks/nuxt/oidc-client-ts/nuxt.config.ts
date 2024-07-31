require("dotenv").config();
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      title: "Phase Two Nuxt.js Keycloak Example (oidc-client-ts)",
    },
  },
  runtimeConfig: {
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    public: {
      keycloakIssuer: process.env.KEYCLOAK_ISSUER,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
    },
  },
  nitro: {
    output: {
      serverDir: "dist",
    },
  },
});
