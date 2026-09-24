import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  modules: ["@nuxt/eslint"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  devServer: {
    port: 3000,
  },
  app: {
    head: {
      title: "Phase Two · Nuxt + keycloak-js",
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "description",
          content: "Keycloak login for a Nuxt app with keycloak-js",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      keycloakUrl: "https://app.phasetwo.io/auth",
      keycloakRealm: "p2examples",
      keycloakClientId: "nuxt-example",
    },
  },
  nitro: {
    preset: "vercel",
  },
});
