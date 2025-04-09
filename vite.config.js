import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false,
      },
      registerType: "autoUpdate",
      mode: "production",
      base: "/",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Ticketing",
        short_name: "Ticketing",
        theme_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "icon/ticketing192white.png",
            sizes: "193x193",
            type: "image/png",
          },
          {
            src: "icon/ticketing512white.png",
            sizes: "513x513",
            type: "image/png",
          },
          {
            src: "icon/ticketing512white.png",
            sizes: "513x513",
            type: "image/png",
            purpose: ["any", "maskable"],
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html",
        suppressWarnings: true,
      },
    }),
  ],
});
