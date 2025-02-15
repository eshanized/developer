import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  base: "/developer/",
  build: {
    cssCodeSplit: false, // Disable CSS code splitting
    rollupOptions: {
      output: {
        entryFileNames: "scripts.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "styles.css";
          return "assets/[name][extname]";
        }
      }
    }
  }
});