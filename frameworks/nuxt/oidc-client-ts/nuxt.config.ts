import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxt/eslint"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  devServer: {
    port: 3000,
  },
  app: {
    head: {
      title: "Phase Two · Nuxt + oidc-client-ts",
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "description",
          content: "Keycloak login for a Nuxt app with oidc-client-ts",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      oidcIssuerUri: "https://app.phasetwo.io/auth/realms/p2examples",
      oidcClientId: "nuxt-oidc-client-ts-example",
    },
  },
  nitro: {
    preset: "vercel",
  },
});
