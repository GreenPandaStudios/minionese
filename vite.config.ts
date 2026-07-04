import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "minion-logo.svg"],
      manifest: {
        name: "Minionese Translator",
        short_name: "MinionTalk",
        description: "Speak like a Minion! Reversible phonetic translator with high-pitched voice synthesizer.",
        theme_color: "#f9d835",
        background_color: "#0f1013",
        display: "standalone",
        scope: "/minionese/",
        start_url: "/minionese/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  base: "/minionese/",
});
