import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Masil Mobile",
        short_name: "Masil",
        description: "마실 모바일 웹앱",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",

        icons: [
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/apple-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,jpg,jpeg}"],
      },

      includeAssets: [
        "apple-icon-120x120.png",
        "apple-icon-152x152.png",
        "apple-icon-180x180.png",
        "android-icon-192x192.png",
      ],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },

  optimizeDeps: {
    include: ["qr-scanner"],
  },
});
