import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: "./tsconfig.json",
      outputDir: "es",
      entryRoot: "./src",
    }),
  ],
  build: {
    target: "modules",
    outDir: "dist",
    minify: false,
    lib: {
      entry: "./src/index.ts",
    },
    rollupOptions: {
      external: ["vue", "element-plus"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          dir: "es",
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: "lib",
          preserveModulesRoot: "src",
        },
      ],
    },
  },
});
