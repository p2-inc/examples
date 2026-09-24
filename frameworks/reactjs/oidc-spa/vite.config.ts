import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { oidcSpa } from "oidc-spa/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    oidcSpa({ browserRuntimeFreeze: { enabled: true } }),
  ],
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
});
