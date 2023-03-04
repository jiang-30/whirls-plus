import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import defineOptions from "unplugin-vue-define-options/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  plugins: [vue(), defineOptions()],
});
