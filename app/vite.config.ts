import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// <https://vitejs.dev/config/>
export default defineConfig({
  base: "/https://github.com/cs421sp24-homework/project-team-03/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
