import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // REQUIRED for GitHub Pages
  base: "/Encounter-Tracking/",
});